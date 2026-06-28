import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, FileText, Landmark, Shield, FileCheck, Building2, 
    Calculator, ArrowRight, Phone, ChevronDown, CheckCircle, Quote
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import HeroSlider from '../../components/common/HeroSlider';
import SEOHead from '../../components/common/SEOHead';
import logo from '../../assets/fintaxverslogo.png';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid var(--border-light)', padding: '20px 0' }}>
            <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600 }}>{question}</h4>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown color="var(--primary)" />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ marginTop: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function UserPortal() {
    const { addInquiry } = useApp();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', type: '', message: '', businessType: '', turnover: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                scrollToSection(location.state.scrollTo);
            }, 100);
        }

        const params = new URLSearchParams(location.search);
        const msg = params.get('message');
        const type = params.get('type');
        if (msg || type) {
            setFormData(prev => ({
                ...prev,
                message: msg ? decodeURIComponent(msg) : prev.message,
                type: type ? decodeURIComponent(type) : prev.type
            }));
            scrollToSection('contact');
        }
    }, [location]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const success = await addInquiry(formData);

        if (success) {
            setShowSuccess(true);
            setFormData({ name: '', email: '', mobile: '', type: '', message: '', businessType: '', turnover: '' });
            setTimeout(() => setShowSuccess(false), 5000);
        }
        setIsSubmitting(false);
    };

    const servicesList = [
        {
            category: "Core Services",
            items: [
                { title: "GST Registration Services", desc: "End-to-end GST Return Filing and registration for seamless compliance.", icon: <FileCheck size={32} />, link: "/services/gst-returns-solutions" },
                { title: "Income Tax Filing India", desc: "Expert tax planning and ITR Filing for individuals and businesses.", icon: <FileText size={32} />, link: "/services/income-tax-planning" },
                { title: "Company Registration Services", desc: "Pvt Ltd, LLP, and Firm registration with complete Business Compliance.", icon: <Building2 size={32} />, link: "/services/company-llp-formation" }
            ]
        },
        {
            category: "Financial Advisory",
            items: [
                { title: "Business Loan Project Report", desc: "Expert preparation of detailed project reports for quick bank approvals.", icon: <Briefcase size={32} />, link: "/services/cma-data-project-financing" },
                { title: "CMA Report Services", desc: "Credit Monitoring Arrangement data preparation for working capital.", icon: <Landmark size={32} />, link: "/services/cma-data-project-financing" },
                { title: "Financial Planning", desc: "Comprehensive Financial Consultancy Services for business growth.", icon: <Shield size={32} />, link: "/services/business-loan-assistance" }
            ]
        }
    ];

    return (
        <div id="home" className="user-portal" style={{ background: 'var(--bg-page)' }}>
            <SEOHead
                title="Trusted Financial Consultancy Services in Nagpur – Yugant Rahele"
                description="FinTaxVers Consultancy Services – Best financial consultant in Nagpur. Expert GST registration, income tax filing, business loan project reports, CMA reports & MSME registration. Call +91-8928895195 / +91-9011424236."
                keywords="best financial consultant in Nagpur, financial advisor Nagpur, GST consultant Nagpur, tax consultant Nagpur, income tax filing Nagpur, CMA report Nagpur, business loan project report Nagpur, Yugant Rahele, FinTaxVers"
                canonical="https://fintaxvers.com/"
            />
            <Navbar />
            <HeroSlider />

            {/* Services Section */}
            <section id="services" className="section" style={{ background: '#F8FAFC' }}>
                <style>{`
                    .flip-card { perspective: 1000px; height: 220px; cursor: pointer; }
                    .flip-card-inner {
                        position: relative; width: 100%; height: 100%;
                        transition: transform 0.65s cubic-bezier(0.4,0.2,0.2,1);
                        transform-style: preserve-3d;
                    }
                    .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
                    .flip-card-front, .flip-card-back {
                        position: absolute; inset: 0; border-radius: 16px;
                        backface-visibility: hidden; -webkit-backface-visibility: hidden;
                        display: flex; flex-direction: column; align-items: center;
                        justify-content: center; padding: 28px 24px; text-align: center;
                    }
                    .flip-card-front {
                        background: white;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 2px 12px rgba(11,31,58,0.06);
                    }
                    .flip-card-back {
                        background: linear-gradient(135deg, #0B1F3A 0%, #16325C 100%);
                        transform: rotateY(180deg);
                        box-shadow: 0 12px 32px rgba(11,31,58,0.25);
                    }
                    .flip-card-back .flip-btn {
                        margin-top: 18px; padding: 9px 22px;
                        background: #16A34A; color: white; border: none;
                        border-radius: 8px; font-size: 0.88rem; font-weight: 700;
                        cursor: pointer; transition: background 0.2s;
                    }
                    .flip-card-back .flip-btn:hover { background: #15803D; }
                `}</style>

                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>What We Do</span>
                        <h2 style={{ marginTop: '6px', fontSize: '1.6rem' }}>Trusted Financial Consultancy Services in Nagpur</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '660px', margin: '8px auto 0', lineHeight: 1.6, fontSize: '0.88rem' }}>
                            Expert GST, income tax, business loan project reports, CMA, MSME registration and company registration — tailored for Nagpur businesses.
                        </p>
                    </div>

                    <div className="services-container">
                        {servicesList.map((cat, idx) => (
                            <div key={idx} style={{ marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '24px', borderLeft: '4px solid #16A34A', paddingLeft: '14px', color: '#0B1F3A' }}>{cat.category}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                                    {cat.items.map((service, sIdx) => (
                                        <div key={sIdx} className="flip-card">
                                            <div className="flip-card-inner">
                                                {/* FRONT */}
                                                <div className="flip-card-front">
                                                    <div style={{
                                                        width: '60px', height: '60px', borderRadius: '14px',
                                                        background: '#EFF6FF', color: '#0B1F3A',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        marginBottom: '16px'
                                                    }}>
                                                        {service.icon}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.05rem', color: '#0B1F3A', margin: '0 0 10px', lineHeight: 1.3 }}>{service.title}</h3>
                                                    <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>Hover to learn more →</p>
                                                </div>

                                                {/* BACK */}
                                                <div className="flip-card-back">
                                                    <div style={{ color: '#4ade80', marginBottom: '10px' }}>{service.icon}</div>
                                                    <h3 style={{ fontSize: '1rem', color: 'white', margin: '0 0 12px', lineHeight: 1.3 }}>{service.title}</h3>
                                                    <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
                                                    <button className="flip-btn" onClick={() => navigate(service.link)}>
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Methodology – compact horizontal workflow */}
            <section style={{ background: '#F8FAFC', padding: '32px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>How We Work</span>
                        <h2 style={{ marginTop: '4px', fontSize: '1.4rem' }}>Our 4-Step Process</h2>
                    </div>

                    {/* Workflow row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap', rowGap: '16px' }}>
                        {[
                            { step: '01', title: 'Consultation', desc: 'Understand your goals', icon: '🤝' },
                            { step: '02', title: 'Document Submission', desc: 'Share docs digitally', icon: '📁' },
                            { step: '03', title: 'Expert Review', desc: 'CA team prepares reports', icon: '🔍' },
                            { step: '04', title: 'Execution', desc: 'Timely filing & delivery', icon: '✅' },
                        ].map((item, i, arr) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                {/* Step card */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    background: 'white', borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    padding: '20px 22px', width: '160px', textAlign: 'center',
                                    boxShadow: '0 2px 10px rgba(11,31,58,0.06)',
                                    position: 'relative'
                                }}>
                                    {/* Step number badge */}
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'var(--primary)', color: 'white',
                                        fontSize: '0.72rem', fontWeight: 700,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>{item.step}</div>
                                    <div style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '8px' }}>{item.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B1F3A', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</div>
                                </div>

                                {/* Arrow connector (not after last item) */}
                                {i < arr.length - 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', flexShrink: 0 }}>
                                        <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #0B1F3A, #16325C)' }} />
                                        <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid #16325C' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* About / Founder */}
            <section id="about" style={{ background: 'white', padding: '32px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Leadership</span>
                        <h2 style={{ marginTop: '6px', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', lineHeight: 1.3 }}>Yugant Rahele – Founder of FinTaxVers</h2>
                    </div>
                    <div style={{ background: 'var(--primary-dark)', borderRadius: '18px', overflow: 'hidden', color: 'white', display: 'flex', flexWrap: 'wrap' }}>
                        {/* Left: Bio */}
                        <div style={{ flex: '1 1 380px', padding: 'clamp(20px, 4vw, 36px)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>About the Founder</span>
                            <h3 style={{ color: 'white', marginTop: '6px', marginBottom: '10px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.3 }}>Your Trusted Finance Advisor in Nagpur</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '14px' }}>
                                <strong style={{ color: 'white' }}>Yugant Rahele</strong> is the founder of <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong>, a leading <strong style={{ color: '#4ade80' }}>financial consultancy in Nagpur, Maharashtra</strong>. With an MBA in Finance and 8+ years of experience, he is a trusted name for GST registration, income tax filing, business loan project reports, CMA data, MSME registration and company formation — serving 500+ clients across Nagpur.
                            </p>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                                <img src={logo} alt="FinTaxVers Logo" style={{ width: '56px', filter: 'brightness(0) invert(1)' }} />
                                <div>
                                    <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Yugant Rahele</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>Founder, MBA Finance | Financial Consultant Nagpur</p>
                                </div>
                            </div>
                        </div>
                        {/* Right: Stats */}
                        <div style={{ flex: '0 1 240px', background: 'var(--primary)', padding: 'clamp(20px, 4vw, 36px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>8+</div>
                                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', marginTop: '4px' }}>Years Experience</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>500+</div>
                                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', marginTop: '4px' }}>Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>Quick Answers</span>
                        <h2 style={{ marginTop: '6px', fontSize: '1.4rem', lineHeight: 1.3 }}>Frequently Asked Questions – Financial Consultancy in Nagpur</h2>
                    </div>
                    <div>
                        <FAQItem question="What is CMA Data and why do I need it for a bank loan?" answer="CMA (Credit Monitoring Arrangement) Data is a detailed financial report required by banks to evaluate your business's financial health before approving term loans or working capital limits. FinTaxVers prepares bank-ready CMA reports in Nagpur." />
                        <FAQItem question="How long does GST registration take in Nagpur?" answer="GST registration typically takes 3-7 working days after submitting all correct documents. FinTaxVers handles end-to-end GST registration in Nagpur, Maharashtra." />
                        <FAQItem question="What is the income tax filing deadline in India for FY 2024-25?" answer="The ITR filing deadline is 31st July 2025 for individuals without audit, and 31st October 2025 for businesses requiring audit. FinTaxVers provides expert income tax filing services in Nagpur." />
                        <FAQItem question="How long does Company Registration take in Nagpur?" answer="A Private Limited Company or LLP can be registered within 7-10 working days, provided all documents (PAN, Aadhaar, address proof) are in order. We handle all MCA filings for you." />
                        <FAQItem question="Can you help me get a Mudra Loan or business loan in Nagpur?" answer="Yes, we assist in preparing project reports, CMA data, financial projections, and compliance documents required for Mudra Loans, MSME loans, and all business loans from banks in Nagpur." />
                        <FAQItem question="Do you provide monthly GST return filing services?" answer="Absolutely. We offer end-to-end GST solutions including new registrations, monthly/quarterly GSTR-1 and GSTR-3B filings, ITC reconciliation, and annual GSTR-9 filing." />
                        <FAQItem question="What is MSME / Udyam Registration and what are its benefits?" answer="Udyam Registration is free government certification for micro, small, and medium enterprises. Benefits include priority loans, government subsidies, protection from delayed payments, and tax benefits. FinTaxVers completes Udyam registration in 1-2 days." />
                        <FAQItem question="How can I contact FinTaxVers Consultancy Services in Nagpur?" answer="Call us at +91-8928895195 / +91-9011424236, email contact@fintaxvers.com, or WhatsApp us anytime. Our office is in Nagpur, Maharashtra. We serve clients across Nagpur, Vidarbha, and all of Maharashtra." />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.4rem' }}>Book a Free Consultation</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>Fill out the form below and our experts will get back to you within 24 hours.</p>
                    </div>
                    
                    <div style={{ background: 'var(--bg-input)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                        {showSuccess ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <CheckCircle size={64} color="var(--secondary)" style={{ margin: '0 auto 20px' }} />
                                <h3>Request Submitted!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Thank you. Yugant V. Rahele will contact you shortly.</p>
                                <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setShowSuccess(false)}>Send Another Request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
                                        <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', transition: '0.3s' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Mobile Number</label>
                                        <input type="tel" required placeholder="+91" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
                                        <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Business Type</label>
                                        <select value={formData.businessType || ''} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', background: 'white' }}>
                                            <option value="">Select Business Type</option>
                                            <option value="Proprietorship">Proprietorship</option>
                                            <option value="Partnership">Partnership / LLP</option>
                                            <option value="Pvt Ltd">Private Limited</option>
                                            <option value="Startup">New Startup</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Inquiry Type</label>
                                    <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', background: 'white' }}>
                                        <option value="">Select Inquiry Type</option>
                                        <option>Project Report (CMA) / Loan</option>
                                        <option>Company Registration</option>
                                        <option>GST Services</option>
                                        <option>Taxation</option>
                                        <option>Audit & Assurance</option>
                                    </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Message</label>
                                    <textarea rows="4" placeholder="Tell us about your requirements..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', resize: 'vertical' }}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 600 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: 'var(--primary-dark)', color: 'rgba(255,255,255,0.7)', paddingTop: '40px', paddingBottom: '24px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '32px', marginBottom: '20px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <a href="/" style={{ display: 'inline-block', marginBottom: '18px' }}>
                                <img src={logo} alt="FinTaxVers Consultancy Services – Best Financial Consultant in Nagpur" style={{ height: '54px', width: 'auto', objectFit: 'contain' }} />
                            </a>
                            <p style={{ lineHeight: 1.8, marginBottom: '16px', maxWidth: '420px' }}>
                                <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong> is a trusted <strong style={{ color: '#4ade80' }}>financial consultancy in Nagpur, Maharashtra</strong>, founded by <strong style={{ color: 'white' }}>Yugant Rahele</strong>. We offer expert GST registration, income tax filing, business loan project reports, CMA reports, MSME registration, company registration, and comprehensive financial planning services across Nagpur and Maharashtra.
                            </p>
                            <address style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>
                                📍 Nagpur, Maharashtra, India<br />
                                📞 <a href="tel:+918928895195" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91-8928895195</a> / <a href="tel:+919011424236" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91-9011424236</a><br />
                                ✉️ <a href="mailto:contact@fintaxvers.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>contact@fintaxvers.com</a><br />
                                🕐 Mon–Sat: 10 AM – 7 PM
                            </address>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <a href="https://www.linkedin.com/in/yugant-rahele" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#0077B5'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} title="Yugant Rahele LinkedIn">in</a>
                                <a href="https://www.facebook.com/fintaxvers" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#1877F2'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} title="FinTaxVers Facebook">fb</a>
                                <a href="https://www.instagram.com/fintaxvers" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#E1306C'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} title="FinTaxVers Instagram">ig</a>
                                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#25D366'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} title="WhatsApp FinTaxVers">wa</a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Our Services</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><a href="/services/cma-data-project-financing" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Business Loan Project Report</a></li>
                                <li><a href="/services/gst-returns-solutions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>GST Registration &amp; Filing</a></li>
                                <li><a href="/services/income-tax-planning" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Income Tax Filing</a></li>
                                <li><a href="/services/company-llp-formation" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Company Registration</a></li>
                                <li><a href="/services/shop-act-msme" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>MSME / Udyam Registration</a></li>
                                <li><a href="/services/business-loan-assistance" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Business Loan Assistance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Quick Links</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><a href="/calculators" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>GST &amp; EMI Calculators</a></li>
                                <li><a href="/calculators" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>SIP Calculator</a></li>
                                <li><a href="/calculators" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Income Tax Calculator</a></li>
                                <li><a href="/links" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Useful Links</a></li>
                                <li><a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>WhatsApp Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                        <p>© 2026 <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong> – Nagpur, Maharashtra, India. All rights reserved.</p>
                        <p style={{ marginTop: '6px', color: 'rgba(255,255,255,0.4)' }}>Best Financial Consultant in Nagpur | GST Consultant Nagpur | Tax Consultant Nagpur | CMA Report Expert | Yugant Rahele</p>
                    </div>
                </div>
            </footer>

            {/* Floating CTA */}
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer"
                    style={{ width: '60px', height: '60px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)', color: 'white', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.56 9.78L4 44l10.47-2.52A19.86 19.86 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36a16 16 0 0 1-8.17-2.25l-.58-.35-6.21 1.5 1.54-5.97-.38-.61A15.94 15.94 0 0 1 8 24c0-8.84 7.16-16 16-16s16 7.16 16 16-7.16 16-16 16zm8.77-11.9c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.4-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
                    </svg>
                </a>
                <a href="tel:+918928895195"
                    style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px var(--primary-glow)', color: 'white', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Phone size={28} />
                </a>
            </div>
        </div>
    );
}

export default UserPortal;
