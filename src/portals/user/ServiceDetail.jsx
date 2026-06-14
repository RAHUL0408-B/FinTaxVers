import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, servicesData } from '../../data/servicesData';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const serviceData = getServiceById(serviceId);
        if (serviceData) {
            setService(serviceData);
            window.scrollTo(0, 0);
        } else {
            // Service not found, redirect to home
            navigate('/');
        }
    }, [serviceId, navigate]);

    const handleContactClick = () => {
        navigate('/', { state: { scrollTo: 'contact' } });
    };

    if (!service) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading service details...</p>
            </div>
        );
    }

    // Build SEO schemas
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.overview,
        provider: {
            '@type': 'FinancialService',
            name: 'FinTaxVers Consultancy Services',
            url: 'https://fintaxvers.com',
            telephone: '+91-8928895195, +91-9011424236',
            address: { '@type': 'PostalAddress', addressLocality: 'Nagpur', addressRegion: 'Maharashtra', addressCountry: 'IN' }
        },
        areaServed: { '@type': 'City', name: 'Nagpur' },
        serviceType: service.category,
    };
    const faqSchema = service.faq && service.faq.length ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
    } : null;
    const seoTitle = service.seoTitle || `${service.title} in Nagpur`;
    const seoDesc = service.metaDescription || `Expert ${service.title} services in Nagpur, Maharashtra. ${service.shortDesc} Contact FinTaxVers Consultancy – Yugant Rahele at +91-8928895195 / +91-9011424236.`;
    const seoKeywords = `${service.title} Nagpur, ${service.category} Nagpur, financial consultant Nagpur, FinTaxVers, Yugant Rahele, ${service.title} Maharashtra`;
    const canonicalSlug = service.canonicalSlug || service.id;
    const relatedServices = Object.values(servicesData)
        .filter(s => s.id !== service.id && s.category === service.category)
        .slice(0, 3);

    return (
        <div className="service-detail-page">
            <SEOHead
                title={seoTitle}
                description={seoDesc}
                keywords={seoKeywords}
                canonical={`https://fintaxvers.com/services/${canonicalSlug}`}
                schema={serviceSchema}
            />
            {faqSchema && <SEOHead schema={faqSchema} />}
            <Navbar />

            {/* Hero Section */}
            <section className="service-hero" style={{
                background: 'linear-gradient(135deg, #051020 0%, #0B1F3A 50%, #16325C 100%)',
                padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 60px)',
                paddingTop: '125px',
                color: 'white'
            }}>
                <div className="container">
                    <div className="service-hero-content">
                        <div className="breadcrumb">
                            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                            <span> / </span>
                            <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a>
                            <span> / </span>
                            <span>{service.title}</span>
                        </div>
                        <div className="service-icon-large">{service.icon}</div>
                        <h1 className="service-title">{service.title}</h1>
                        <p className="service-category">{service.category}</p>
                        <p className="service-short-desc">{service.shortDesc}</p>
                        <div className="hero-actions">
                            <button className="btn btn-primary" onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}>
                                Get Started
                            </button>
                            <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                📞 Call: 8928895195
                            </a>
                            <a href="tel:9011424236" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                📞 Call: 9011424236
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="service-tabs-section">
                <div className="container">
                    <div className="service-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Key Features
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
                            onClick={() => setActiveTab('process')}
                        >
                            Our Process
                        </button>

                        <button
                            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                            onClick={() => setActiveTab('faq')}
                        >
                            FAQ
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="service-content-section section">
                <div className="container">
                    <div className="service-content-grid">
                        {/* Main Content */}
                        <div className="service-main-content">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Overview</h2>
                                    <p className="overview-text">{service.overview}</p>

                                    <div className="detailed-description"
                                        dangerouslySetInnerHTML={{ __html: service.detailedDescription }}>
                                    </div>

                                    <div className="benefits-section">
                                        <h3>Benefits</h3>
                                        <div className="benefits-grid">
                                            {service.benefits.map((benefit, index) => (
                                                <div key={index} className="benefit-item">
                                                    <span className="benefit-icon">✓</span>
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="ideal-for-section">
                                        <h3>Ideal For</h3>
                                        <ul className="ideal-for-list">
                                            {service.idealFor.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Features Tab */}
                            {activeTab === 'features' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Key Features</h2>
                                    <div className="features-grid">
                                        {service.keyFeatures.map((feature, index) => (
                                            <div key={index} className="feature-card glass-card">
                                                <div className="feature-number">{index + 1}</div>
                                                <h3>{feature.title}</h3>
                                                <p>{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process Tab */}
                            {activeTab === 'process' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Our Process</h2>
                                    <p className="process-intro">We follow a systematic approach to ensure the best results for our clients.</p>
                                    <div className="process-timeline">
                                        {service.process.map((step, index) => (
                                            <div key={index} className="process-step">
                                                <div className="step-marker">
                                                    <div className="step-number">{step.step}</div>
                                                    {index < service.process.length - 1 && <div className="step-line"></div>}
                                                </div>
                                                <div className="step-content">
                                                    <h3>{step.title}</h3>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}



                            {/* FAQ Tab */}
                            {activeTab === 'faq' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Frequently Asked Questions</h2>
                                    <div className="faq-list">
                                        {service.faq.map((item, index) => (
                                            <div key={index} className="faq-item glass-card">
                                                <h3 className="faq-question">
                                                    <span className="faq-icon">Q.</span>
                                                    {item.question}
                                                </h3>
                                                <p className="faq-answer">
                                                    <span className="faq-icon">A.</span>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="faq-cta">
                                        <h3>Still have questions?</h3>
                                        <p>Our team is here to help. Contact us for personalized assistance.</p>
                                        <button className="btn btn-primary" onClick={handleContactClick}>
                                            Contact Us
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="service-sidebar">
                            {/* Contact Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Need Help?</h3>
                                <p>Get in touch with our expert team</p>
                                <div className="contact-info">
                                    <div className="contact-item" style={{ display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                        <span className="contact-icon">📞</span>
                                        <div>
                                            <div className="contact-label">Call Us</div>
                                            <div className="contact-value" style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.95rem' }}>
                                                <a href="tel:8928895195" style={{ textDecoration: 'none', color: 'inherit' }}>8928895195</a>
                                                <a href="tel:9011424236" style={{ textDecoration: 'none', color: 'inherit' }}>9011424236</a>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="mailto:contact@fintaxvers.com" className="contact-item">
                                        <span className="contact-icon">📧</span>
                                        <div>
                                            <div className="contact-label">Email Us</div>
                                            <div className="contact-value">contact@fintaxvers.com</div>
                                        </div>
                                    </a>
                                    <a href={`https://wa.me/918928895195?text=${encodeURIComponent(`Hi Yugant, I am interested in ${service.title} for my business. Please provide more details.`)}`} target="_blank" rel="noreferrer" className="contact-item">
                                        <span className="contact-icon">💬</span>
                                        <div>
                                            <div className="contact-label">WhatsApp</div>
                                            <div className="contact-value">Chat with us</div>
                                        </div>
                                    </a>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. My business type is: `)}&type=${encodeURIComponent(service.category)}`)}>
                                    Request Consultation
                                </button>
                            </div>

                            {/* Quick Info Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Quick Info</h3>
                                <div className="quick-info-list">
                                    <div className="quick-info-item">
                                        <span className="info-label">Category</span>
                                        <span className="info-value">{service.category}</span>
                                    </div>

                                    <div className="quick-info-item">
                                        <span className="info-label">Expert</span>
                                        <span className="info-value">Yugant V. Rahele</span>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Why Choose Us?</h3>
                                <ul className="why-choose-list">
                                    <li>
                                        <span className="check-icon">✓</span>
                                        10+ Years Experience
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        500+ Satisfied Clients
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Expert Team
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Timely Delivery
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Affordable Pricing
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="service-cta-section" style={{
                background: 'linear-gradient(135deg, #051020 0%, #0B1F3A 50%, #16325C 100%)',
                padding: 'clamp(40px, 8vw, 60px) 0',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '20px' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
                        Let our experts handle your {service.title.toLowerCase()} needs. Contact us today for a free consultation.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)' }} onClick={handleContactClick}>
                            Schedule Consultation
                        </button>
                        <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call: 8928895195
                        </a>
                        <a href="tel:9011424236" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call: 9011424236
                        </a>
                    </div>
                </div>
            </section>

            {/* Location + Internal Links */}
            <section style={{ background: '#F8FAFC', padding: '40px 0' }}>
                <div className="container">
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#0B1F3A', marginBottom: '8px' }}>Serving Clients Across Nagpur, Maharashtra & India</h3>
                        <p style={{ color: '#64748b', marginBottom: '20px' }}>FinTaxVers Consultancy Services is a trusted {service.category.toLowerCase()} firm based in Nagpur, Maharashtra. We provide expert {service.title.toLowerCase()} services to businesses and individuals across Nagpur, Vidarbha, and Maharashtra. Contact our founder Yugant Rahele for personalized assistance.</p>
                        {relatedServices.length > 0 && (
                            <div>
                                <h4 style={{ color: '#0B1F3A', marginBottom: '12px', fontSize: '1rem' }}>Related Services</h4>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {relatedServices.map(s => (
                                        <button key={s.id} onClick={() => navigate(`/services/${s.id}`)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#F8FAFC', cursor: 'pointer', color: '#0B1F3A', fontWeight: 500, fontSize: '0.85rem' }}>
                                            {s.icon} {s.title}
                                        </button>
                                    ))}
                                    <button onClick={() => navigate('/')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #16A34A', background: '#F0FDF4', cursor: 'pointer', color: '#16A34A', fontWeight: 600, fontSize: '0.85rem' }}>🏠 Back to Home</button>
                                    <button onClick={() => navigate('/calculators')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #0B1F3A', background: '#EFF6FF', cursor: 'pointer', color: '#0B1F3A', fontWeight: 600, fontSize: '0.85rem' }}>🧮 Financial Calculators</button>
                                    <button onClick={() => navigate('/blog')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #7C3AED', background: '#F5F3FF', cursor: 'pointer', color: '#7C3AED', fontWeight: 600, fontSize: '0.85rem' }}>📖 Read Our Blog</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '30px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                        <p>© 2026 FinTaxVers Consultancy Services, Nagpur, Maharashtra, India. All rights reserved.</p>
                        <p style={{ marginTop: '8px' }}>Best financial consultant in Nagpur | GST consultant | Tax consultant | CMA report expert</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServiceDetail;
