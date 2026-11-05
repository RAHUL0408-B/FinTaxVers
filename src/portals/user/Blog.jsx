import React, { useState } from 'react';
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

function Blog() {
    const [activeCategory, setActiveCategory] = useState('');

    const navigate = useNavigate();
    const filtered = activeCategory ? blogPosts.filter(p => p.category === activeCategory) : blogPosts;

    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'FinTaxVers Financial Insights Blog',
        description: 'Expert articles on GST, income tax, business loans, MSME registration, and financial planning from Nagpur.',
        url: 'https://fintaxvers.com/blog',
        publisher: { '@type': 'Organization', name: 'FinTaxVers Consultancy Services', url: 'https://fintaxvers.com' }
    };

    return (
        <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
            <SEOHead
                title="Financial Guides: GST, Income Tax & Loans | FinTaxVers"
                description="Expert guides on GST, income tax, business loans, MSME registration and financial planning from FinTaxVers, Nagpur."
                keywords="GST updates, income tax Nagpur, business loan guides, MSME registration guide, tax saving tips"
                canonical="https://fintaxvers.com/blog"
                schema={blogSchema}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #16325C 100%)', padding: '160px 0 60px', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ display: 'inline-block', marginBottom: '8px', background: 'rgba(22,163,74,0.2)', color: '#4ade80', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Financial Guides
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '16px 0 12px', color: 'white' }}>
                        Expert Financial Guides & Tips
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        GST updates, tax saving strategies, loan documentation guides, and insights from Nagpur experts.
                    </p>
                </div>
            </section>

            {/* EXPERT GUIDES & TIPS TAB */}
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
