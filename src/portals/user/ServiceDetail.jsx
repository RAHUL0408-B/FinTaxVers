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

            <div className="service-detail-container container">
                {/* Breadcrumbs */}
                <div className="breadcrumb">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                    <span> / </span>
                    <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a>
                    <span> / </span>
                    <span className="active-breadcrumb">{service.title}</span>
                </div>

                <div className="service-detail-grid">
                    {/* Left Column: Sidebar */}
                    <aside className="service-left-sidebar">
                        {/* Service Image */}
                        {service.image && (
                            <div className="sidebar-image-container">
                                <img 
                                    src={service.image.replace('.jpg', '.png')} 
                                    alt={service.title} 
                                    className="service-sidebar-image" 
                                />
                            </div>
                        )}

                        {/* Services Directory Menu */}
                        <div className="services-directory-card">
                            <h3>Our Services</h3>
                            <nav className="services-directory-nav">
                                {Object.values(servicesData).map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => navigate(`/services/${s.id}`)}
                                        className={`dir-nav-btn ${s.id === service.id ? 'active' : ''}`}
                                    >
                                        <span className="dir-nav-icon">{s.icon}</span>
                                        <span className="dir-nav-text">{s.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Quick Contact Card */}
                        <div className="sidebar-card contact-card">
                            <h3>Need Help?</h3>
                            <p>Contact our Nagpur experts today</p>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <div>
                                        <div className="contact-label">Call Us</div>
                                        <div className="contact-value">
                                            <a href="tel:8928895195">8928895195</a>
                                            <a href="tel:9011424236">9011424236</a>
                                        </div>
                                    </div>
                                </div>
                                <a href="mailto:contact@fintaxvers.com" className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <div>
                                        <div className="contact-label">Email</div>
                                        <div className="contact-value">contact@fintaxvers.com</div>
                                    </div>
                                </a>
                                <a 
                                    href={`https://wa.me/918928895195?text=${encodeURIComponent(`Hi Yugant, I am interested in ${service.title} for my business. Please provide more details.`)}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="contact-item"
                                >
                                    <span className="contact-icon">💬</span>
                                    <div>
                                        <div className="contact-label">WhatsApp</div>
                                        <div className="contact-value">Chat with us</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="sidebar-card why-choose-card">
                            <h3>Why Choose Us?</h3>
                            <ul className="why-choose-list">
                                <li><span className="check-icon">✓</span> 8+ Years Experience</li>
                                <li><span className="check-icon">✓</span> 500+ Satisfied Clients</li>
                                <li><span className="check-icon">✓</span> Expert Team</li>
                                <li><span className="check-icon">✓</span> Timely Delivery</li>
                                <li><span className="check-icon">✓</span> Affordable Pricing</li>
                            </ul>
                        </div>
                    </aside>

                    {/* Right Column: Main Content Box */}
                    <main className="service-right-content">
                        <div className="service-details-box">
                            {/* Header */}
                            <header className="service-details-header">
                                <span className="service-category-badge">{service.category}</span>
                                <h1 className="service-main-title">{service.title}</h1>
                                <p className="service-sub-desc">{service.shortDesc}</p>
                            </header>

                            {/* Section 1: Overview */}
                            <section className="details-section service-overview-section">
                                <h2>Overview</h2>
                                <p className="overview-paragraph">{service.overview}</p>
                                <div 
                                    className="html-description"
                                    dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
                                />
                            </section>

                            {/* Section 2: Benefits & Ideal For */}
                            <section className="details-section benefits-ideal-section">
                                <div className="split-grid">
                                    <div className="benefits-box">
                                        <h3>Benefits</h3>
                                        <ul className="benefits-checklist">
                                            {service.benefits.map((benefit, idx) => (
                                                <li key={idx}>
                                                    <span className="check-green">✓</span>
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="ideal-for-box">
                                        <h3>Ideal For</h3>
                                        <ul className="ideal-for-bullet-list">
                                            {service.idealFor.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Key Features */}
                            <section className="details-section features-section">
                                <h2>Key Features</h2>
                                <div className="compact-features-grid">
                                    {service.keyFeatures.map((feature, idx) => (
                                        <div key={idx} className="compact-feature-card">
                                            <div className="feature-card-header">
                                                <span className="feature-card-num">{idx + 1}</span>
                                                <h4>{feature.title}</h4>
                                            </div>
                                            <p>{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section 4: Our Process */}
                            <section className="details-section process-section">
                                <h2>Our Process</h2>
                                <div className="compact-timeline">
                                    {service.process.map((step, idx) => (
                                        <div key={idx} className="timeline-step">
                                            <div className="timeline-marker">
                                                <span className="timeline-num">{step.step}</span>
                                                {idx < service.process.length - 1 && <div className="timeline-line"></div>}
                                            </div>
                                            <div className="timeline-content">
                                                <h4>{step.title}</h4>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section 5: FAQs */}
                            {service.faq && service.faq.length > 0 && (
                                <section className="details-section faq-section">
                                    <h2>Frequently Asked Questions</h2>
                                    <div className="compact-faq-list">
                                        {service.faq.map((item, idx) => (
                                            <div key={idx} className="compact-faq-item">
                                                <div className="faq-q">
                                                    <span className="faq-q-icon">Q</span>
                                                    <h4>{item.question}</h4>
                                                </div>
                                                <div className="faq-a">
                                                    <span className="faq-a-icon">A</span>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Section 6: Pricing and Action */}
                            {service.pricing && (
                                <section className="details-section pricing-cta-section">
                                    <div className="pricing-cta-card">
                                        <div className="pricing-info-box">
                                            <span className="pricing-label">Starting Price</span>
                                            <h3 className="pricing-amount">{service.pricing.starting}</h3>
                                            {service.pricing.note && <p className="pricing-note">{service.pricing.note}</p>}
                                        </div>
                                        <div className="pricing-cta-actions">
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}
                                            >
                                                Get Started
                                            </button>
                                            <a href="tel:8928895195" className="btn btn-outline">
                                                📞 Call Nagpur Office
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '25px 0', marginTop: '40px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                        <p>© 2026 FinTaxVers Consultancy Services, Nagpur, Maharashtra, India. All rights reserved.</p>
                        <p style={{ marginTop: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                            Best financial consultant in Nagpur | GST consultant Nagpur | Tax consultant Nagpur | CMA report expert | Yugant Rahele
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServiceDetail;
