import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/fintaxverslogo.png';




const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = (name) => {
        const isMobile = window.matchMedia('(max-width: 992px)').matches;
        if (isMobile) {
            setOpenDropdown(openDropdown === name ? null : name);
        }
    };

    const handleNavClick = (sectionId) => {
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
            }
        } else {
            navigate('/', { state: { scrollTo: sectionId } });
        }
    };

    const handleCalcNav = (calcId) => {
        setMenuOpen(false);
        setOpenDropdown(null);
        navigate('/calculators', { state: { calcId } });
    };

    return (
        <>
            {/* Top Header Bar */}
            <div className="top-header">
                <div className="container">
                    <div className="top-header-content">
                        <div className="top-header-left">
                            <a href="https://www.google.com/maps/search/?api=1&query=FinTaxVers+Nagpur" target="_blank" rel="noopener noreferrer" className="top-header-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                Nagpur
                            </a>
                            <a href="mailto:contact@fintaxvers.com" className="top-header-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                contact@fintaxvers.com
                            </a>
                        </div>
                        <div className="top-header-right">
                            <span className="top-header-item">
                                <svg width="14" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                </svg>
                                Mon-Sat: 10 AM - 7 PM
                            </span>
                            <a href="tel:8928895195" className="top-header-item top-header-phone">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                8928895195
                            </a>
                            <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 4px' }}>|</span>
                            <a href="tel:9011424236" className="top-header-item top-header-phone" style={{ marginLeft: 0 }}>
                                9011424236
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="logo" onClick={() => navigate('/')} style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0'
                    }}>
                        <img
                            className="navbar-logo-img"
                            src={logo}
                            alt="FinTaxVers Logo"
                            style={{
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                    </div>



                    <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="bar" style={{ background: 'var(--primary)' }}></div>
                        <div className="bar" style={{ background: 'var(--primary)' }}></div>
                        <div className="bar" style={{ background: 'var(--primary)' }}></div>
                    </div>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>

                        {/* Services Dropdown */}
                        <li className={`dropdown ${openDropdown === 'services' ? 'open' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('services'); }}>
                                Services
                                <span style={{ fontSize: '0.6rem', marginLeft: '4px' }}>▼</span>
                            </a>
                            <div className="dropdown-menu services-mega-menu glass-card">
                                <div className="calc-group">
                                    <h4>Business Finance</h4>
                                    <a href="/services/cma-data-project-financing" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/cma-data-project-financing'); }}>CMA Data & Project Financing</a>
                                    <a href="/services/business-loan-assistance" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/business-loan-assistance'); }}>Business Loan Assistance</a>
                                    <a href="/services/govt-subsidy-consulting" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/govt-subsidy-consulting'); }}>Govt. Subsidy Consulting</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Registration</h4>
                                    <a href="/services/company-llp-formation" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/company-llp-formation'); }}>Company / LLP Formation</a>
                                    <a href="/services/shop-act-msme" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/shop-act-msme'); }}>Shop Act & MSME (Udyam)</a>
                                    <a href="/services/roc-annual-compliance" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/roc-annual-compliance'); }}>ROC & Annual Compliance</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Tax & Ops</h4>
                                    <a href="/services/gst-returns-solutions" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/gst-returns-solutions'); }}>GST Returns & Solutions</a>
                                    <a href="/services/income-tax-planning" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/income-tax-planning'); }}>Income Tax & Planning</a>
                                    <a href="/services/financial-reporting" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/financial-reporting'); }}>Financial Reporting</a>
                                    <a href="/services/internal-audit" className="dropdown-item" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setOpenDropdown(null); navigate('/services/internal-audit'); }}>Internal Audit</a>
                                </div>
                            </div>
                        </li>

                        {/* Calculators Dropdown */}
                        <li className={`dropdown ${openDropdown === 'calculators' ? 'open' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('calculators'); }}>
                                Calculators
                                <span style={{ fontSize: '0.6rem', marginLeft: '4px' }}>▼</span>
                            </a>
                            <div className="dropdown-menu calculator-menu glass-card">
                                <div className="calc-group">
                                    <h4>Investments</h4>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('sip'); }}>SIP Calculator</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('step-up-sip'); }}>Step Up SIP</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('mf'); }}>Mutual Fund</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('cagr'); }}>CAGR Calculator</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('nps'); }}>NPS Calculator</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('swp'); }}>SWP Calculator</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Loans & Tax</h4>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('emi'); }}>EMI Calculator</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('home-affordability'); }}>Home Affordability</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('income-tax'); }}>Income Tax (New)</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('hra'); }}>HRA Calculator</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Planning</h4>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('emergency-fund'); }}>Emergency Fund</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('goal'); }}>Goal Planner</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('education'); }}>Child Education</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('retirement'); }}>Retirement</a>
                                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('wealth-target'); }}>Wealth Target</a>
                                </div>
                            </div>
                        </li>

                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
                        <li><a href="/links" onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate('/links'); }}>Links</a></li>
                        <li><a href="/blog" onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate('/blog'); }}>Blog</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
                    </ul>
                    <button className="nav-cta btn btn-primary" onClick={() => handleNavClick('contact')}>Book Consultation</button>
                </div>

            </nav>

            {/* ── Scrolling Ticker Bar ── */}
            <TickerBar />
        </>
    );
};

