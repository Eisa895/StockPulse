// Import the Finnhub API wrapper and Chart.js
import { finnhubAPI } from './api.js';
import Chart from 'chart.js/auto';

// Variable to hold the sector chart instance
let sectorChart = null;

// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('trends.html')) return;
    
   loadTrendingStocks();  // Load trending stock data
    initSectorChart();     // Initialize the sector performance chart
});

// Load Trending Stocks
async function loadTrendingStocks() {
     const container = document.getElementById('trendingStocks'); // Container for stock cards
    if (!container) return; // Exit if container doesn't exist

     // Symbols to display as trending stocks
    const symbols = ['NVDA', 'META', 'TSLA', 'AAPL', 'AMD'];

        // Show loading state while fetching data
    container.innerHTML = '<div class="loading">Loading stocks...</div>';
    
    try {
         // Fetch stock quotes for all symbols concurrently
        const promises = symbols.map(symbol => finnhubAPI.getQuote(symbol));
        const quotes = await Promise.all(promises);

          // Clear loading state
        container.innerHTML = '';

          // Create and append a stock card for each quote
        quotes.forEach((quote, index) => {
            if (quote && quote.c) { // Check if data exists
                const card = createStockCard(symbols[index], quote);
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error loading trending stocks:', error);
        // Show error message in UI
        container.innerHTML = '<div class="loading">Unable to load stocks</div>';
    }
}

// Create individual stock card element
function createStockCard(symbol, quote) {
    const card = document.createElement('div');
    card.className = 'stock-card hover-lift'; // Add styling classes

     // Determine if stock price change is positive
    const isPositive = quote.dp >= 0;
    const icon = isPositive ? 'fa-chart-line' : 'fa-chart-line'; // Can customize icons if needed

     // Populate card with stock info
    card.innerHTML = `
        <div class="stock-header">
            <div>
                <h3 class="stock-symbol">${symbol}</h3>
                <p class="stock-name">${symbol}</p>
            </div>
            <i class="fas ${icon} ${isPositive ? 'text-success' : 'text-destructive'}"></i>
        </div>
        <div>
            <div class="stock-price">$${quote.c.toFixed(2)}</div>
            <div class="stock-change ${isPositive ? 'positive' : 'negative'}">
                ${isPositive ? '+' : ''}${quote.dp.toFixed(2)}%
            </div>
        </div>
    `;
    
    return card; // Return the created card element
}

// Sector Performance Chart
function initSectorChart() {
    const ctx = document.getElementById('sectorChart').getContext('2d'); // Get canvas context
    
    // Static data for sectors and their performance
    const data = {
        labels: ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Industrial', 'Energy'],
        datasets: [{
            label: 'Performance (%)',
            data: [5.2, 2.8, 1.4, 0.9, -0.5, -1.8],
            backgroundColor: [
              '#3b82f6', // Blue
                '#22c55e', // Green
                '#f59e0b', // Orange
                '#8b5cf6', // Purple
                '#ef4444', // Red
                '#ef4444'  // Red
            ],
            borderRadius: 8 // Rounded bars
        }]
    };

    // Create horizontal bar chart
    sectorChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y', // Horizontal bars
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false } // Hide legend
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)' // Light grid lines
                    }
                },
                y: {
                    grid: {
                        display: false // Hide vertical grid lines
                    }
                }
            }
        }
    });
}
