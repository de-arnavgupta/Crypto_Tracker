class CryptoTracker {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.favorites = new Set(JSON.parse(localStorage.getItem('cryptoFavorites')) || []);
        this.chart = null;
        this.selectedCurrency = 'usd';
        this.cryptoData = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadCryptoData();
        this.setupChart();
        this.loadFavorites();
    }

    setupEventListeners() {
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterCryptoList(e.target.value);
        });

        document.getElementById('currency').addEventListener('change', (e) => {
            this.selectedCurrency = e.target.value;
            this.loadCryptoData();
        });

        // Delegate event listener for favorite buttons
        document.getElementById('cryptoTableBody').addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-btn')) {
                const cryptoId = e.target.dataset.id;
                this.toggleFavorite(cryptoId);
            }
        });
    }

    async loadCryptoData() {
        try {
            const response = await fetch(
                `${this.baseUrl}/coins/markets?vs_currency=${this.selectedCurrency}&order=market_cap_desc&per_page=100&sparkline=false`
            );
            this.cryptoData = await response.json();
            this.renderCryptoList(this.cryptoData);
            if (this.cryptoData.length > 0) {
                this.loadChartData(this.cryptoData[0].id);
            }
        } catch (error) {
            console.error('Error loading crypto data:', error);
            alert('Failed to load cryptocurrency data. Please try again later.');
        }
    }

    renderCryptoList(cryptoData) {
        const tableBody = document.getElementById('cryptoTableBody');
        tableBody.innerHTML = '';

        cryptoData.forEach(crypto => {
            const row = document.createElement('tr');
            const priceChange = crypto.price_change_percentage_24h;
            const changeClass = priceChange >= 0 ? 'positive-change' : 'negative-change';

            row.innerHTML = `
                <td>
                    <div class="crypto-item">
                        <img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon">
                        ${crypto.name}
                    </div>
                </td>
                <td>${this.formatCurrency(crypto.current_price)}</td>
                <td class="${changeClass}">${priceChange?.toFixed(2)}%</td>
                <td>${this.formatCurrency(crypto.market_cap)}</td>
                <td>
                    <button class="favorite-btn ${this.favorites.has(crypto.id) ? 'active' : ''}"
                            data-id="${crypto.id}">
                        ${this.favorites.has(crypto.id) ? 'Remove' : 'Add to Favorites'}
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    toggleFavorite(cryptoId) {
        if (this.favorites.has(cryptoId)) {
            this.favorites.delete(cryptoId);
        } else {
            this.favorites.add(cryptoId);
        }

        // Save to localStorage
        localStorage.setItem('cryptoFavorites', JSON.stringify(Array.from(this.favorites)));

        // Update UI
        this.renderCryptoList(this.cryptoData);
        this.loadFavorites();
    }

    async loadFavorites() {
        const favoritesList = document.getElementById('favoritesList');

        if (this.favorites.size === 0) {
            favoritesList.innerHTML = '<p style="color: var(--text-secondary);">No favorites added yet</p>';
            return;
        }

        try {
            const favoriteCoins = this.cryptoData.filter(coin => this.favorites.has(coin.id));
            favoritesList.innerHTML = favoriteCoins.map(coin => `
                <div class="favorite-item">
                    <img src="${coin.image}" alt="${coin.name}" class="crypto-icon">
                    <div style="flex-grow: 1;">
                        <div style="font-weight: 600;">${coin.name}</div>
                        <div style="color: var(--text-secondary);">
                            ${this.formatCurrency(coin.current_price)}
                        </div>
                    </div>
                    <div class="${coin.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change'}">
                        ${coin.price_change_percentage_24h?.toFixed(2)}%
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading favorites:', error);
            favoritesList.innerHTML = '<p style="color: var(--danger-color);">Error loading favorites</p>';
        }
    }

    async loadChartData(coinId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/coins/${coinId}/market_chart?vs_currency=${this.selectedCurrency}&days=7`
            );
            const data = await response.json();
            this.updateChart(data.prices);
        } catch (error) {
            console.error('Error loading chart data:', error);
        }
    }

    setupChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        Chart.defaults.color = '#94a3b8';
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Price',
                    data: [],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    }
                }
            }
        });
    }

    updateChart(priceData) {
        const labels = priceData.map(item => {
            const date = new Date(item[0]);
            return date.toLocaleDateString();
        });

        const prices = priceData.map(item => item[1]);

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = prices;
        this.chart.update();
    }

    filterCryptoList(searchTerm) {
        const filteredData = this.cryptoData.filter(crypto =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderCryptoList(filteredData);
    }

    formatCurrency(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.selectedCurrency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        });
        return formatter.format(value);
    }

    formatCompactNumber(number) {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short'
        });
        return formatter.format(number);
    }

    showError(message) {
        // You can implement a better error handling UI here
        console.error(message);
        alert(message);
    }
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CryptoTracker();
});