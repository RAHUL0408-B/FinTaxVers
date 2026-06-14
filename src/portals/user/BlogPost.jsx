import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import { getBlogPost, blogPosts } from '../../data/blogData';

function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getBlogPost(slug);
    const [openFaq, setOpenFaq] = useState(null);

    if (!post) {
        return (
            <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                <h2>Article not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/blog')} style={{ marginTop: '20px' }}>Back to Blog</button>
            </div>
        );
    }

    const related = blogPosts.filter(p => post.relatedPosts?.includes(p.slug));

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        author: { '@type': 'Person', name: 'Yugant Rahele', url: 'https://fintaxvers.com/#founder' },
        publisher: { '@type': 'Organization', name: 'FinTaxVers Consultancy Services', url: 'https://fintaxvers.com', logo: { '@type': 'ImageObject', url: 'https://fintaxvers.com/image_c26745.png' } },
        datePublished: post.date,
        dateModified: post.date,
        url: `https://fintaxvers.com/blog/${post.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://fintaxvers.com/blog/${post.slug}` },
        keywords: post.keywords,
        articleSection: post.category,
    };

    const faqSchema = post.faq ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
    } : null;

    const renderContent = (md) => {
        return md
            .replace(/^## (.+)$/gm, '<h2 style="color:#0B1F3A;margin:28px 0 12px;font-size:1.4rem">$1</h2>')
            .replace(/^### (.+)$/gm, '<h3 style="color:#0B1F3A;margin:20px 0 8px;font-size:1.15rem">$1</h3>')
            .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
            .replace(/\|(.+)\|/g, (m) => `<tr>${m.split('|').filter(Boolean).map(c => `<td style="padding:8px 12px;border:1px solid #e2e8f0">${c.trim()}</td>`).join('')}</tr>`)
            .replace(/(<tr>.*<\/tr>\n)+/gs, (t) => `<table style="width:100%;border-collapse:collapse;margin:16px 0">${t}</table>`)
            .replace(/^✅ (.+)$/gm, '<p style="color:#16A34A;margin:6px 0">✅ $1</p>')
            .replace(/^- (.+)$/gm, '<li style="margin:6px 0;color:#374151">$1</li>')
            .replace(/(<li.*<\/li>\n)+/gs, (l) => `<ul style="padding-left:24px;margin:12px 0">${l}</ul>`)
            .replace(/\n\n/g, '<br/>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    };

    return (
        <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
            <SEOHead
                title={post.metaTitle}
                description={post.metaDescription}
                keywords={post.keywords}
                canonical={`https://fintaxvers.com/blog/${post.slug}`}
                articleSchema={articleSchema}
                schema={faqSchema}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg,#0B1F3A,#16325C)', padding: '125px 0 50px', color: 'white' }}>
                <div className="container" style={{ maxWidth: '860px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/blog')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>← Blog</button>
                        <span style={{ background: 'rgba(22,163,74,0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{post.category}</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{post.readTime}</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', color: 'white', lineHeight: 1.3, marginBottom: '16px' }}>{post.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>YR</div>
                        <div>
                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{post.author}</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container" style={{ maxWidth: '860px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start' }}>
                        {/* Article */}
                        <article>
                            <div style={{ background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', lineHeight: 1.8, color: '#374151' }}>
                                <p style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0B1F3A', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>{post.excerpt}</p>
                                <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
                            </div>

                            {/* FAQ */}
                            {post.faq && (
                                <div style={{ marginTop: '32px', background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                                    <h2 style={{ color: '#0B1F3A', marginBottom: '20px' }}>Frequently Asked Questions</h2>
                                    {post.faq.map((f, i) => (
                                        <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                                                <span style={{ fontWeight: 600, color: '#0B1F3A', fontSize: '0.95rem' }}>{f.q}</span>
                                                <span style={{ color: '#16A34A', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                                            </button>
                                            {openFaq === i && <p style={{ marginTop: '10px', color: '#64748b', lineHeight: 1.6 }}>{f.a}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside style={{ position: 'sticky', top: '120px' }}>
                            <div style={{ background: 'linear-gradient(135deg,#0B1F3A,#16325C)', borderRadius: '16px', padding: '28px', color: 'white', marginBottom: '20px' }}>
                                <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '1.1rem' }}>Need Expert Help?</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '20px' }}>Talk to Yugant Rahele – Trusted Financial Consultant in Nagpur</p>
                                <a href="tel:+918928895195" style={{ display: 'block', background: '#16A34A', color: 'white', textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, marginBottom: '10px' }}>📞 +91-8928895195</a>
                                <a href="tel:+919011424236" style={{ display: 'block', background: '#16A34A', color: 'white', textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, marginBottom: '10px' }}>📞 +91-9011424236</a>
                                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" style={{ display: 'block', background: '#25D366', color: 'white', textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>WhatsApp Us</a>
                            </div>
                            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ color: '#0B1F3A', marginBottom: '14px', fontSize: '1rem' }}>Related Services</h3>
                                {post.relatedServices?.map(sid => (
                                    <button key={sid} onClick={() => navigate(`/services/${sid}`)} style={{ display: 'block', width: '100%', textAlign: 'left', background: '#F8FAFC', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', marginBottom: '8px', cursor: 'pointer', color: '#0B1F3A', fontWeight: 500, fontSize: '0.9rem' }}>
                                        → {sid.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </button>
                                ))}
                            </div>
                        </aside>
                    </div>

                    {/* Related Posts */}
                    {related.length > 0 && (
                        <div style={{ marginTop: '50px' }}>
                            <h2 style={{ color: '#0B1F3A', marginBottom: '24px' }}>Related Articles</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }}>
                                {related.map(p => (
                                    <div key={p.slug} onClick={() => navigate(`/blog/${p.slug}`)} style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                                        <span style={{ color: '#16A34A', fontSize: '0.75rem', fontWeight: 700 }}>{p.category}</span>
                                        <h3 style={{ color: '#0B1F3A', fontSize: '1rem', margin: '8px 0 10px', lineHeight: 1.4 }}>{p.title}</h3>
                                        <span style={{ color: '#16A34A', fontWeight: 600, fontSize: '0.85rem' }}>Read More →</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <footer style={{ background: '#0B1F3A', color: 'rgba(255,255,255,0.6)', padding: '30px 0', textAlign: 'center', fontSize: '0.9rem', marginTop: '60px' }}>
                <p>© 2026 FinTaxVers Consultancy Services, Nagpur, Maharashtra, India.</p>
            </footer>
        </div>
    );
}

export default BlogPost;
