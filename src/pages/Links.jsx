import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SEOHead from '../components/common/SEOHead';
import Footer from '../components/common/Footer';
import logo from '../assets/fintaxverslogo.png';

import { linkSections as sections } from '../data/linkSections';

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

      <Footer />
    </div>
  );
}
