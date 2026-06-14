import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
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
                title="Financial Insights Blog – GST, Tax, Loans & Business Tips"
                description="Expert articles on GST registration, income tax filing, business loans, CMA reports, MSME registration, and financial planning. Insights from FinTaxVers Consultancy Services, Nagpur."
                keywords="GST updates Nagpur, income tax tips India, business loan guide, MSME registration guide, financial planning tips, tax consultant blog Nagpur"
                canonical="https://fintaxvers.com/blog"
                schema={blogSchema}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #16325C 100%)', padding: '125px 0 60px', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ background: 'rgba(22,163,74,0.2)', color: '#4ade80', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Financial Insights</span>
                    <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '16px 0 12px', color: 'white' }}>Expert Financial Guides & Tips</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                        GST updates, tax saving strategies, loan documentation guides, and financial planning insights from our Nagpur experts.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => setActiveCategory('')}
                            style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', background: !activeCategory ? 'white' : 'transparent', color: !activeCategory ? '#0B1F3A' : 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: '0.2s' }}
                        >All</button>
                        {blogCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', background: activeCategory === cat ? 'white' : 'transparent', color: activeCategory === cat ? '#0B1F3A' : 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: '0.2s' }}
                            >{cat}</button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '28px' }}>
                        {filtered.map(post => (
                            <article
                                key={post.slug}
                                onClick={() => navigate(`/blog/${post.slug}`)}
                                style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(11,31,58,0.06)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(11,31,58,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(11,31,58,0.06)'; }}
                            >
                                <div style={{ padding: '28px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                        <span style={{ background: `${categoryColors[post.category]}15`, color: categoryColors[post.category], padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{post.category}</span>
                                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.1rem', color: '#0B1F3A', marginBottom: '12px', lineHeight: 1.4, fontWeight: 700 }}>{post.title}</h2>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>YR</div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0B1F3A' }}>{post.author}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                            </div>
                                        </div>
                                        <span style={{ color: '#16A34A', fontWeight: 600, fontSize: '0.85rem' }}>Read More →</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', marginTop: '60px', padding: '50px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ color: '#0B1F3A', marginBottom: '12px' }}>Need Expert Financial Advice in Nagpur?</h2>
                        <p style={{ color: '#64748b', marginBottom: '24px' }}>Consult with Yugant Rahele – Trusted Financial Consultant in Nagpur</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="tel:+918928895195" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 8928895195</a>
                            <a href="tel:+919011424236" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 9011424236</a>
                            <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>WhatsApp Us</a>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ background: '#0B1F3A', color: 'rgba(255,255,255,0.6)', padding: '30px 0', textAlign: 'center', fontSize: '0.9rem' }}>
                <div className="container">
                    <p>© 2026 FinTaxVers Consultancy Services, Nagpur, Maharashtra, India. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Blog;
