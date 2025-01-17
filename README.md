# Crypto Tracker

A modern, responsive web application for tracking cryptocurrency prices, market caps, and price changes in real-time. Built with vanilla JavaScript and the CoinGecko API.

![Crypto Tracker Screenshot - Dark Theme Interface](screenshot.png)

## Features

- Real-time cryptocurrency price tracking
- Support for multiple currencies (USD, EUR, GBP)
- Interactive price chart showing 7-day history
- Search functionality for finding specific cryptocurrencies
- Favorites system with local storage persistence
- Dark theme with modern UI elements
- Color-coded price changes (green for positive, red for negative)
- Comprehensive market data including:
  - Current price
  - 24-hour price change percentage
  - Market capitalization
  - Coin icons and names
- Top 100 cryptocurrencies tracked

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Chart.js for data visualization
- CoinGecko API for cryptocurrency data
- LocalStorage for favorites persistence

## Live Demo

[View Live Demo](https://de-arnavgupta.github.io/Crypto_Tracker)

## Getting Started

### Prerequisites

- A modern web browser
- Basic understanding of HTML/CSS/JavaScript
- No additional software installation required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/de-arnavgupta/Crypto_Tracker.git
```

2. Navigate to the project directory:
```bash
cd Crypto_Tracker
```

3. Open `index.html` in your web browser

Alternatively, you can use a local development server like Live Server in VS Code.

## Usage

1. **View Cryptocurrency Data**: The main table displays cryptocurrency information including current price, 24h change, and market cap
2. **Change Currency**: Use the currency selector in the header to switch between USD, EUR, and GBP
3. **Search**: Use the search bar to filter cryptocurrencies by name or symbol
4. **Favorites**: Click "ADD TO FAVORITES" to save cryptocurrencies to your favorites list
5. **Price History**: View the 7-day price history chart for cryptocurrencies

## API Reference

This project uses the CoinGecko API v3. The following endpoints are used:

- `/coins/markets` - Get cryptocurrency market data
- `/coins/{id}/market_chart` - Get historical market data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for providing cryptocurrency data
- [Chart.js](https://www.chartjs.org/) for the charting functionality

## Contact

Arnav Gupta - [arnavgpt28@outlook.com](mailto:arnavgpt28@outlook.com)

Project Link: [https://github.com/de-arnavgupta/Crypto_Tracker](https://github.com/de-arnavgupta/Crypto_Tracker)  
Live Demo: [https://de-arnavgupta.github.io/Crypto_Tracker](https://de-arnavgupta.github.io/Crypto_Tracker)
