import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SEOHead from '../components/common/SEOHead';
import logo from '../assets/fintaxverslogo.png';

const sections = [
  {
    id: "government",
    title: "Government Websites",
    icon: "🏛️",
    color: "linear-gradient(to right, #1e3a8a, #1e40af)", // from-blue-900 to-blue-800
    accent: "#3b82f6", // blue-500
    badgeBg: "#dbeafe", // blue-100
    badgeText: "#1e40af", // blue-800
    links: [
      { label: "Reserve Bank of India (RBI)", url: "https://www.rbi.org.in/", desc: "Monetary policy, banking regulations & financial stability" },
      { label: "Income Tax Department", url: "https://www.incometax.gov.in/", desc: "ITR filing, TDS, PAN, and tax compliance" },
      { label: "GST Portal", url: "https://www.gst.gov.in/", desc: "GST registration, filing, payments & returns" },
      { label: "Ministry of Corporate Affairs (MCA)", url: "https://www.mca.gov.in/", desc: "Company registration, ROC filings & compliance" },
      { label: "Udyam Registration", url: "https://udyamregistration.gov.in/", desc: "MSME registration for small & medium enterprises" },
      { label: "MSME Ministry", url: "https://msme.gov.in/", desc: "Schemes, policies & support for MSMEs" },
      { label: "Mahagst (Maharashtra GST)", url: "https://mahagst.gov.in/", desc: "Maharashtra state GST portal for local compliance" },
      { label: "IBEF – India Brand Equity Foundation", url: "https://www.ibef.org", desc: "Insights, reports and data on Indian industry and investment" },
      { label: "DGFT IEC Profile Management", url: "https://www.dgft.gov.in/CP/?opt=iec-profile-management", desc: "Manage IEC profile and related services" },
    ],
  },
  {
    id: "banking",
    title: "Financial Institutions",
    icon: "🏦",
    color: "linear-gradient(to right, #064e3b, #065f46)", // emerald
    accent: "#10b981",
    badgeBg: "#d1fae5",
    badgeText: "#065f46",
    links: [
      { label: "HDFC Bank", url: "https://www.hdfcbank.com/", desc: "Private sector banking & financial services" },
      { label: "ICICI Bank", url: "https://www.icicibank.com/", desc: "Banking, loans, insurance & investments" },
      { label: "State Bank of India (SBI)", url: "https://www.sbi.co.in/", desc: "India's largest public sector bank" },
      { label: "Punjab National Bank", url: "https://www.pnbindia.in/", desc: "Public sector banking & financial solutions" },
      { label: "Bank of India", url: "https://www.bankofindia.co.in/", desc: "Public banking, loans & corporate services" },
      { label: "Axis Bank", url: "https://www.axisbank.com/", desc: "Private banking, credit cards & wealth management" },
      { label: "Kotak Mahindra Bank", url: "https://www.kotak.com/", desc: "Banking, investments & insurance services" },
    ],
  },
  {
    id: "news",
    title: "Finance News",
    icon: "📰",
    color: "linear-gradient(to right, #78350f, #92400e)", // amber
    accent: "#f59e0b",
    badgeBg: "#fef3c7",
    badgeText: "#92400e",
    links: [
      { label: "The Economic Times", url: "https://economictimes.indiatimes.com/", desc: "India's leading financial & business newspaper" },
      { label: "Moneycontrol", url: "https://www.moneycontrol.com/", desc: "Markets, mutual funds & personal finance news" },
      { label: "Business Standard", url: "https://www.business-standard.com/", desc: "In-depth business, economy & market analysis" },
      { label: "LiveMint", url: "https://www.livemint.com/", desc: "Financial news, opinion & data journalism" },
      { label: "Financial Express", url: "https://www.financialexpress.com/", desc: "Economy, banking, tax & market coverage" },
      { label: "Times of India – Business", url: "https://timesofindia.indiatimes.com/business", desc: "Business & corporate news from TOI" },
    ],
  },
  {
    id: "stocks",
    title: "Stock Market",
    icon: "📈",
    color: "linear-gradient(to right, #4c1d95, #5b21b6)", // violet
    accent: "#8b5cf6",
    badgeBg: "#ede9fe",
    badgeText: "#5b21b6",
    links: [
      { label: "BSE India", url: "https://www.bseindia.com/", desc: "Bombay Stock Exchange – India's oldest exchange" },
      { label: "NSE India", url: "https://www.nseindia.com/", desc: "National Stock Exchange – equities, derivatives & more" },
      { label: "SEBI", url: "https://www.sebi.gov.in/", desc: "Securities & Exchange Board – market regulator" },
      { label: "Moneycontrol Markets", url: "https://www.moneycontrol.com/markets/", desc: "Live market data, charts & stock screeners" },
    ],
  },
  {
    id: "ca",
    title: "CA Governance",
    icon: "⚖️",
    color: "linear-gradient(to right, #881337, #9f1239)", // rose
    accent: "#f43f5e",
    badgeBg: "#ffe4e6",
    badgeText: "#9f1239",
    links: [
      { label: "ICAI – Pune Branch", url: "https://puneicai.org/", desc: "Institute of Chartered Accountants – Pune chapter" },
      { label: "ICAI National", url: "https://www.icai.org/", desc: "Official portal for CA profession in India" },
      { label: "UDIN Portal", url: "https://udin.icai.org/", desc: "Unique Document Identification Number for CAs" },
    ],
  },
  {
    id: "registration",
    title: "Business Registration",
    icon: "📋",
    color: "linear-gradient(to right, #164e63, #155e75)", // cyan
    accent: "#06b6d4",
    badgeBg: "#cffafe",
    badgeText: "#155e75",
    links: [
      { label: "MCA Company Registration", url: "https://www.mca.gov.in/content/mca/global/en/mca/company-e-filing.html", desc: "Register your company with Ministry of Corporate Affairs" },
      { label: "Udyam Registration", url: "https://udyamregistration.gov.in/", desc: "Official MSME registration portal for businesses" },
      { label: "Startup India", url: "https://www.startupindia.gov.in/", desc: "Government schemes & support for Indian startups" },
      { label: "GeM Portal", url: "https://gem.gov.in/", desc: "Government e-Marketplace for procurement & selling" },
    ],
  },
];