/* ─────────────────────────────────────────
   Ticker — pure JS animation via RAF
   Works regardless of any CSS conflicts
───────────────────────────────────────── */
const SERVICES = [
    'Income Tax Filing — Fast & Accurate',
    'GST Registration & Returns',
    'Company Incorporation & Compliance',
    'TDS Filing & Refunds',
    'Audit & Accounting Services',
    'ROC Filings & MCA Compliance',
    'CMA Data & Project Financing',
    'Business Loan Assistance',
    'Govt. Subsidy Consulting',
    'Shop Act & MSME (Udyam)',
    'Financial Reporting & Internal Audit',
];

function TickerBar() {
    const trackRef   = useRef(null);
    const wrapperRef = useRef(null);
    const xRef       = useRef(0);
    const rafRef     = useRef(null);
    const pauseRef   = useRef(false);

    useEffect(() => {
        const track   = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        /* ── Dynamic positioning: snap ticker right below the navbar ── */
        const positionTicker = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const bottom = navbar.getBoundingClientRect().bottom;
                wrapper.style.top = `${bottom}px`;
            }
        };
        positionTicker();
        window.addEventListener('resize', positionTicker);
        // Re-check after a short delay in case navbar finishes loading
        const posTimer = setTimeout(positionTicker, 300);

        /* ── RAF scroll animation ── */
        const startRaf = () => {
            const halfW = track.scrollWidth / 2;
            const speed = 0.5;                    // px per frame ≈ 30px/s @60fps
            const step  = () => {
                if (!pauseRef.current) {
                    xRef.current -= speed;
                    if (Math.abs(xRef.current) >= halfW) xRef.current = 0;
                    track.style.transform = `translateX(${xRef.current}px)`;
                }
                rafRef.current = requestAnimationFrame(step);
            };
            rafRef.current = requestAnimationFrame(step);
        };
        const rafTimer = setTimeout(startRaf, 150);

        return () => {
            clearTimeout(posTimer);
            clearTimeout(rafTimer);
            window.removeEventListener('resize', positionTicker);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* Fixed ticker bar — JS positions it right below the navbar dynamically */}
            <div ref={wrapperRef} style={{
                position: 'fixed',
                top: '95px',        /* fallback; overridden by JS */
                left: 0,
                width: '100%',
                zIndex: 999,
                background: '#1a3c6e',
                color: '#fff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                height: '32px',
                fontFamily: "'Segoe UI', sans-serif",
                userSelect: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
                {/* Label */}
                <div style={{
                    background: '#e8b400',
                    color: '#1a1a1a',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '0 14px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    flexShrink: 0,
                }}>Our Services</div>

                {/* Scroll Area */}
                <div style={{
                    overflow: 'hidden',
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
                    onMouseEnter={() => { pauseRef.current = true;  }}
                    onMouseLeave={() => { pauseRef.current = false; }}
                >
                    {/* Track — items duplicated for seamless loop */}
                    <div ref={trackRef} style={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        willChange: 'transform',
                    }}>
                        {[...SERVICES, ...SERVICES].map((item, i) => (
                            <span key={i} style={{
                                fontSize: '13px',
                                padding: '0 36px 0 0',
                                color: '#f0f4ff',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                flexShrink: 0,
                            }}>
                                <span style={{
                                    width: '5px',
                                    height: '5px',
                                    background: '#e8b400',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    flexShrink: 0,
                                }} />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
