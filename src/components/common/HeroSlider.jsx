import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=75`;

/* Each slide = two halves. Every half has its own real photo, keyword-rich copy and service link. */
const slides = [
    {
        id: 1,
        halves: [
            {
                tag: 'GST Return',
                title: <>Accurate <span>GST Return</span> Filing</>,
                sub: 'GST registration and monthly / quarterly return filing by expert CAs — compliant, on time and penalty-free.',
                cta: 'File GST Return',
                href: '/services/gst-returns-solutions',
                img: '1460925895917-afdab827c52f',
                alt: 'GST return filing dashboard on a laptop',
            },
            {
                tag: 'Income Tax Filing',
                title: <>Hassle-Free <span>Income Tax Filing</span></>,
                sub: 'Error-free ITR filing for salaried, professionals and businesses across India, with refund tracking.',
                cta: 'File ITR Now',
                href: '/services/income-tax-planning',
                img: '1554224155-6726b3ff858f',
                alt: 'Income tax forms and calculator for ITR filing',
            },
        ],
    },
    {
        id: 2,
        halves: [
            {
                tag: 'Project Report & CMA',
                title: <>Bank-Ready <span>Project Report &amp; CMA</span></>,
                sub: 'Detailed project reports and CMA data prepared for quick bank approvals and working capital finance.',
                cta: 'Get Project Report',
                href: '/services/cma-data-project-financing',
                img: '1454165804606-c3d57bc86b40',
                alt: 'Preparing CMA data and project report documents',
            },
            {
                tag: 'Loans & Subsidy',
                title: <>All <span>Loans &amp; Subsidy</span> Assistance</>,
                sub: 'Business, home and car loans plus government subsidy consulting with minimum documentation.',
                cta: 'Apply for Loan',
                href: '/services/business-loan-assistance',
                img: '1521791136064-7986c2920216',
                alt: 'Loan approval handshake',
            },
        ],
    },
    {
        id: 3,
        halves: [
            {
                tag: 'Company Registration',
                title: <>Seamless <span>Company Registration</span></>,
                sub: 'Private Limited, LLP, MSME (Udyam) and Shop Act registration — we handle all the paperwork.',
                cta: 'Register Company',
                href: '/services/company-llp-formation',
                img: '1450101499163-c8848c66ca85',
                alt: 'Signing company registration documents',
            },
            {
                tag: 'Business Development',
                title: <>Expert <span>Business Development</span></>,
                sub: 'Move from an unorganised to an organised business with a professional working and growth model.',
                cta: 'Grow My Business',
                href: '/services/business-development',
                img: '1542744173-8e7e53415bb0',
                alt: 'Business development strategy meeting',
            },
        ],
    },
    {
        id: 4,
        halves: [
            {
                tag: 'Internal Audit',
                title: <>Reliable <span>Internal Audit</span></>,
                sub: 'Strengthen internal controls, detect risks early and improve financial discipline with CA-led audits.',
                cta: 'Get Audit Support',
                href: '/services/internal-audit',
                img: '1553877522-43269d4ea984',
                alt: 'Internal audit team reviewing accounts',
            },
            {
                tag: 'Tax Planning & Audits',
                title: <>Expert <span>Tax Planning &amp; Audits</span></>,
                sub: 'Reduce tax liability legally and stay compliant with Sec 44AB tax audit and year-round tax planning.',
                cta: 'Plan My Tax',
                href: '/services/tax-audit-services',
                img: '1579532537598-459ecdaf39cc',
                alt: 'Business financial newspaper and tax planning',
            },
        ],
    },
    {
        id: 5,
        halves: [
            {
                tag: 'Import-Export',
                title: <><span>Import-Export</span> Business Setup</>,
                sub: 'IEC registration and complete import-export business establishment to take your business global.',
                cta: 'Start Exporting',
                href: '/services/import-export-business-establishment',
                img: '1494412574643-ff11b0a5c1c3',
                alt: 'Container port for import export business',
            },
            {
                tag: 'GeM & Govt. Tenders',
                title: <><span>GeM Portal</span> &amp; Govt. Tenders</>,
                sub: 'GeM portal registration and government tender bid support to win public-sector contracts.',
                cta: 'Register on GeM',
                href: '/services/gem-portal-registration',
                img: '1563013544-824ae1b704d3',
                alt: 'Online GeM portal registration on laptop',
            },
        ],
    },
];

const AUTOPLAY_INTERVAL = 6500;

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
    const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [paused, next]);

    return (
        <section
            className="hero-slider-section"
            id="home"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="FinTaxVers services"
        >
            {slides.map((slide, idx) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${idx === current ? 'active' : ''}`}
                    aria-hidden={idx !== current}
                >
                    <div className="hero-split">
                        {slide.halves.map((h, hIdx) => {
                            const Heading = idx === 0 && hIdx === 0 ? 'h1' : 'h2';
                            return (
                                <article
                                    key={h.tag}
                                    className={`hero-half hero-half-${hIdx === 0 ? 'a' : 'b'}`}
                                >
                                    <div
                                        className="hero-half-photo"
                                        style={{ backgroundImage: `url(${photo(h.img)})` }}
                                        role="img"
                                        aria-label={h.alt}
                                    />
                                    <div className="hero-half-shade" />
                                    <span className="hero-half-num" aria-hidden="true">
                                        {String(idx * 2 + hIdx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="hero-half-body">
                                        <span className="hero-half-tag">{h.tag}</span>
                                        <Heading className="hero-half-title">{h.title}</Heading>
                                        <p className="hero-half-sub">{h.sub}</p>
                                        <a href={h.href} className="hero-half-cta" tabIndex={idx === current ? 0 : -1}>
                                            {h.cta} <ArrowRight size={18} />
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            ))}

            <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous slide">
                <ChevronLeft size={22} />
            </button>
            <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next slide">
                <ChevronRight size={22} />
            </button>

            <div className="hero-slider-controls" role="tablist" aria-label="Slide indicators">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        className={`hero-dot ${idx === current ? 'active' : ''}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        role="tab"
                        aria-selected={idx === current}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
