import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="f-footer">
            <div className="f-wrap">

                <div className="f-grid">

                    {/* Brand + About + Contact */}
                    <div className="f-brand">
                        <div className="f-brand-name"><span className="dot"></span>FinTaxVers</div>
                        <p className="f-about">
                            <strong>FinTaxVers Consultancy Services</strong> is a trusted{' '}
                            <span className="accent">financial consultant in Nagpur, Maharashtra</span>,
                            founded by <strong>Yugant Rahele</strong>. We help individuals, MSMEs, and businesses with
                            GST registration &amp; filing, income tax returns, business loan project reports (CMA data),
                            MSME/Udyam registration, company incorporation, and year-round financial planning
                            across Nagpur and Maharashtra.
                        </p>

                        <div className="f-contact">
                            <div className="f-contact-row"><span className="ic">📍</span> <a href="https://share.google/1IwDqOBS8P4PNxiBU" target="_blank" rel="noopener noreferrer">Nagpur, Maharashtra, India</a></div>
                            <div className="f-contact-row"><span className="ic">📞</span> <a href="tel:+918928895195">+91-8928895195</a> / <a href="tel:+919011424236">+91-9011424236</a></div>
                            <div className="f-contact-row"><span className="ic">✉️</span> <a href="mailto:contact@fintaxvers.com">contact@fintaxvers.com</a></div>
                            <div className="f-contact-row"><span className="ic">🕘</span> Mon–Sat: 10 AM – 7 PM</div>
                        </div>

                        <div className="f-social">
                            <a href="https://www.linkedin.com/in/yugant-rahele-333101148/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/yugant.rahele" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/fintaxvers?igsh=bWJqMTN3bTNvZHBk" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href={`https://wa.me/918928895195`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M12.031 0C5.385 0 .004 5.382.004 12.028c0 2.127.553 4.195 1.603 6.015L.031 24l6.115-1.604a11.967 11.967 0 005.885 1.543c6.647 0 12.03-5.382 12.03-12.029C24.061 5.382 18.678 0 12.031 0zm7.126 17.15c-.296.837-1.488 1.516-2.19 1.584-.663.064-1.54-.158-3.953-1.157-3.447-1.428-5.694-4.958-5.867-5.187-.17-.229-1.396-1.859-1.396-3.54 0-1.682.884-2.52 1.2-2.853.313-.332.684-.416.91-.416.228 0 .456.002.656.01.21.009.49-.083.766.58.284.686.973 2.378 1.059 2.548.087.17.143.37-.027.597-.17.227-.257.37-.514.67-.256.299-.542.646-.77.873-.245.245-.506.516-.226.993.28.477 1.246 2.054 2.678 3.332 1.843 1.642 3.393 2.152 3.882 2.383.489.231.776.186 1.066-.145.29-.331 1.247-1.455 1.58-1.954.333-.499.664-.416 1.109-.25.445.166 2.808 1.32 3.287 1.569.479.25.798.375.914.582.115.207.115 1.205-.181 2.042z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="f-col">
                        <h5>Our Services</h5>
                        <ul>
                            <li><Link to="/services/gst-returns-solutions">GST Registration &amp; Filing</Link></li>
                            <li><Link to="/services/income-tax-planning">Income Tax Return (ITR)</Link></li>
                            <li><Link to="/services/tax-audit-services">Tax Audit (Sec 44AB)</Link></li>
                            <li><Link to="/services/internal-audit">Internal Audit &amp; Controls</Link></li>
                            <li><Link to="/services/financial-reporting">Accounting &amp; Bookkeeping</Link></li>
                            <li><Link to="/services/company-llp-formation">Company Registration (Pvt Ltd)</Link></li>
                            <li><Link to="/services/shop-act-msme">Business &amp; MSME Registration</Link></li>
                            <li><Link to="/services/business-loan-assistance">Business Loan Assistance</Link></li>
                            <li><Link to="/services/cma-data-project-financing">MSME Loans &amp; CMA Reports</Link></li>
                            <li><Link to="/services/govt-subsidy-consulting">Subsidy Loans (PMEGP/CMEGP)</Link></li>
                            <li><Link to="/services/roc-annual-compliance">ROC Annual Compliance</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="f-col">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><Link to="/calculators">GST &amp; EMI Calculators</Link></li>
                            <li><Link to="/calculators">SIP Calculator</Link></li>
                            <li><Link to="/calculators">Income Tax Calculator</Link></li>
                            <li><Link to="/links">Useful Govt &amp; Tax Links</Link></li>
                            <li><Link to="/blog">Financial Insights Blog</Link></li>
                            <li><a href={`https://wa.me/918928895195`} target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom strip */}
                <div className="f-bottom">
                    <div className="f-copy">© {new Date().getFullYear()} <strong>FinTaxVers Consultancy Services</strong> — Nagpur, Maharashtra, India. All rights reserved.</div>
                    <div className="f-seo-links">
                        <Link to="/">FinTaxVers</Link><span className="sep">|</span>
                        <Link to="/services/gst-returns-solutions">GST Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/income-tax-planning">Income Tax Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/tax-audit-services">Tax Audit Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/internal-audit">Internal Audit Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/financial-reporting">Accounting Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/shop-act-msme">Business Registration Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/business-loan-assistance">Business Loan Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/cma-data-project-financing">MSME Loan Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/govt-subsidy-consulting">Subsidy Loan Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/roc-annual-compliance">ROC Compliance Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/company-llp-formation">Company Registration Nagpur</Link><span className="sep">|</span>
                        <Link to="/">Yugant Rahele</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