function LinkCard({ label, url, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        backgroundColor: hovered ? '#f8fafc' : 'transparent',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        borderRadius: '4px'
      }}
    >
      <span
        style={{
          marginTop: '4px',
          flexShrink: 0,
          color: hovered ? '#2563eb' : '#94a3b8',
          fontSize: '14px',
          transition: 'color 0.2s ease'
        }}
      >
        {hovered ? "➜" : "›"}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: hovered ? '#1d4ed8' : '#1e293b',
          margin: '0 0 4px 0',
          transition: 'color 0.2s ease',
          lineHeight: 1.4
        }}>
          {label}
        </p>
        <p style={{
          fontSize: '12px',
          color: '#64748b',
          margin: 0,
          lineHeight: 1.5
        }}>
          {desc}
        </p>
      </div>
      <span style={{
        flexShrink: 0,
        opacity: hovered ? 1 : 0,
        color: '#3b82f6',
        fontSize: '12px',
        marginTop: '4px',
        transition: 'opacity 0.2s ease'
      }}>
        ↗
      </span>
    </a>
  );
}

function SectionCard({ section }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
    >
      {/* Section Header */}
      <div style={{
        background: section.color,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>{section.icon}</span>
        <div>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: '16px', margin: '0 0 4px 0', lineHeight: 1.2 }}>
            {section.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>
            {section.links.length} resources
          </p>
        </div>
      </div>

      {/* Links */}
      <div>
        {section.links.map((link) => (
          <LinkCard key={link.url} {...link} />
        ))}
      </div>
    </div>
  );
}

