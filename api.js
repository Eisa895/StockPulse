// API Configuration
// Finnhub API credentials and base URL (used for stock market data)
const FINNHUB_API_KEY = 'd3n7u21r01qk65165l6gd3n7u21r01qk65165l70';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
// NewsAPI credentials and base URL (used for news data)
const NEWSAPI_KEY = 'a6542220e1e74e548cd3c1b7bf0a9762';
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2';

// Export for use in other modules
export { FINNHUB_API_KEY, FINNHUB_BASE_URL, NEWSAPI_KEY, NEWSAPI_BASE_URL };

// Finnhub API
// Object containing functions to fetch data from the Finnhub financial API
export const finnhubAPI = {

    
    // Fetches the current stock price and related data for a given stock symbol
    async getQuote(symbol) {
        try {
            const response = await fetch(
                `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
            );
            if (!response.ok) throw new Error('Failed to fetch quote');
            return await response.json(); // Return the parsed JSON data
        } catch (error) {
            console.error('Error fetching quote:', error);
            return null; // Return null if the API call fails
        }
    },

     // Fetches the company profile details (name, logo, country, etc.) for a given stock
    async getCompanyProfile(symbol) {
        try {
            const response = await fetch(
                `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
            );
            if (!response.ok) throw new Error('Failed to fetch company profile');
            return await response.json();
        } catch (error) {
            console.error('Error fetching company profile:', error);
            return null;
        }
    },

       // Fetches historical candlestick (OHLC) data for chart visualizations
    async getCandles(symbol, resolution = '5', from, to) {
        try {
            const response = await fetch(
                `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
            );
            if (!response.ok) throw new Error('Failed to fetch candles');
            return await response.json();
        } catch (error) {
            console.error('Error fetching candles:', error);
            return null;
        }
    }
};

// News API
// Object containing functions to fetch news articles from the NewsAPI
export const newsAPI = {

    // Fetches all news articles related to a query (e.g., "stock market")
    async getEverything(query, pageSize = 12, language = 'en') {
        try {
            const response = await fetch(
                `${NEWSAPI_BASE_URL}/everything?q=${query}&pageSize=${pageSize}&language=${language}&apiKey=${NEWSAPI_KEY}`
            );
            if (!response.ok) throw new Error('Failed to fetch news');
            return await response.json();
        } catch (error) {
            console.error('Error fetching news:', error);
            return null;
        }
    },

     // Fetches top headlines, optionally filtered by category (e.g., business, tech)
    async getTopHeadlines(category, country = 'us', pageSize = 12) {
        try {
             // Build URL dynamically depending on category selection
            let url = `${NEWSAPI_BASE_URL}/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=${NEWSAPI_KEY}`;
            if (category) {
                url += `&category=${category}`;
            }
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch top headlines');
            return await response.json();
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            return null;
        }
    },

       // Fetches only business-related news headlines
    async getBusinessNews(pageSize = 12) {
        return this.getTopHeadlines('business', 'us', pageSize);
    },

     // Fetches general financial or market-related articles
    async getFinancialNews(pageSize = 12) {
        return this.getEverything('stock market OR finance OR economy', pageSize);
    },

      // Fetches cryptocurrency and blockchain-related articles
    async getCryptoNews(pageSize = 12) {
        return this.getEverything('cryptocurrency OR bitcoin OR ethereum', pageSize);
    }
};

// Utility Functions

// Converts large numbers into readable formats (e.g., 1200000 → "1.2M")
export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Converts a given date string into a “time ago” format (e.g., "5 minutes ago")
export function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

      // Determine how long ago the event occurred
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}
