# Design Specification - Unified Service Details Page

This document specifies the design for transitioning the service details page to a unified, tab-less layout with a left sidebar (incorporating list of all services, contact details, and a service-specific image) and a right-side content box displaying all details sequentially with reduced font sizes.

## Proposed Changes

### UI Components (ServiceDetail.jsx)

- **Layout Structure:**
  - Introduce a container with a two-column grid: `grid-template-columns: 280px 1fr; gap: 30px;` on desktop.
  - **Left Column (Sidebar):**
    - Service Image: A 240px wide service-specific image loaded from `/service-images/<service-id>.jpg`.
    - Services Directory: List of all 10 services with links. Active service highlighted.
    - Quick Contact Info: Fast call, email, WhatsApp, and "Why Choose Us" points.
  - **Right Column (Details Box):**
    - Wrap all information in a single structured `.service-info-card`.
    - Compact title header (Title, Category, Description).
    - Tab-less sequential sections:
      1. Overview & Detailed Description
      2. Benefits & Target Audience (Ideal For)
      3. Key Features
      4. Our Process (timeline)
      5. Frequently Asked Questions (FAQ)
      6. Consultation CTA banner.

### Styling Updates (ServiceDetail.css)

- Reduce vertical padding of the layout.
- Set global smaller font-sizes:
  - `.service-title`: `2rem` (desktop)
  - headings: `1.25rem`
  - paragraphs & lists: `0.9rem`
- Add responsive grid styles for screen widths under 768px (stack sidebar on top or bottom, hide services menu on mobile if it's too long, or collapse it).

### Service Images Generation

- Generate 10 images using `generate_image` tool matching each service.
- Save to `public/service-images/` folder:
  - `cma-data-project-financing.jpg`
  - `business-loan-assistance.jpg`
  - `govt-subsidy-consulting.jpg`
  - `company-llp-formation.jpg`
  - `shop-act-msme.jpg`
  - `roc-annual-compliance.jpg`
  - `gst-returns-solutions.jpg`
  - `income-tax-planning.jpg`
  - `financial-reporting.jpg`
  - `internal-audit.jpg`
- Update `servicesData.js` image paths to match these IDs.

## Verification Plan

- Build the project using `npm run build`.
- Manually check the layout on desktop and mobile viewports.
