import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import Footer from '../../components/common/Footer';
import { blogPosts, blogCategories } from '../../data/blogData';

const categoryColors = {
    'GST Updates': '#16A34A',
    'Tax Saving Tips': '#0B1F3A',
    'Business Registration Guide': '#7C3AED',
    'Loan Documentation Guide': '#D97706',
    'Financial Planning Tips': '#0284C7',
};

const MARKET_NEWS_ENDPOINT = '/api/market-news';

const SAMPLE_ARTICLES = [
  {
    title: "Federal Reserve Signals Two Rate Cuts Possible in 2025 as Inflation Cools",
    description: "Fed Chair Jerome Powell hinted at a possible shift in monetary policy following encouraging CPI data showing inflation dropped to 2.4%, its lowest level in three years. Markets rallied sharply on the news.",
    url: "https://www.reuters.com/markets/", source: "Reuters", publishedAt: new Date(Date.now()-1*60*60*1000).toISOString(),
    category: "economy", featured: true
  },
  {
    title: "S&P 500 Hits Record High Amid Tech Surge",
    description: "The benchmark index crossed 5,800 points for the first time as mega-cap technology stocks led a broad market rally. Nvidia surged 4.2% after announcing new AI chip orders.",
    url: "https://www.bloomberg.com/markets", source: "Bloomberg", publishedAt: new Date(Date.now()-2*60*60*1000).toISOString(),
    category: "markets"
  },
  {
    title: "Apple Reports Blowout Q3 Earnings, Revenue Beats Estimates by 8%",
    description: "Apple posted quarterly revenue of $94.9 billion, exceeding analyst expectations. Services division grew 14% year-over-year, driven by App Store and iCloud subscriptions.",
    url: "https://www.cnbc.com/technology/", source: "CNBC", publishedAt: new Date(Date.now()-3*60*60*1000).toISOString(),
    category: "earnings"
  },
  {
    title: "Bitcoin Surpasses $75,000 as ETF Inflows Reach Monthly Record",
    description: "BTC crossed a key psychological level as institutional investors poured $2.4 billion into spot Bitcoin ETFs this week alone. Analysts now eye $80K as the next resistance zone.",
    url: "https://www.coindesk.com/", source: "CoinDesk", publishedAt: new Date(Date.now()-4*60*60*1000).toISOString(),
    category: "crypto"
  },
  {
    title: "India's GDP Growth Forecast Raised to 7.2% by IMF",
    description: "The International Monetary Fund upgraded India's growth outlook, citing strong domestic consumption and robust services exports. The revision makes India the fastest-growing major economy globally.",
    url: "https://economictimes.indiatimes.com/news/economy", source: "Economic Times", publishedAt: new Date(Date.now()-5*60*60*1000).toISOString(),
    category: "economy"
  },
  {
    title: "Microsoft Azure Revenue Grows 29%, Shares Jump 5% After Hours",
    description: "Microsoft's cloud division delivered another strong quarter, with AI services now contributing meaningfully to Azure growth. CEO Satya Nadella highlighted Copilot adoption across enterprise clients.",
    url: "https://www.wsj.com/business", source: "Wall Street Journal", publishedAt: new Date(Date.now()-6*60*60*1000).toISOString(),
    category: "earnings"
  },
  {
    title: "Gold Prices Climb to $2,600 as Dollar Weakens on Jobs Data",
    description: "Spot gold advanced 1.3% as a weaker-than-expected non-farm payrolls report weighed on the US dollar. Safe-haven demand also rose amid ongoing geopolitical tensions.",
    url: "https://www.kitco.com/", source: "Kitco", publishedAt: new Date(Date.now()-7*60*60*1000).toISOString(),
    category: "markets"
  },
  {
    title: "Ethereum ETF Sees $500M Inflows in First Week of Trading",
    description: "The newly approved Ethereum spot ETF attracted massive interest on debut, exceeding expectations. Ethereum price rose 8% in the same period to trade above $3,500.",
    url: "https://www.theblock.co/", source: "The Block", publishedAt: new Date(Date.now()-8*60*60*1000).toISOString(),
    category: "crypto"
  },
];

const MARKET_DATA = [
  { name: "S&P 500", value: "5,812.34", change: "+0.87%", up: true },
  { name: "NASDAQ", value: "18,204.55", change: "+1.22%", up: true },
  { name: "DOW JONES", value: "42,156.10", change: "+0.41%", up: true },
  { name: "NIFTY 50", value: "24,613.00", change: "-0.19%", up: false },
  { name: "SENSEX", value: "80,542.11", change: "-0.23%", up: false },
  { name: "GOLD", value: "$2,608.40", change: "+1.31%", up: true },
  { name: "BTC/USD", value: "$75,218", change: "+3.60%", up: true },
  { name: "USD/INR", value: "83.42", change: "-0.08%", up: false },
];

