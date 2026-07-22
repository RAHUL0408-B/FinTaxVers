import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, FileText, Landmark, Shield, FileCheck, Building2, 
    Calculator, ArrowRight, Phone, ChevronDown, CheckCircle, Quote,
    X, FileSignature
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import HeroSlider from '../../components/common/HeroSlider';
import SEOHead from '../../components/common/SEOHead';
import Footer from '../../components/common/Footer';
import logo from '../../assets/fintaxverslogo.png';
import './UserPortal.css';

const newServicesData = [
    {
      id: 1,
      cat: 'tax',
      img: '/services/income_tax_1782653614112.png',
      categoryClass: 'cat-tax',
      categoryName: 'Tax & ITR',
      title: 'Income Tax Filing — Fast & Accurate',
      desc: 'Expert ITR filing for salaried individuals, freelancers, businesses, and NRIs. We ensure maximum deductions, zero errors, and timely submission before deadlines.',
      features: ['ITR-1 to ITR-6 all forms covered', 'Capital gains, business income, salary', 'Tax planning & refund tracking'],
      link: '/services/income-tax-planning'
    },
    {
      id: 2,
      cat: 'gst',
      img: '/services/gst_registration_1782653626758.png',
      categoryClass: 'cat-gst',
      categoryName: 'GST',
      title: 'GST Registration & Returns',
      desc: 'Complete GST lifecycle management — from registration and GSTIN to monthly/quarterly GSTR filing and reconciliation. Stay 100% compliant with GSTN rules.',
      features: ['GSTR-1, 3B, 9 & 9C filing', 'ITC reconciliation & claim', 'GST notices & assessment support'],
      link: '/services/gst-returns-solutions'
    },
    {
      id: 3,
      cat: 'business',
      img: '/services/company_incorporation_1782653638993.png',
      categoryClass: 'cat-business',
      categoryName: 'Business Setup',
      title: 'Company Incorporation & Compliance',
      desc: 'Set up your business the right way. We handle Private Limited, LLP, OPC, and Partnership firm registrations — including MCA filings, PAN/TAN, and post-incorporation compliance so you can focus on growing your business.',
      features: ['Pvt. Ltd., LLP, OPC, Partnership registration', 'MCA, PAN, TAN, Bank account setup', 'MOA, AOA drafting & director KYC', 'Post-incorporation annual compliance'],
      link: '/services/company-llp-formation'
    },
    {
      id: 4,
      cat: 'tax',
      img: '/services/tds_filing_1782653649499.png',
      categoryClass: 'cat-tax',
      categoryName: 'Tax & ITR',
      title: 'TDS Filing & Refunds',
      desc: 'Accurate TDS deduction calculation, challan payment, and quarterly TDS return filing (24Q, 26Q, 27Q). We also help track and claim TDS refunds efficiently.',
      features: ['Form 24Q, 26Q, 27Q filing', 'TDS certificate (Form 16/16A) generation', 'Refund tracking & correction'],
      link: '/services/income-tax-planning'
    },
    {
      id: 5,
      cat: 'compliance',
      img: '/services/audit_accounting_1782653660793.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'Audit & Accounting Services',
      desc: 'Professional bookkeeping, Tally-based accounts maintenance, statutory audits, and internal audit reports that meet regulatory standards and support business decisions.',
      features: ['Tally & digital bookkeeping', 'Statutory & tax audit reports', 'P&L, Balance Sheet preparation'],
      link: '/services/financial-reporting'
    },
    {
      id: 6,
      cat: 'compliance',
      img: '/services/roc_compliance_1782653671630.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'ROC Filings & MCA Compliance',
      desc: 'Never miss a compliance deadline. We file all ROC-mandated annual returns, board resolutions, director KYC (DIR-3), and event-based MCA forms on your behalf.',
      features: ['AOC-4, MGT-7 annual filing', 'DIR-3 KYC & DIN compliance', 'Event-based forms (INC, CHG)'],
      link: '/services/roc-annual-compliance'
    },
    {
      id: 7,
      cat: 'finance',
      img: '/services/cma_data_1782653694852.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'CMA Data & Project Financing',
      desc: 'Bankable CMA (Credit Monitoring Arrangement) reports and detailed project reports for term loans, working capital, and MSME credit facilities from PSU and private banks.',
      features: ['CMA data for bank loan sanction', 'Project report & DPR preparation', 'MSME loan & MUDRA documentation'],
      link: '/services/cma-data-project-financing'
    },
    {
      id: 8,
      cat: 'finance',
      img: '/services/business_loan_1782793595395.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Business Loan Assistance',
      desc: 'End-to-end business loan support — eligibility assessment, documentation, bank liaison, and follow-up for MSME loans, CC limits, OD accounts, and term loans.',
      features: ['SBI, Bank of Baroda, Canara & more', 'MSME, MUDRA, CGTMSE schemes', 'Complete file preparation & bank follow-up'],
      link: '/services/business-loan-assistance'
    },
    {
      id: 9,
      cat: 'finance',
      img: '/services/gov_subsidy_1782793607920.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Government Subsidy Consulting',
      desc: 'We identify the right central and state government schemes for your business and handle the entire application process — from eligibility to subsidy disbursement follow-up.',
      features: ['PMEGP, CMEGP schemes', 'State industrial subsidy programs', 'Agriculture & solar scheme support'],
      link: '/services/govt-subsidy-consulting'
    },
    {
      id: 10,
      cat: 'registration',
      img: '/services/shop_act_1782793618309.png',
      categoryClass: 'cat-registration',
      categoryName: 'Registration',
      title: 'Shop Act & MSME Registration',
      desc: 'Obtain mandatory Shop Act (Gumasta) license and Udyam Aadhar (MSME) registration to legally operate your business and unlock government benefits, subsidies and priority lending.',
      features: ['Shop Act (Gumasta) license — all districts', 'Udyam Aadhar (MSME) registration', 'Trade License & Professional Tax'],
      link: '/services/shop-act-msme'
    },
    {
      id: 11,
      cat: 'compliance',
      img: '/services/annual_compliance_1782793628116.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'ROC & Annual Compliance Package',
      desc: 'A complete annual compliance retainer covering all ROC filings, board meetings, statutory registers, secretarial records, and year-end disclosures for Pvt. Ltd. companies.',
      features: ['AGM & board meeting minutes', 'Statutory register maintenance', 'Annual return + financial statement filing'],
      link: '/services/roc-annual-compliance'
    },
    {
      id: 12,
      cat: 'tax',
      img: '/services/professional_tax_1782793638097.png',
      categoryClass: 'cat-tax',
      categoryName: 'Tax & ITR',
      title: 'Professional Tax Registration & Filing',
      desc: 'Professional Tax (PT) is mandatory in Maharashtra for all businesses, employers and professionals. We handle PT registration, monthly deduction, and annual return filing.',
      features: ['PT registration (employer & employee)', 'Monthly challan & annual return', 'PT compliance for all staff'],
      link: '/services/income-tax-planning'
    },
    {
      id: 13,
      cat: 'registration',
      img: '/services/dsc_generated.png',
      categoryClass: 'cat-registration',
      categoryName: 'Registration',
      title: 'Digital Signature Certificate (DSC)',
      desc: 'Get your Digital Signature Certificate (DSC) quickly and securely. We offer a paperless, Aadhar-based process with the fastest turnaround time and minimal documentation.',
      features: ['Paperless & Quick Process', 'Aadhar-Based DSC Issuance', 'Minimal Documentation Required'],
      link: '/services/digital-signature-certificate'
    }
];

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
    const [activeFilter, setActiveFilter] = useState('all');
    const [showDscPopup, setShowDscPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDscPopup(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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

            {/* FILTER BAR */}
            <div className="filter-bar">
                <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Services</button>
                <button className={`filter-btn ${activeFilter === 'tax' ? 'active' : ''}`} onClick={() => setActiveFilter('tax')}>Tax & ITR</button>
                <button className={`filter-btn ${activeFilter === 'gst' ? 'active' : ''}`} onClick={() => setActiveFilter('gst')}>GST</button>
                <button className={`filter-btn ${activeFilter === 'business' ? 'active' : ''}`} onClick={() => setActiveFilter('business')}>Business Setup</button>
                <button className={`filter-btn ${activeFilter === 'compliance' ? 'active' : ''}`} onClick={() => setActiveFilter('compliance')}>Compliance</button>
                <button className={`filter-btn ${activeFilter === 'finance' ? 'active' : ''}`} onClick={() => setActiveFilter('finance')}>Finance & Loans</button>
                <button className={`filter-btn ${activeFilter === 'registration' ? 'active' : ''}`} onClick={() => setActiveFilter('registration')}>Registration</button>
            </div>

            {/* SERVICES GRID */}
            <section id="services" className="services-section-new">
                <div className="section-label">What We Offer</div>
                <h2 className="section-title-new">Our Services</h2>
                <p className="section-sub">Comprehensive financial consultancy tailored for businesses, MSMEs and individuals across Nagpur.</p>

                <div className="services-grid-new">
                    {newServicesData
                        .filter(service => activeFilter === 'all' || service.cat === activeFilter)
                        .map(service => (
                            <div 
                                key={service.id} 
                                className="service-card-new" 
                                onClick={() => service.link !== '#' && navigate(service.link)}
                            >
                                <img src={service.img} alt={service.title} className="card-img" />
                                <div className="card-body">
                                    <span className={`card-category ${service.categoryClass}`}>{service.categoryName}</span>
                                    <h3 className="card-title-new">{service.title}</h3>
                                    <p className="card-desc">{service.desc}</p>
                                    <ul className="card-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <div className="card-footer">
                                        <div className="card-link" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => {
                                            e.stopPropagation();
                                            if (service.link !== '#') navigate(service.link);
                                        }}>
                                            Know More →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <div className="cta-section-new">
                <div className="cta-text">
                    <h2>Not sure which service you need?</h2>
                    <p>Book a free 30-minute consultation with Yugant Rahele. We'll assess your situation and recommend the right plan — no obligation, no jargon.</p>
                </div>
                <div className="cta-actions">
                    <a href="tel:+918928895195" className="btn-primary-new">📞 Call Now: 89288 95195</a>
                    <a href="mailto:contact@fintaxvers.com" className="btn-outline-new">✉ Send Email</a>
                </div>
            </div>





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
            <section id="contact" className="section" style={{ background: '#EEF1F6' }}>
                <div className="form-wrap">
                    <div className="form-head">
                        <h2>Book a Free Consultation</h2>
                        <p>Fill out the form below and our experts will get back to you within 24 hours.</p>
                    </div>

                    <div className="form-card">
                        {showSuccess ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <CheckCircle size={64} color="var(--green)" style={{ margin: '0 auto 20px' }} />
                                <h3>Request Submitted!</h3>
                                <p style={{ color: 'var(--text-body)', marginTop: '10px' }}>Thank you. Yugant V. Rahele will contact you shortly.</p>
                                <button className="submit-btn" style={{ marginTop: '20px', width: 'auto', display: 'inline-block' }} onClick={() => setShowSuccess(false)}>Send Another Request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="field-grid">

                                    <div className="field">
                                        <div className="field-label"><span className="ic ic-green">👤</span> Full Name</div>
                                        <input type="text" placeholder="John Doe" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>

                                    <div className="field">
                                        <div className="field-label"><span className="ic ic-pink">📞</span> Mobile Number</div>
                                        <div className="phone-input">
                                            <div className="prefix">+91</div>
                                            <input type="tel" placeholder="98765 43210" required value={formData.mobile || ''} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="field-label"><span className="ic ic-blue">✉️</span> Email Address</div>
                                        <input type="email" placeholder="john@example.com" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>

                                    <div className="field">
                                        <div className="field-label"><span className="ic ic-amber">🏢</span> Business Type</div>
                                        <select value={formData.businessType || ''} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}>
                                            <option value="">Select Business Type</option>
                                            <option value="Salaried Individual">Salaried Individual</option>
                                            <option value="Freelancer">Freelancer</option>
                                            <option value="Proprietorship">Proprietorship</option>
                                            <option value="Partnership / LLP">Partnership / LLP</option>
                                            <option value="Private Limited Company">Private Limited Company</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="field full">
                                        <div className="field-label"><span className="ic ic-green">❓</span> Inquiry Type</div>
                                        <select required value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                            <option value="">Select Inquiry Type</option>
                                            <option value="GST Registration & Filing">GST Registration &amp; Filing</option>
                                            <option value="Income Tax Filing">Income Tax Filing</option>
                                            <option value="CMA Data & Project Financing">CMA Data &amp; Project Financing</option>
                                            <option value="Company Registration">Company Registration</option>
                                            <option value="MSME / Udyam Registration">MSME / Udyam Registration</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="field full">
                                        <div className="field-label"><span className="ic ic-pink">💬</span> Message</div>
                                        <textarea placeholder="Tell us about your requirements..." value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                                    </div>

                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending Request...' : 'Submit Inquiry →'}
                                </button>
                                <div className="form-note">We typically respond within a few hours during business hours.</div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

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

            {/* Big Landscape Image Ad Modal for DSC */}
            <AnimatePresence>
                {showDscPopup && (
                    <div className="dsc-ad-overlay" onClick={() => setShowDscPopup(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="dsc-ad-modal landscape-only"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="dsc-ad-close" onClick={() => setShowDscPopup(false)}>
                                <X size={24} />
                            </button>
                            <div className="dsc-ad-image-container landscape" onClick={() => {
                                setShowDscPopup(false);
                                navigate('/services/digital-signature-certificate');
                            }}>
                                <img src="/services/dsc_landscape_ad_poster.jpg" alt="Digital Signature Certificate & Consultancy Services Advertisement" className="dsc-ad-image" />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UserPortal;
