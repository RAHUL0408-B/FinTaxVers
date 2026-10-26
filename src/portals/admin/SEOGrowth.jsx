import React from 'react';
import { servicesData } from '../../data/servicesData';
import { blogPosts } from '../../data/blogData';

const TASKS = [
    {
        priority: 'High',
        title: 'Connect Google Search Console',
        detail: 'Search clicks, impressions, CTR, position, and query opportunities are not available until this property is verified and connected.',
        action: 'Verify fintaxvers.com in Search Console, submit /sitemap.xml, then authorize a read-only reporting integration.',
        approval: 'Required — Google account access',
    },
    {
        priority: 'High',
        title: 'Replace the exposed NewsAPI key',
        detail: 'The old browser key was removed from the source. The live feed now expects a server-only NEWS_API_KEY.',
        action: 'Revoke the old NewsAPI key, create a replacement, and add it to the server environment only.',
        approval: 'Required — provider account access',
    },
    {
        priority: 'Medium',
        title: 'Review time-sensitive financial guidance',
        detail: 'Tax rules, loan schemes, and filing dates can change. Existing articles should be fact-checked before their next update.',
        action: 'Use official government or regulator sources, then update individual articles only after review.',
        approval: 'Required — editorial approval',
    },
];

const KEYWORD_IDEAS = [
    { topic: 'GST return filing Nagpur', intent: 'Commercial', page: '/services/gst-returns-solutions' },
    { topic: 'ITR filing consultant Nagpur', intent: 'Commercial', page: '/services/income-tax-planning' },
    { topic: 'CMA report for business loan Nagpur', intent: 'Transactional', page: '/services/cma-data-project-financing' },
    { topic: 'Udyam registration process Nagpur', intent: 'Informational', page: '/blog/msme-registration-udyam-2026' },
];

const badgeStyle = (priority) => ({
    display: 'inline-flex',
    borderRadius: '999px',
    padding: '4px 10px',
    fontSize: '0.75rem',
    fontWeight: 700,
    background: priority === 'High' ? '#fee2e2' : '#fef3c7',
    color: priority === 'High' ? '#b91c1c' : '#92400e',
});

function SEOGrowth() {
    const publicPageCount = 4 + Object.keys(servicesData).length + blogPosts.length;

    return (
        <>
            <header className="admin-header">
                <div>
                    <h2>SEO Growth</h2>
                    <p style={{ color: '#64748b', margin: '6px 0 0' }}>Project audit snapshot — recommendations are not live search metrics.</p>
                </div>
            </header>

            <section className="stats-grid">
                <div className="stat-card"><h4>Public URLs in sitemap</h4><div className="value">{publicPageCount}</div></div>
                <div className="stat-card"><h4>Published expert guides</h4><div className="value">{blogPosts.length}</div></div>
                <div className="stat-card"><h4>Search Console data</h4><div className="value" style={{ fontSize: '1.1rem' }}>Not connected</div></div>
            </section>

            <section className="inquiry-table-container" style={{ marginBottom: '24px' }}>
                <h3>Data sources & freshness</h3>
                <div style={{ display: 'grid', gap: '12px', marginTop: '16px', color: '#475569' }}>
                    <p style={{ margin: 0 }}><strong>Technical audit:</strong> current local project configuration; sitemap generated during the build.</p>
                    <p style={{ margin: 0 }}><strong>Google Analytics:</strong> an existing GA tag is present, but this view does not fetch or invent traffic data.</p>
                    <p style={{ margin: 0 }}><strong>Google Search Console:</strong> not connected. Clicks, impressions, CTR, rankings, queries, and countries will remain blank until authorized.</p>
                </div>
            </section>

            <section className="inquiry-table-container" style={{ marginBottom: '24px' }}>
                <h3>Prioritized next steps</h3>
                <div style={{ display: 'grid', gap: '14px', marginTop: '16px' }}>
                    {TASKS.map((task) => (
                        <article key={task.title} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={badgeStyle(task.priority)}>{task.priority}</span>
                                <strong style={{ color: '#0f172a' }}>{task.title}</strong>
                            </div>
                            <p style={{ color: '#475569', margin: '10px 0 6px', lineHeight: 1.55 }}>{task.detail}</p>
                            <p style={{ color: '#0f172a', margin: '0 0 6px', lineHeight: 1.55 }}><strong>Verify:</strong> {task.action}</p>
                            <small style={{ color: '#64748b' }}>{task.approval}</small>
                        </article>
                    ))}
                </div>
            </section>

            <section className="inquiry-table-container" style={{ marginBottom: '24px' }}>
                <h3>Keyword opportunities</h3>
                <p style={{ color: '#64748b', marginTop: '6px' }}>Ideas are mapped to existing pages. They have no fabricated volume, ranking, or competition figures.</p>
                <div style={{ overflowX: 'auto', marginTop: '16px' }}>
                    <table className="admin-table">
                        <thead><tr><th>Keyword idea</th><th>Intent</th><th>Existing destination</th></tr></thead>
                        <tbody>
                            {KEYWORD_IDEAS.map((idea) => (
                                <tr key={idea.topic}><td>{idea.topic}</td><td>{idea.intent}</td><td>{idea.page}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="inquiry-table-container">
                <h3>Content calendar</h3>
                <p style={{ color: '#64748b', marginTop: '6px' }}>Existing published guides only. No content is generated or published from this screen.</p>
                <div style={{ overflowX: 'auto', marginTop: '16px' }}>
                    <table className="admin-table">
                        <thead><tr><th>Topic</th><th>Primary keyword</th><th>Status</th><th>Published</th></tr></thead>
                        <tbody>
                            {blogPosts.map((post) => (
                                <tr key={post.slug}>
                                    <td>{post.title}</td>
                                    <td>{post.keywords.split(',')[0]}</td>
                                    <td>Published</td>
                                    <td>{post.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default SEOGrowth;