function Blog() {
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'guides'
    const [activeCategory, setActiveCategory] = useState('');
    const [liveNews, setLiveNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [activeNewsFilter, setActiveNewsFilter] = useState('all');
    const [newsMeta, setNewsMeta] = useState(null);

    const navigate = useNavigate();
    const filtered = activeCategory ? blogPosts.filter(p => p.category === activeCategory) : blogPosts;

    // Fetch through the server so provider credentials never enter the browser bundle.
    const loadNews = async () => {
        setIsLoading(true);
        setErrorMsg(null);

        try {
            const res = await fetch(MARKET_NEWS_ENDPOINT);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Live market news is unavailable.');

            const classifyArticle = (title, description, index) => {
                const text = `${title} ${description || ''}`.toLowerCase();
                if (text.includes('crypto') || text.includes('bitcoin') || text.includes('btc') || text.includes('ethereum')) return 'crypto';
                if (text.includes('fed') || text.includes('powell') || text.includes('inflation') || text.includes('interest rate') || text.includes('cpi')) return 'fed';
                if (text.includes('earning') || text.includes('revenue') || text.includes('profit') || text.includes('q3') || text.includes('q4') || text.includes('results')) return 'earnings';
                if (text.includes('gdp') || text.includes('imf') || text.includes('growth') || text.includes('economy')) return 'economy';
                const defaultCategories = ['markets', 'economy', 'earnings'];
                return defaultCategories[index % defaultCategories.length];
            };

            const mapped = data.articles.map((a, i) => ({
                title: a.title,
                description: a.description,
                url: a.url,
                source: a.source?.name || 'News Source',
                publishedAt: a.publishedAt,
                category: classifyArticle(a.title, a.description, i),
                featured: i === 0,
            }));

            setLiveNews(mapped);
            setNewsMeta(data);
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setLiveNews([]);
            setNewsMeta(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'news' && liveNews.length === 0) {
            loadNews();
        }
    }, [activeTab, liveNews.length]);

    // Helpers
    const timeAgo = (isoString) => {
        const diff = (Date.now() - new Date(isoString)) / 1000;
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
        return `${Math.floor(diff/86400)}d ago`;
    };

    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'FinTaxVers Financial Insights Blog',
        description: 'Expert articles on GST, income tax, business loans, MSME registration, and financial planning from Nagpur.',
        url: 'https://fintaxvers.com/blog',
        publisher: { '@type': 'Organization', name: 'FinTaxVers Consultancy Services', url: 'https://fintaxvers.com' }
    };

    // Filter live news
    const filteredNews = activeNewsFilter === 'all' 
        ? liveNews 
        : liveNews.filter(n => n.category === activeNewsFilter);
        
    const featuredStory = filteredNews.find(n => n.featured);
    const normalStories = filteredNews.filter(n => !n.featured || !featuredStory);

    return (
        <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
            <SEOHead
                title="Financial Insights & Live Market News | FinTaxVers"
                description="Real-time business news, live market indicators, and expert insights on GST, income tax, business loans, and financial planning."
                keywords="Live financial news, GST updates, income tax Nagpur, business loan guides, live market indices, Nifty 50, Sensex"
                canonical="https://fintaxvers.com/blog"
                schema={blogSchema}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #16325C 100%)', padding: '160px 0 60px', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ display: 'inline-block', marginBottom: '8px', background: 'rgba(22,163,74,0.2)', color: '#4ade80', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Financial Board
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '16px 0 12px', color: 'white' }}>
                        {activeTab === 'news' ? 'Live Financial News Terminal' : 'Expert Financial Guides & Tips'}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                        {activeTab === 'news' 
                            ? 'Real-time financial headlines, market indicators, and policy updates.'
                            : 'GST updates, tax saving strategies, loan documentation guides, and insights from Nagpur experts.'
                        }
                    </p>

                    {/* Blog Navigation Tabs */}
                    <div className="blog-tabs-container">
                        <button 
                            className={`blog-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                            onClick={() => setActiveTab('news')}
                        >
                            📊 Live Market News
                        </button>
                        <button 
                            className={`blog-tab-btn ${activeTab === 'guides' ? 'active' : ''}`}
                            onClick={() => setActiveTab('guides')}
                        >
                            📚 Expert Guides & Tips
                        </button>
                    </div>
                </div>
            </section>

            {/* LIVE NEWS TERMINAL TAB */}
            {activeTab === 'news' && (
                <div className="container" style={{ marginTop: '2.5rem' }}>
                    <div className="news-terminal-container">
                        

                        {/* SECTION HEADER FOR TERMINAL */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#0B1F3A', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                <span style={{ width: '4px', height: '24px', background: '#16a34a', borderRadius: '2px' }}></span>
                                Real-time Financial Feeds
                            </h2>
                            {newsMeta && (
                                <p style={{ color: '#64748b', fontSize: '0.78rem', margin: 0 }}>
                                    Source: {newsMeta.source} · Updated {new Date(newsMeta.fetchedAt).toLocaleString('en-IN')} {newsMeta.cached ? '· cached for up to 10 minutes' : ''}
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {['all', 'markets', 'earnings', 'crypto', 'economy', 'fed'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveNewsFilter(cat)}
                                            className={`terminal-filter-btn ${activeNewsFilter === cat ? 'active' : ''}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <button className="terminal-refresh-btn" onClick={loadNews} disabled={isLoading}>
                                    {isLoading ? 'Loading...' : '↻ Refresh'}
                                </button>
                            </div>
                        </div>

                        {/* NEWS GRID OR LOADER */}
                        {isLoading ? (
                            <div className="terminal-loading">
                                <div className="terminal-spinner"></div>
                                Loading latest financial news…
                            </div>
                        ) : errorMsg && liveNews.length === 0 ? (
                            <div className="terminal-loading" style={{ flexDirection: 'column', gap: '8px' }}>
                                <div style={{ color: '#ef4444' }}>Live market news is unavailable: {errorMsg}</div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>No substitute headlines are shown when a verified source is unavailable.</div>
                            </div>
                        ) : liveNews.length === 0 ? (
                            <div className="terminal-loading" style={{ flexDirection: 'column', gap: '8px' }}>
                                <div>No live market headlines are available right now.</div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Please refresh later or browse our expert guides below.</div>
                            </div>
                        ) : (
                            <div className="terminal-news-grid">
                                {/* Featured story */}
                                {featuredStory && activeNewsFilter === 'all' && (
                                    <a className="terminal-news-card featured" href={featuredStory.url} target="_blank" rel="noopener noreferrer">
                                        <div className="featured-text">
                                            <div><span className="featured-badge">★ Top Story</span></div>
                                            <div className="card-title">{featuredStory.title}</div>
                                            <p className="card-summary">{featuredStory.description}</p>
                                            <div className="card-footer">
                                                <div className="card-source">
                                                    <div className="source-dot"></div>
                                                    {featuredStory.source} · {timeAgo(featuredStory.publishedAt)}
                                                </div>
                                                <div className="card-link">Read full story →</div>
                                            </div>
                                        </div>
                                    </a>
                                )}

                                {/* Normal stories */}
                                {normalStories.map((a, idx) => (
                                    <a key={idx} className="terminal-news-card" href={a.url} target="_blank" rel="noopener noreferrer">
                                        <div className="card-top">
                                            <span className={`tag ${a.category || 'markets'}`}>{a.category}</span>
                                            <span className="card-time">{timeAgo(a.publishedAt)}</span>
                                        </div>
                                        <div className="card-title">{a.title}</div>
                                        <p className="card-summary">{a.description}</p>
                                        <div className="card-footer">
                                            <div className="card-source">
                                                <div className="source-dot"></div>
                                                {a.source}
                                            </div>
                                            <div className="card-link">Read →</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* EXPERT GUIDES & TIPS TAB */}
            {activeTab === 'guides' && (
                <section className="section">
                    <div className="container" style={{ padding: '56px 20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '2rem', color: '#0B1F3A', marginBottom: '10px' }}>Expert Guides & Tips</h2>
                            <p style={{ color: '#64748b', margin: 0 }}>Browse the published FinTaxVers guides by topic.</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                            <button className={`terminal-filter-btn ${!activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory('')}>All guides</button>
                            {blogCategories.map((category) => (
                                <button key={category} className={`terminal-filter-btn ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
                            {filtered.map((post) => (
                                <article key={post.slug} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={{ color: categoryColors[post.category] || '#16A34A', fontSize: '0.78rem', fontWeight: 700 }}>{post.category}</span>
                                    <h3 style={{ color: '#0B1F3A', fontSize: '1.1rem', lineHeight: 1.45, margin: '10px 0' }}>{post.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.92rem', flex: 1 }}>{post.excerpt}</p>
                                    <button onClick={() => navigate(`/blog/${post.slug}`)} style={{ background: 'none', border: 'none', color: '#16A34A', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Read guide →</button>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <div className="container" style={{ paddingBottom: '60px' }}>
                <div style={{ textAlign: 'center', padding: '50px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px' }}>
                    <h2 style={{ color: '#0B1F3A', marginBottom: '12px' }}>Need Expert Financial Advice in Nagpur?</h2>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>Consult with Yugant Rahele – Trusted Financial Consultant in Nagpur</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:+918928895195" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 8928895195</a>
                        <a href="tel:+919011424236" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 9011424236</a>
                        <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>WhatsApp Us</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Blog;
