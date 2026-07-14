import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        badge: 'GST Registration Services',
        headline: <>Fast & Reliable <span>GST Registration</span> Services</>,
        sub: 'Expert support for GST registration, return filing, and full compliance — so you focus on growing your business.',
        cta: 'Get Started',
        ctaHref: '#contact',
        secondaryCta: 'Learn More',
        secondaryHref: '/services/gst-returns-solutions',
        bgClass: 'hero-slide-1',
    },
    {
        id: 2,
        badge: 'Income Tax Filing India',
        headline: <>Hassle-Free <span>Income Tax Filing</span> Services</>,
        sub: 'Accurate ITR filing with expert CA guidance for individuals, salaried employees, and businesses across India.',
        cta: 'File Now',
        ctaHref: '#contact',
        secondaryCta: 'View Plans',
        secondaryHref: '/services/income-tax-planning',
        bgClass: 'hero-slide-2',
    },
    {
        id: 3,
        badge: 'Business Loan Project Reports',
        headline: <>Professional <span>Project Reports</span> for Business Loans</>,
        sub: 'Bank-ready CMA data and detailed project reports designed for quick loan approvals and working capital financing.',
        cta: 'Consult Now',
        ctaHref: '#contact',
        secondaryCta: 'Know More',
        secondaryHref: '/services/cma-data-project-financing',
        bgClass: 'hero-slide-3',
    },
    {
        id: 4,
        badge: 'All Types of Loans',
        headline: <>We Approve <span>All Loans</span></>,
        sub: 'Including company loan, home loan and all other types of loans. Get your loan approved quickly and hassle-free.',
        cta: 'Apply for Loan',
        ctaHref: '#contact',
        secondaryCta: 'Learn More',
        secondaryHref: '/services/loans',
        bgClass: 'hero-slide-4',
    },
    {
        id: 5,
        badge: 'Start Your Business',
        headline: <>Seamless <span>Company Registration</span></>,
        sub: 'Register your startup or company with zero hassle. We handle the paperwork so you can focus on growth.',
        cta: 'Register Now',
        ctaHref: '#contact',
        secondaryCta: 'Our Services',
        secondaryHref: '/services/registration',
        bgClass: 'hero-slide-5',
    },
    {
        id: 6,
        badge: 'Financial Security',
        headline: <>Expert <span>Tax Planning & Audits</span></>,
        sub: 'Minimize liabilities and ensure compliance with our comprehensive tax planning and audit services.',
        cta: 'Get Started',
        ctaHref: '#contact',
        secondaryCta: 'View Plans',
        secondaryHref: '/services/audit',
        bgClass: 'hero-slide-6',
    },
    {
        id: 7,
        badge: 'Business Growth',
        headline: <><span>Business Development</span></>,
        sub: 'Unorganised to Organised business model • Professional working • Business Development Model',
        cta: 'Know More',
        ctaHref: '#contact',
        secondaryCta: 'Our Services',
        secondaryHref: '#services',
        bgClass: 'hero-slide-7',
    },
    {
        id: 8,
        badge: 'Home Loan Services',
        headline: <>Quick & Easy <span>Home Loans</span></>,
        sub: 'Get the best interest rates for your dream home. Quick processing and minimum documentation.',
        cta: 'Apply Now',
        ctaHref: '#contact',
        secondaryCta: 'View Rates',
        secondaryHref: '/services/loans',
        bgClass: 'hero-slide-8',
    },
    {
        id: 9,
        badge: 'Car Loan Services',
        headline: <>Drive Your Dream <span>Car Today</span></>,
        sub: 'Fast car loan approvals with flexible repayment options and competitive interest rates.',
        cta: 'Apply Now',
        ctaHref: '#contact',
        secondaryCta: 'Know More',
        secondaryHref: '/services/loans',
        bgClass: 'hero-slide-9',
    },
];

const AUTOPLAY_INTERVAL = 5500;

const contentVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
    exit:   { opacity: 0, y: -18, transition: { duration: 0.35, ease: 'easeIn' } },
};

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
            aria-label="Hero Banner"
        >
            {/* Slides */}
            {slides.map((slide, idx) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${slide.bgClass} ${idx === current ? 'active' : ''}`}
                    aria-hidden={idx !== current}
                >
                    <div className="hero-slide-bg" />
                    <div className="hero-slide-overlay" />

                    <div className="hero-slide-content">
                        <AnimatePresence mode="wait">
                            {idx === current && (
                                <motion.div
                                    key={`slide-content-${slide.id}`}
                                    className="hero-slide-inner"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={contentVariants}
                                >
                                    {/* Badge */}
                                    <div className="hero-slide-badge">
                                        <span className="hero-slide-badge-dot" />
                                        {slide.badge}
                                    </div>

                                    {/* Headline */}
                                    <h1 className="hero-slide-headline">{slide.headline}</h1>

                                    {/* Sub */}
                                    <p className="hero-slide-sub">{slide.sub}</p>

                                    {/* CTAs */}
                                    <div className="hero-slide-actions">
                                        <a href={slide.ctaHref} className="hero-btn-primary">
                                            {slide.cta} <ArrowRight size={18} />
                                        </a>
                                        <a href={slide.secondaryHref} className="hero-btn-secondary">
                                            {slide.secondaryCta}
                                        </a>
                                    </div>

                                    {/* Trust bar */}
                                    <div className="hero-trust-bar">
                                        {[
                                            { value: '500+', label: 'Clients Served' },
                                            { value: '98%',  label: 'Filing Accuracy' },
                                            { value: 'Expert', label: 'CA Team' },
                                            { value: 'Fast',  label: 'Turnaround' },
                                        ].map((item, i, arr) => (
                                            <React.Fragment key={item.label}>
                                                <div className="hero-trust-item">
                                                    <span className="hero-trust-value">{item.value}</span>
                                                    <span className="hero-trust-label">{item.label}</span>
                                                </div>
                                                {i < arr.length - 1 && <div className="hero-trust-divider" />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            ))}

            {/* Prev / Next Arrows */}
            <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous slide">
                <ChevronLeft size={22} />
            </button>
            <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next slide">
                <ChevronRight size={22} />
            </button>

            {/* Dot indicators */}
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
