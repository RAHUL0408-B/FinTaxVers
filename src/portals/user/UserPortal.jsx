import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
    Briefcase, FileText, Landmark, Shield, FileCheck, Building2, 
    Calculator, ArrowRight, Phone, ChevronDown, CheckCircle, Quote,
    X, FileSignature
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import HeroSlider from '../../components/common/HeroSlider';
import SEOHead from '../../components/common/SEOHead';
import Footer from '../../components/common/Footer';
import FAQSection from '../../components/common/FAQSection';
import FintaxversAIChatWidget from '../../components/chat/FintaxversAIChatWidget';
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
      desc: 'Expert Income Tax Return (ITR) filing for salaried individuals, freelancers, businesses, and NRIs. Maximum tax deductions, 100% accuracy, and fast refund processing.',
      features: ['ITR-1 to ITR-7 all forms covered', 'Capital gains, business income, salary', 'Tax planning & refund tracking'],
      link: '/services/income-tax-planning'
    },
    {
      id: 2,
      cat: 'gst',
      img: '/services/gst_registration_1782653626758.png',
      categoryClass: 'cat-gst',
      categoryName: 'GST',
      title: 'GST Registration & Return Filing',
      desc: 'Complete GST lifecycle solutions — from GST registration and GSTIN generation to monthly/quarterly GSTR-1, 3B, 9 & 9C filing and ITC reconciliation.',
      features: ['GSTR-1, 3B, 9 & 9C filing', 'ITC reconciliation & tax advisory', 'GST notice replies & assessments'],
      link: '/services/gst-returns-solutions'
    },
    {
      id: 3,
      cat: 'tax',
      img: '/services/audit_accounting_1782653660793.png',
      categoryClass: 'cat-tax',
      categoryName: 'Tax & ITR',
      title: 'Tax Audit (Section 44AB)',
      desc: 'Statutory and Income Tax Audit under Section 44AB. Detailed 3CA, 3CB, and 3CD preparation, ledger review, and tax compliance validation for businesses & professionals.',
      features: ['Form 3CA, 3CB & 3CD filing', 'Turnover threshold assessment', 'Disallowance and deduction verification'],
      link: '/services/tax-audit-services'
    },
    {
      id: 4,
      cat: 'compliance',
      img: '/services/audit_accounting_1782653660793.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'Internal Audit & Risk Controls',
      desc: 'Independent internal audit, process review, internal financial control (IFC) testing, and operational risk assessments to strengthen corporate governance.',
      features: ['Internal financial controls (IFC)', 'SOP & fraud risk assessment', 'Management audit & operational reviews'],
      link: '/services/internal-audit'
    },
    {
      id: 5,
      cat: 'compliance',
      img: '/services/audit_accounting_1782653660793.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'Accounting & Bookkeeping Services',
      desc: 'End-to-end accounting services, Tally/Zoho/Quickbooks ledger maintenance, payroll processing, bank reconciliation, and final P&L / Balance Sheet preparation.',
      features: ['Tally & cloud-based bookkeeping', 'P&L, Balance Sheet preparation', 'Debtor/Creditor reconciliation & MIS'],
      link: '/services/financial-reporting'
    },
    {
      id: 6,
      cat: 'business',
      img: '/services/company_incorporation_1782653638993.png',
      categoryClass: 'cat-business',
      categoryName: 'Business Setup',
      title: 'Company Registration & Incorporation',
      desc: 'Incorporate your Private Limited (Pvt Ltd) Company, LLP, One Person Company (OPC), or Public Limited Company with MCA approvals, DIN, PAN, TAN & Bank setup.',
      features: ['Pvt. Ltd., LLP & OPC registration', 'MCA SPICe+ filing & DIN approval', 'MOA & AOA drafting & corporate kit'],
      link: '/services/company-llp-formation'
    },
    {
      id: 7,
      cat: 'registration',
      img: '/services/shop_act_1782793618309.png',
      categoryClass: 'cat-registration',
      categoryName: 'Registration',
      title: 'Business Registration & Shop Act',
      desc: 'Complete business registration for proprietorship, partnership, and shops including Shop Act (Gumasta) license, Trade License, and local municipal permits.',
      features: ['Shop Act (Gumasta) license', 'Partnership deed drafting & registration', 'Trade license & local permits'],
      link: '/services/shop-act-msme'
    },
    {
      id: 8,
      cat: 'finance',
      img: '/services/business_loan_1782793595395.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Business Loan Assistance',
      desc: 'Secured and unsecured business loans, CC/OD working capital limits, term loans, and machinery financing from leading PSU and private banks.',
      features: ['Unsecured & secured business loans', 'Working capital (CC / OD limits)', 'Fast bank approvals with top lenders'],
      link: '/services/business-loan-assistance'
    },
    {
      id: 9,
      cat: 'finance',
      img: '/services/cma_data_1782653694852.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'MSME Loan & CMA Project Reports',
      desc: 'Bank-ready CMA (Credit Monitoring Arrangement) data, Detailed Project Reports (DPR), and MSME Udyam loan applications under MUDRA & CGTMSE collateral-free schemes.',
      features: ['Bankable CMA reports for loan sanction', 'MUDRA & CGTMSE loan files', 'Detailed project financial projections'],
      link: '/services/cma-data-project-financing'
    },
    {
      id: 10,
      cat: 'finance',
      img: '/services/gov_subsidy_1782793607920.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Subsidy Loan & Government Grants',
      desc: 'Identify and claim government loan subsidies under PMEGP, CMEGP, PSI Maharashtra industrial schemes, and interest subsidy programs with end-to-end liaison.',
      features: ['PMEGP & CMEGP subsidy claims up to 35%', 'State industrial & capital subsidies', 'Scheme eligibility & documentation'],
      link: '/services/govt-subsidy-consulting'
    },
    {
      id: 11,
      cat: 'compliance',
      img: '/services/roc_compliance_1782653671630.png',
      categoryClass: 'cat-compliance',
      categoryName: 'Compliance',
      title: 'ROC Compliance & Annual Filings',
      desc: 'Statutory ROC annual filings (AOC-4, MGT-7), Director KYC (DIR-3 KYC), AGM resolutions, share capital changes, and complete MCA secretarial compliance.',
      features: ['AOC-4 & MGT-7 annual filings', 'DIR-3 KYC & DIN compliance', 'Board meeting minutes & registers'],
      link: '/services/roc-annual-compliance'
    },
    {
      id: 12,
      cat: 'registration',
      img: '/services/dsc_generated.png',
      categoryClass: 'cat-registration',
      categoryName: 'Registration',
      title: 'Digital Signature Certificate (DSC)',
      desc: 'Fast paperless Class 3 Digital Signature Certificate (DSC) for Income Tax, GST, MCA ROC filing, and e-tendering.',
      features: ['Paperless Class 3 DSC', 'Quick Aadhar OTP issuance', 'Minimal documentation'],
      link: '/services/digital-signature-certificate'
    },
    {
      id: 13,
      cat: 'trade',
      img: '/service-images/trade/import-export-logistics.jpg',
      categoryClass: 'cat-trade',
      categoryName: 'Import–Export & Tenders',
      title: 'Import–Export Business Establishment',
      desc: 'Set up your import–export business with IEC application support, business-setup guidance, and document readiness for international trade.',
      features: ['IEC application & DGFT profile support', 'Business setup & document checklist', 'Export-import compliance guidance'],
      link: '/services/import-export-business-establishment'
    },
    {
      id: 14,
      cat: 'trade',
      img: '/service-images/trade/gem-official.png',
      imageFit: 'contain',
      categoryClass: 'cat-trade',
      categoryName: 'Import–Export & Tenders',
      title: 'GeM Portal Registration',
      desc: 'Get guided support for GeM seller registration, profile readiness, catalogue preparation, and understanding the portal workflow.',
      features: ['Seller profile registration support', 'Catalogue & document readiness', 'GeM portal workflow guidance'],
      link: '/services/gem-portal-registration'
    },
    {
      id: 15,
      cat: 'trade',
      img: '/service-images/trade/tender-document-review.jpg',
      categoryClass: 'cat-trade',
      categoryName: 'Import–Export & Tenders',
      title: 'Government Tenders & Bid Support',
      desc: 'Prepare to participate in government tenders with eligibility review, document coordination, bid-readiness guidance, and submission support.',
      features: ['Tender eligibility & checklist review', 'Bid document coordination', 'E-tender submission readiness'],
      link: '/services/government-tenders-bid-support'
    },
    {
      id: 16,
      cat: 'finance',
      img: '/services/business_loan_1782793595395.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'MSME & Business Loan',
      desc: 'Working capital (CC/OD), term loan and MSME loan assistance with project report, CMA data and complete bank documentation for businesses across India.',
      features: ['Working capital & term loans', 'Mudra, CGTMSE & PMEGP guidance', 'Clean, bank-ready loan file'],
      link: '/services/msme-business-loan'
    },
    {
      id: 18,
      cat: 'finance',
      img: '/images/home_loan_hero_new.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Home Loan & Loan Against Property',
      desc: 'Home loan and loan-against-property guidance for salaried and self-employed applicants – eligibility, documents and lender comparison.',
      features: ['Home loan & LAP assistance', 'Document checklist & review', 'Lender comparison'],
      link: '/services/home-loan'
    },
    {
      id: 19,
      cat: 'finance',
      img: '/images/car_loan_hero_new.png',
      categoryClass: 'cat-finance',
      categoryName: 'Finance & Loans',
      title: 'Car Loan Assistance',
      desc: 'New and used car loan support with documentation, eligibility check and lender guidance for individuals and businesses.',
      features: ['New & used car finance', 'Commercial vehicle loans', 'Minimal paperwork'],
      link: '/services/car-loan'
    },
    {
      id: 20,
      cat: 'global',
      img: '/service-images/financial-reporting.png',
      categoryClass: 'cat-trade',
      categoryName: 'Foreign & NRI',
      title: 'Foreign & International Accounting',
      desc: 'Multi-currency bookkeeping, export GST (LUT), FEMA, Form 15CA/15CB and transfer-pricing support for cross-border and foreign-linked businesses.',
      features: ['Multi-currency books & MIS', 'GST on exports & FEMA', '15CA/15CB & transfer pricing'],
      link: '/services/international-accounting-services'
    },
    {
      id: 21,
      cat: 'global',
      img: '/service-images/income-tax.png',
      categoryClass: 'cat-tax',
      categoryName: 'Foreign & NRI',
      title: 'NRI Tax Filing & FEMA',
      desc: 'NRI income-tax return, TDS on property sale, DTAA benefits and repatriation support – handled online from anywhere in the world.',
      features: ['NRI ITR & lower-TDS certificate', 'DTAA, TRC & Form 10F', 'Repatriation under FEMA'],
      link: '/services/nri-tax-fema-services'
    },
    {
      id: 22,
      cat: 'tax',
      img: '/services/tds_filing_1782653649499.png',
      categoryClass: 'cat-tax',
      categoryName: 'Tax & ITR',
      title: 'TDS / TCS Return Filing',
      desc: 'Quarterly TDS and TCS returns (24Q, 26Q, 27Q), Form 16/16A and TRACES default notice resolution.',
      features: ['24Q, 26Q, 27Q, 27EQ filing', 'Form 16 / 16A certificates', 'Default & notice handling'],
      link: '/services/tds-tcs-return-filing'
    }
];

