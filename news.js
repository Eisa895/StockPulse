import { getTimeAgo } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('news.html')) return;

    loadAllNews();
});

// Load All News
async function loadAllNews() {
    const container = document.getElementById('allNews');

    try {
        // Use mock news data as NewsAPI requires server-side requests
        const mockNews = generateMockNews();
        renderNewsCards(container, mockNews);
    } catch (error) {
        console.error('Error loading news:', error);
        container.innerHTML = '<div class="loading">Unable to load news</div>';
    }
}

function generateMockNews() {
    const topics = [
        { title: 'Markets Rally on Strong Earnings Reports', source: 'Financial Times', description: 'Major indices climb as tech companies exceed expectations in quarterly earnings reports.', image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Federal Reserve Holds Interest Rates Steady', source: 'Bloomberg', description: 'Central bank maintains current rates as inflation shows signs of cooling.', image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Tech Stocks Lead Market Gains', source: 'CNBC', description: 'Technology sector outperforms as investors show renewed confidence in growth stocks.', image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Oil Prices Surge on Supply Concerns', source: 'Reuters', description: 'Crude oil reaches new highs amid geopolitical tensions and production cuts.', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Dollar Strengthens Against Major Currencies', source: 'Wall Street Journal', description: 'US dollar gains ground as economic data exceeds forecasts.', image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Cryptocurrency Market Shows Volatility', source: 'CoinDesk', description: 'Bitcoin and major altcoins experience significant price swings in recent trading.', image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Housing Market Remains Resilient', source: 'MarketWatch', description: 'Home sales continue to show strength despite higher mortgage rates.', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Retail Sales Beat Expectations', source: 'CNBC', description: 'Consumer spending remains robust, signaling economic strength.', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Gold Prices Climb to New Heights', source: 'Kitco News', description: 'Precious metals rally as investors seek safe-haven assets.', image: 'https://images.pexels.com/photos/3345876/pexels-photo-3345876.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Energy Sector Leads S&P 500 Gains', source: 'Barrons', description: 'Oil and gas companies outperform broader market indices.', image: 'https://images.pexels.com/photos/4254166/pexels-photo-4254166.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Banking Stocks Rise on Positive Outlook', source: 'Financial Times', description: 'Major banks see share prices increase following strong quarterly results.', image: 'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Manufacturing Data Shows Expansion', source: 'Bloomberg', description: 'Industrial production exceeds forecasts, pointing to economic growth.', image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ];

    return topics.map((article, index) => ({
        title: article.title,
        description: article.description,
        source: { name: article.source },
        publishedAt: new Date(Date.now() - index * 3600000).toISOString(),
        url: '#',
        urlToImage: article.image
    }));
}

function renderNewsCards(container, articles) {
    if (!articles || articles.length === 0) {
        container.innerHTML = '<div class="loading">No articles available</div>';
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <div class="news-card hover-lift">
            <div style="position: relative; height: 192px; overflow: hidden; background: var(--muted);">
                ${article.urlToImage 
                    ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">` 
                    : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-newspaper" style="font-size: 4rem; color: var(--muted-foreground); opacity: 0.5;"></i></div>`
                }
                <span class="badge" style="position: absolute; top: 1rem; left: 1rem;">News</span>
            </div>
            <div class="news-content">
                <h3 class="news-title">${article.title}</h3>
                <p class="news-description">${article.description || 'No description available'}</p>
                <div class="news-footer">
                    <div class="news-time">
                        <i class="fas fa-clock"></i>
                        ${getTimeAgo(article.publishedAt)}
                    </div>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        Read More
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border);">
                    <p class="news-source">${article.source.name}</p>
                </div>
            </div>
        </div>
    `).join('');
}
