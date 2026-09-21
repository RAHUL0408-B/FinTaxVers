import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, servicesData } from '../../data/servicesData';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import Footer from '../../components/common/Footer';
import FintaxversAIChatWidget from '../../components/chat/FintaxversAIChatWidget';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../../lib/seo/schemaGenerators';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);

    useEffect(() => {
        const serviceData = getServiceById(serviceId);
        if (serviceData) {
            setService(serviceData);
            window.scrollTo(0, 0);
        } else {
            navigate('/');
        }
    }, [serviceId, navigate]);

    if (!service) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--white)', color: 'var(--navy)' }}>
                <p>Loading service details...</p>
            </div>
        );
    }

    // SEO Data
    const seoTitle = service.seoTitle || `${service.title} in Nagpur & Pan India | FinTaxVers`;
    const seoDesc = service.metaDescription || `Expert ${service.title} services in Nagpur, Maharashtra & Pan India. ${service.shortDesc} Contact FinTaxVers Consultancy at +91-8928895195.`;
    const seoKeywords = service.seoKeywords || `${service.title}, ${service.title} Nagpur, ${service.title} India, ${service.category} Nagpur, financial consultant Nagpur, FinTaxVers, Yugant Rahele`;
    const canonicalSlug = service.canonicalSlug || service.id;

    // Get 3 related services
    const relatedServices = Object.values(servicesData)
        .filter(s => s.id !== service.id && s.category === service.category)
        .slice(0, 3);

    // Generate structured schemas for AEO/GEO
    const breadcrumbItems = [
        { name: 'Home', url: 'https://fintaxvers.com/' },
        { name: 'Services', url: 'https://fintaxvers.com/#services' },
        { name: service.title, url: `https://fintaxvers.com/services/${canonicalSlug}` }
    ];
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
    const serviceSchema = generateServiceSchema({
        name: service.title,
        description: service.shortDesc || service.overview,
        category: service.category,
        url: `https://fintaxvers.com/services/${canonicalSlug}`
    });
    const faqSchema = service.faq && service.faq.length > 0 ? generateFAQSchema(service.faq) : null;

    return (
        <div className="service-detail-page">
            <SEOHead
                title={seoTitle}
                description={seoDesc}
                keywords={seoKeywords}
                canonical={`https://fintaxvers.com/services/${canonicalSlug}`}
                serviceSchema={serviceSchema}
                faqSchema={faqSchema}
                breadcrumbSchema={breadcrumbSchema}
            />
            <Navbar />

            {/* BREADCRUMB */}
            <div className="breadcrumb-strip">
                <div className="wrap">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a><span className="sep">/</span>
                    <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a><span className="sep">/</span>
                    <span className="current">{service.title}</span>
                </div>
            </div>

            {/* HERO: heading + illustration only */}
            <section className="hero-sd">
                <div className="wrap hero-sd-inner">
                    <div className="hero-eyebrow"><span className="dot"></span> {service.category}</div>
                    <h1>{service.title}</h1>
                    <p className="lede">{service.overview}</p>
                    <div className="hero-ctas">
                        <button className="btn-sd btn-primary-sd" onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}>
                            Get Started →
                        </button>
                        <a href="tel:8928895195" className="btn-sd btn-ghost-sd">📞 Call 8928895195</a>
                    </div>
                </div>
            </section>

            {/* MAIN LAYOUT */}
            <section className="content-section-sd">
                <div className="wrap content-grid-sd">

                    {/* LEFT: image + small structured info */}
                    <div className="left-col-sd">
                        <div className="hero-illustration" style={{ overflow: 'hidden' }}>
                            {service.image ? (
                                <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            ) : (
                                <div className="ph">{service.icon}</div>
                            )}
                        </div>

                        <div className="info-box">
                            <h4>Need help?</h4>
                            <div className="contact-line" onClick={() => window.location.href='tel:8928895195'}>
                                <div className="contact-ic ic-call">📞</div>
                                <div><div className="label">Call us</div><div className="value">8928895195<br/>9011424236</div></div>
                            </div>
                            <div className="contact-line" onClick={() => window.location.href='mailto:contact@fintaxvers.com'}>
                                <div className="contact-ic ic-mail">✉️</div>
                                <div><div className="label">Email</div><div className="value">contact@fintaxvers.com</div></div>
                            </div>
                            <div className="contact-line" onClick={() => window.open(`https://wa.me/918928895195?text=${encodeURIComponent(`Hi Yugant, I am interested in ${service.title}.`)}`, '_blank')}>
                                <div className="contact-ic ic-wa">💬</div>
                                <div><div className="label">WhatsApp</div><div className="value">Chat with us</div></div>
                            </div>
                            <div className="contact-line" onClick={() => window.open('https://share.google/1IwDqOBS8P4PNxiBU', '_blank')} style={{ cursor: 'pointer' }}>
                                <div className="contact-ic" style={{ background: '#e0f2fe', color: '#0284c7' }}>📍</div>
                                <div><div className="label">Office Location</div><div className="value">Nagpur, Maharashtra</div></div>
                            </div>
                            <button className="side-cta-btn" onClick={() => navigate(`/?message=${encodeURIComponent(`I would like a callback regarding ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}>Request a callback</button>
                        </div>

                        <div className="info-box">
                            <h4>Quick info</h4>
                            <div className="info-row"><span>Category</span><span>{service.category}</span></div>
                            <div className="info-row"><span>Turnaround</span><span>3–5 days</span></div>
                            {service.pricing && <div className="info-row"><span>Pricing</span><span>{service.pricing.starting}</span></div>}
                        </div>

                        {relatedServices.length > 0 && (
                            <div className="info-box">
                                <h4>Related services</h4>
                                {relatedServices.map(s => (
                                    <div key={s.id} className="related-card" style={{cursor: 'pointer'}} onClick={() => navigate(`/services/${s.id}`)}>
                                        <div className="related-thumb" style={{display: 'flex', alignItems:'center', justifyContent: 'center', fontSize: '18px'}}>{s.icon}</div>
                                        <div>
                                            <strong>{s.title}</strong>
                                            <span>{s.shortDesc.substring(0, 35)}...</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: accordion content boxes */}
                    <div className="accordion">

                        <details className="acc-item" open>
                            <summary className="acc-head">
                                <div className="acc-head-left">
                                    <div className="acc-tag green">📋</div>
                                    <div><div className="acc-title">Overview</div><div className="acc-sub">What this service covers</div></div>
                                </div>
                                <div className="acc-chevron">▾</div>
                            </summary>
                            <div className="acc-body">
                                <div dangerouslySetInnerHTML={{ __html: service.detailedDescription }}></div>
                            </div>
                        </details>

                        {service.keyFeatures && service.keyFeatures.length > 0 && (
                            <details className="acc-item">
                                <summary className="acc-head">
                                    <div className="acc-head-left">
                                        <div className="acc-tag pink">⭐</div>
                                        <div><div className="acc-title">Key Features</div><div className="acc-sub">Why choose our {service.title.split(' ')[0]} service</div></div>
                                    </div>
                                    <div className="acc-chevron">▾</div>
                                </summary>
                                <div className="acc-body">
                                    <div className="feature-grid">
                                        {service.keyFeatures.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <div className="ic">✓</div>
                                                <div><strong>{feature.title}</strong><span>{feature.description}</span></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        )}

                        {service.process && service.process.length > 0 && (
                            <details className="acc-item">
                                <summary className="acc-head">
                                    <div className="acc-head-left">
                                        <div className="acc-tag amber">🔄</div>
                                        <div><div className="acc-title">Our Process</div><div className="acc-sub">How we work, step by step</div></div>
                                    </div>
                                    <div className="acc-chevron">▾</div>
                                </summary>
                                <div className="acc-body">
                                    {service.process.map((step, index) => (
                                        <div key={index} className="step-row">
                                            <div className="step-num">{step.step}</div>
                                            <div><h6>{step.title}</h6><p>{step.description}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        )}

                        {service.faq && service.faq.length > 0 && (
                            <details className="acc-item">
                                <summary className="acc-head">
                                    <div className="acc-head-left">
                                        <div className="acc-tag blue">❓</div>
                                        <div><div className="acc-title">FAQ</div><div className="acc-sub">Common questions</div></div>
                                    </div>
                                    <div className="acc-chevron">▾</div>
                                </summary>
                                <div className="acc-body">
                                    {service.faq.map((item, index) => (
                                        <details key={index} className="faq-item">
                                            <summary className="faq-q">{item.question} <span className="faq-plus">+</span></summary>
                                            <div className="faq-a">{item.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </details>
                        )}

                    </div>
                </div>
            </section>
            
            {/* AI Assistant Chat Widget */}
            <FintaxversAIChatWidget />

            <Footer />
        </div>
    );
};

export default ServiceDetail;
