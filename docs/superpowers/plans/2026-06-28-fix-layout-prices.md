# Fix Layout and Remove Prices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the overlapping service header name by shifting it down below the ticker bar and remove all prices from the service details pages.

**Architecture:** We will increase `.service-detail-container` padding-top in `ServiceDetail.css` from `110px` to `150px`. We will rewrite the pricing CTA block in `ServiceDetail.jsx` to hide prices and show a general consultation message instead.

**Tech Stack:** React, CSS

---

### Task 1: Update ServiceDetail.css padding-top

**Files:**
- Modify: [ServiceDetail.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.css)

- [ ] **Step 1: Increase container padding-top**
  Change `.service-detail-container` padding-top from `110px` to `150px`.
  
  Code in `src/portals/user/ServiceDetail.css`:
  ```css
  .service-detail-container {
      padding-top: 110px; /* Offset the fixed navbar */
  }
  ```
  replace with:
  ```css
  .service-detail-container {
      padding-top: 150px; /* Offset the fixed navbar and services ticker */
  }
  ```

- [ ] **Step 2: Commit CSS changes**
  ```bash
  git add src/portals/user/ServiceDetail.css
  git commit -m "style: increase padding-top to avoid header overlap with ticker"
  ```

---

### Task 2: Remove Prices and Update Bottom Card in ServiceDetail.jsx

**Files:**
- Modify: [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx)

- [ ] **Step 1: Modify Pricing section to Consultation section**
  Replace the pricing card markup with a clean generic consultation banner.

  Code in `src/portals/user/ServiceDetail.jsx`:
  ```jsx
                            {/* Section 6: Pricing and Action */}
                            {service.pricing && (
                                <section className="details-section pricing-cta-section">
                                    <div className="pricing-cta-card">
                                        <div className="pricing-info-box">
                                            <span className="pricing-label">Starting Price</span>
                                            <h3 className="pricing-amount">{service.pricing.starting}</h3>
                                            {service.pricing.note && <p className="pricing-note">{service.pricing.note}</p>}
                                        </div>
                                        <div className="pricing-cta-actions">
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}
                                            >
                                                Get Started
                                            </button>
                                            <a href="tel:8928895195" className="btn btn-outline">
                                                📞 Call Nagpur Office
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            )}
  ```
  replace with:
  ```jsx
                            {/* Section 6: Pricing and Action */}
                            <section className="details-section pricing-cta-section">
                                <div className="pricing-cta-card">
                                    <div className="pricing-info-box">
                                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'white', textTransform: 'none', letterSpacing: 'normal' }}>Ready to Get Started?</h3>
                                        <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>Let our experts handle your {service.title.toLowerCase()} needs. Contact us today for a free consultation.</p>
                                    </div>
                                    <div className="pricing-cta-actions">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}
                                        >
                                            Get Started
                                        </button>
                                        <a href="tel:8928895195" className="btn btn-outline">
                                            📞 Call Nagpur Office
                                        </a>
                                    </div>
                                </div>
                            </section>
  ```

- [ ] **Step 2: Commit JSX changes**
  ```bash
  git add src/portals/user/ServiceDetail.jsx
  git commit -m "feat: remove pricing details and show consultation text instead"
  ```