const MotionArticle = motion.article;
const DSC_KEY_NOTICE_STORAGE_KEY = 'fintaxvers_dsc_key_notice_seen_v1';

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
    const shouldReduceMotion = useReducedMotion();

    const scrollToSection = useCallback((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem(DSC_KEY_NOTICE_STORAGE_KEY)) return undefined;

        const timer = setTimeout(() => {
            window.localStorage.setItem(DSC_KEY_NOTICE_STORAGE_KEY, 'true');
            setShowDscPopup(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const dismissDscKeyNotice = () => {
        window.localStorage.setItem(DSC_KEY_NOTICE_STORAGE_KEY, 'true');
        setShowDscPopup(false);
    };

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
            // This deliberately synchronizes a service-page referral URL with the inquiry form.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(prev => ({
                ...prev,
                message: msg ? decodeURIComponent(msg) : prev.message,
                type: type ? decodeURIComponent(type) : prev.type
            }));
            scrollToSection('contact');
        }
    }, [location, scrollToSection]);

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

    const visibleServices = newServicesData.filter(service => activeFilter === 'all' || service.cat === activeFilter);

    const openService = (service) => {
        if (service.link !== '#') navigate(service.link);
    };

    const handleServiceKeyDown = (event, service) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openService(service);
        }
    };



    return (
        <div id="home" className="user-portal" style={{ background: 'var(--bg-page)' }}>
            <SEOHead
                title="FinTaxVers | GST, Income Tax, Business & MSME Loan, Foreign Accounting, Tax Audit, Company Registration | India & Global"
                description="FinTaxVers Consultancy Services – GST registration & returns, income tax & NRI tax filing, business & MSME loans, CMA data, foreign/international accounting, tax audit, ROC compliance, company registration, import-export and GeM support across India and abroad. Based in Nagpur."
                keywords="FinTaxVers, business loan, MSME loan, working capital loan, home loan, car loan, loan against property, foreign accounting services, international accounting, NRI tax filing, GST registration, income tax return, tax audit 44AB, internal audit, company registration, ROC compliance, import export, GeM registration, financial consultant Nagpur, CA services Nagpur, GST consultant Nagpur, business loan Nagpur, Yugant Rahele"
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
                <button className={`filter-btn ${activeFilter === 'trade' ? 'active' : ''}`} onClick={() => setActiveFilter('trade')}>Import–Export & Tenders</button>
                <button className={`filter-btn ${activeFilter === 'global' ? 'active' : ''}`} onClick={() => setActiveFilter('global')}>Foreign & NRI</button>
            </div>

            {/* SERVICES GRID */}
            <section id="services" className="services-section-new">
                <div className="section-label">What We Offer</div>
                <h2 className="section-title-new">Our Services</h2>
                <p className="section-sub">Comprehensive financial consultancy tailored for businesses, MSMEs and individuals across India and abroad.</p>

                <div className="services-grid-new" aria-live="polite">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visibleServices.map((service, index) => (
                            <MotionArticle
                                key={service.id}
                                layout={!shouldReduceMotion}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 32, x: index % 3 === 0 ? -18 : index % 3 === 2 ? 18 : 0 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: shouldReduceMotion ? 0.01 : 0.42, delay: shouldReduceMotion ? 0 : Math.min(index * 0.045, 0.3), ease: [0.22, 1, 0.36, 1] }}
                                whileHover={shouldReduceMotion ? undefined : { y: -10 }}
                                whileTap={{ scale: 0.99 }}
                                className="service-card-new"
                                role="link"
                                tabIndex={0}
                                aria-label={`Learn more about ${service.title}`}
                                onClick={() => openService(service)}
                                onKeyDown={(event) => handleServiceKeyDown(event, service)}
                            >
                                <div className={`card-visual${service.imageFit === 'contain' ? ' card-visual--contain' : ''}`}>
                                    <img src={service.img} alt={service.title} className="card-img" loading="lazy" />
                                    <span className="card-visual-glow" aria-hidden="true" />
                                </div>
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
                                        <span className="card-link" style={{ width: '100%', justifyContent: 'center' }}>
                                            Know More →
                                        </span>
                                    </div>
                                </div>
                            </MotionArticle>
                        ))}
                    </AnimatePresence>
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
                            <h3 style={{ color: 'white', marginTop: '6px', marginBottom: '10px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.3 }}>Your Trusted Finance Advisor – India &amp; Global</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '14px' }}>
                                <strong style={{ color: 'white' }}>Yugant Rahele</strong> is the founder of <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong>, a leading <strong style={{ color: '#4ade80' }}>financial consultancy serving clients across India and overseas</strong>. With an MBA in Finance and 8+ years of experience, he is a trusted name for GST registration, income tax filing, business loan project reports, CMA data, MSME registration and company formation — serving 500+ clients across India.
                            </p>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                                <img src={logo} alt="FinTaxVers Logo" style={{ width: '56px', filter: 'brightness(0) invert(1)' }} />
                                <div>
                                    <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Yugant Rahele</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>Founder, MBA Finance | Financial Consultant</p>
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
                        <h2 style={{ marginTop: '6px', fontSize: '1.4rem', lineHeight: 1.3 }}>Frequently Asked Questions – Financial Consultancy</h2>
                    </div>
                    <div>
                        <FAQItem question="What is CMA Data and why do I need it for a bank loan?" answer="CMA (Credit Monitoring Arrangement) data is a financial report with past figures and projections that banks use to assess working-capital and term-loan proposals. FinTaxVers prepares bank-ready CMA data and project reports." />
                        <FAQItem question="What types of business loans do you help with?" answer="We assist with MSME loans, working capital (cash credit/overdraft), term loans, Mudra loans, loan against property, home loans and car loans. Sanction and interest rate are decided by the lender." />
                        <FAQItem question="How long does GST registration take?" answer="GST registration usually takes about 3-7 working days after correct documents are submitted, subject to departmental verification. FinTaxVers handles the complete process online." />
                        <FAQItem question="What are the new tax regime slabs for FY 2025-26?" answer="Nil up to ₹4 lakh, 5% for ₹4-8 lakh, 10% for ₹8-12 lakh, 15% for ₹12-16 lakh, 20% for ₹16-20 lakh, 25% for ₹20-24 lakh and 30% above ₹24 lakh. Rebate under Section 87A makes tax nil up to ₹12 lakh of taxable income." />
                        <FAQItem question="What is the ITR due date?" answer="For individuals without audit the usual due date is 31 July, and 31 October for audit cases, unless extended by the CBDT. Belated returns can be filed up to 31 December with a late fee under Section 234F." />
                        <FAQItem question="Do you provide foreign and NRI accounting and tax services?" answer="Yes. We support exporters, foreign-linked companies and NRIs with international bookkeeping, GST on exports (LUT), FEMA, Form 15CA/15CB, DTAA and NRI income-tax return filing." />
                        <FAQItem question="How long does Company Registration take?" answer="A Private Limited Company or LLP is typically incorporated in about 7-10 working days when documents are in order. We handle MCA filings, PAN, TAN and post-incorporation compliance." />
                        <FAQItem question="What is MSME / Udyam Registration and what are its benefits?" answer="Udyam is the free government registration for micro, small and medium enterprises. Benefits include priority-sector lending, collateral-free credit through CGTMSE, subsidy eligibility and protection against delayed payments." />
                        <FAQItem question="How can I contact FinTaxVers Consultancy Services?" answer="Call +91-8928895195 / +91-9011424236, email contact@fintaxvers.com or WhatsApp us anytime. We work online with clients across India and abroad." />
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

            {/* AEO/GEO Homepage FAQ Section */}
            <section style={{ background: '#f8fafc', padding: '60px 0' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px' }}>
                    <FAQSection
                        title="Frequently Asked Questions — FinTaxVers"
                        faqs={[
                            {
                                question: 'What services does FinTaxVers offer?',
                                answer: 'FinTaxVers Consultancy Services offers GST registration and return filing, income-tax return filing, NRI tax and FEMA services, foreign and international accounting, tax audit under Section 44AB, internal audit, company and LLP registration, MSME/Udyam registration, ROC compliance, business and MSME loans (CMA data and project reports), home, car and property loans, government subsidy assistance, import-export setup, GeM registration and tender support, and Digital Signature Certificates.'
                            },
                            {
                                question: 'Who is the founder of FinTaxVers?',
                                answer: 'FinTaxVers Consultancy Services was founded by Yugant V. Rahele, a financial and tax consultant. The firm works online with clients across India and abroad.'
                            },
                            {
                                question: 'What is GST registration and when is it mandatory?',
                                answer: 'GST registration is generally mandatory when aggregate annual turnover exceeds ₹40 lakh for goods or ₹20 lakh for services (lower limits apply in some special-category states). It is also required for inter-state suppliers of services, e-commerce operators and businesses under reverse charge. FinTaxVers handles registration, GSTIN generation and ongoing return filing.'
                            },
                            {
                                question: 'How do I file an Income Tax Return (ITR)?',
                                answer: 'Returns are filed on the income-tax e-filing portal. ITR-1 suits resident individuals with salary, one house property and income up to ₹50 lakh; ITR-2 covers capital gains and higher income; ITR-3 and ITR-4 are for business or professional income (ITR-4 for presumptive taxation). FinTaxVers prepares and files accurate returns and compares the old and new tax regimes for you.'
                            },
                            {
                                question: 'What is a Tax Audit under Section 44AB?',
                                answer: 'A tax audit is mandatory for businesses with turnover above ₹1 crore (₹10 crore if cash receipts and payments are each within 5%) and for professionals with gross receipts above ₹50 lakh. The audit report in Form 3CA/3CB with 3CD is due by 30 September, and the return by 31 October. Failure can attract a penalty of 0.5% of turnover up to ₹1.5 lakh under Section 271B.'
                            },
                            {
                                question: 'How can I register a Private Limited Company in India?',
                                answer: 'You need at least two directors and two shareholders, DSC and DIN for directors, name approval, MOA and AOA, and the SPICe+ incorporation form on the MCA portal. FinTaxVers manages incorporation along with PAN, TAN, bank-account support and first-year compliance.'
                            },
                            {
                                question: 'Which government subsidy and loan schemes can help new businesses?',
                                answer: 'PMEGP gives a subsidy of 15% to 35% of project cost (maximum project cost ₹50 lakh for manufacturing and ₹20 lakh for service units). PM Mudra Yojana offers collateral-free loans up to ₹20 lakh. CGTMSE provides credit-guarantee cover for eligible MSME loans. State schemes such as CMEGP in Maharashtra have their own rules. FinTaxVers prepares project reports and applications.'
                            },
                            {
                                question: 'What is CMA Data and when is it needed?',
                                answer: 'CMA (Credit Monitoring Arrangement) data contains historical financials and projected balance sheets, profit and loss, cash-flow and fund-flow statements. Banks usually ask for it for working-capital and term-loan proposals above a threshold decided by the bank. FinTaxVers prepares bank-ready CMA data and detailed project reports.'
                            },
                            {
                                question: 'Do you serve clients outside India or NRIs?',
                                answer: 'Yes. FinTaxVers works online with exporters, foreign-linked companies and NRIs for international accounting, GST on exports, FEMA, Form 15CA/15CB and NRI tax filing. Contact: +91-8928895195 | +91-9011424236 | contact@fintaxvers.com'
                            }
                        ]}
                    />
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

            {/* AI Assistant Chat Widget */}
            <FintaxversAIChatWidget />

            {/* First-visit DSC key-generation notice */}
            <AnimatePresence>
                {showDscPopup && (
                    <div className="dsc-key-notice-overlay" onClick={dismissDscKeyNotice}>
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                            className="dsc-key-notice"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="dsc-key-notice-title"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="dsc-key-notice-close" type="button" aria-label="Dismiss DSC key generation notice" onClick={dismissDscKeyNotice}>
                                <X size={24} />
                            </button>
                            <div className="dsc-key-notice-copy">
                                <div className="dsc-key-notice-badge"><FileSignature size={16} /> Digital Signature Certificate</div>
                                <h2 id="dsc-key-notice-title"><strong>DSC Key</strong><br />Generation</h2>
                                <p>Fast. Secure. Paperless.</p>
                                <button className="dsc-key-notice-cta" type="button" onClick={() => {
                                    dismissDscKeyNotice();
                                    navigate('/services/digital-signature-certificate');
                                }}>
                                    Get Your DSC <span aria-hidden="true">→</span>
                                </button>
                                <span className="dsc-key-notice-once">Shown once — you can always find DSC under Services.</span>
                            </div>
                            <div className="dsc-key-notice-image-wrap" aria-hidden="true">
                                <img src="/images/dsc-key-generation-notice.jpg" alt="" className="dsc-key-notice-image" />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UserPortal;