export default function Links() {
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <SEOHead
          title="Useful Financial and Government Links | FinTaxVers"
          description="Access important government, tax, finance, banking, stock market, and compliance links in one place with FinTaxVers."
          canonical="https://fintaxvers.com/links"
      />
      <Navbar />

      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(to bottom right, #0f172a, #172554, #0f172a)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px' // Offset for Navbar
      }}>
        {/* Subtle grid pattern */}
        <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
        }} />
        
        <div className="container" style={{ position: 'relative', padding: '12px 20px 16px', textAlign: 'center' }}>
          
          <div className="breadcrumb" style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#94a3b8', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
              <span>/</span>
              <span style={{ color: '#38bdf8', fontWeight: 500 }}>Useful Links</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            borderRadius: '9999px',
            padding: '4px 14px',
            marginBottom: '10px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#60a5fa' }}></span>
            <span style={{ color: '#93c5fd', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              FinTaxVers Resource Hub
            </span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 700, color: 'white', lineHeight: 1.2, margin: '0 0 8px 0' }}>
            Useful Financial &amp;{" "}
            <span style={{ color: '#38bdf8' }}>Government Links</span>
          </h1>
          
          <p style={{ color: '#94a3b8', fontSize: 'clamp(13px, 1.5vw, 15px)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            Quick access to trusted government, finance, taxation, compliance, banking,
            stock market, and CA resources — all in one place.
          </p>

          {/* Stats bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '14px', flexWrap: 'wrap' }}>
            {[
              { num: sections.length, label: "Categories" },
              { num: sections.reduce((a, s) => a + s.links.length, 0), label: "Resources" },
              { num: "100%", label: "Verified Links" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{stat.num}</div>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '12px 20px 48px' }}>
        {/* Quick Jump Nav */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px', justifyContent: 'center' }}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 500,
                padding: '6px 12px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                color: '#475569',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <span>{s.icon}</span>
              {s.title}
            </a>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <SectionCard section={section} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
            All links open in a new tab. Resources are curated for informational purposes only.
            <br />
            <span style={{ color: '#64748b', fontWeight: 500 }}>FinTaxVers</span> does not guarantee the accuracy of third-party content.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--primary-dark, #0f172a)', color: 'rgba(255,255,255,0.7)', paddingTop: '80px', paddingBottom: '30px' }}>
          <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '50px', marginBottom: '30px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                      <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ display: 'inline-block', marginBottom: '18px' }}>
                          <img src={logo} alt="FinTaxVers Consultancy Services" style={{ height: '54px', width: 'auto', objectFit: 'contain' }} />
                      </a>
                      <p style={{ lineHeight: 1.8, marginBottom: '16px', maxWidth: '420px' }}>
                          <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong> is a trusted <strong style={{ color: '#4ade80' }}>financial consultancy in Nagpur, Maharashtra</strong>, founded by <strong style={{ color: 'white' }}>Yugant Rahele</strong>.
                      </p>
                       <address style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>
                          📍 Nagpur, Maharashtra, India<br />
                          📞 <a href="tel:+918928895195" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91-8928895195</a> / <a href="tel:+919011424236" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91-9011424236</a><br />
                          ✉️ <a href="mailto:contact@fintaxvers.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>contact@fintaxvers.com</a>
                      </address>
                  </div>
                  <div>
                      <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Our Services</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <li><a href="/services/cma-data-project-financing" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Business Loan Project Report</a></li>
                          <li><a href="/services/gst-returns-solutions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>GST Registration &amp; Filing</a></li>
                          <li><a href="/services/income-tax-planning" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Income Tax Filing</a></li>
                          <li><a href="/services/company-llp-formation" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Company Registration</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Quick Links</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <li><a href="/calculators" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>GST &amp; EMI Calculators</a></li>
                          <li><a href="/links" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Useful Links</a></li>
                      </ul>
                  </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                  <p>© 2026 <strong style={{ color: 'white' }}>FinTaxVers Consultancy Services</strong> – Nagpur, Maharashtra, India. All rights reserved.</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
