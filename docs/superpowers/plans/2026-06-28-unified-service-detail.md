# Unified Service Detail Page Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the service details page to show all info sequentially in a structured content box on the right, with reduced font sizes, a left sidebar for directory menu navigation, quick contact info, and custom-generated service images.

**Architecture:** We will update `servicesData.js` image paths to use `/service-images/<service-id>.jpg`. We will rewrite the page layout of `ServiceDetail.jsx` from a tabbed/hero structure to a grid layout. We will generate the 10 service images and save them in `public/service-images/`. We will update `ServiceDetail.css` for smaller global font sizes, compact spacing, and a responsive grid layout.

**Tech Stack:** React, CSS, Image Generation

---

### Task 1: Update servicesData.js Image Paths

**Files:**
- Modify: [servicesData.js](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/data/servicesData.js)

- [ ] **Step 1: Align image paths to IDs**
  Update the `image` property of each service inside `servicesData.js` to match `/service-images/<service-id>.jpg` (or `.png` depending on format, let's use `.jpg` or `.png`. E.g., `/service-images/cma-data-project-financing.jpg`).
  Let's verify the keys and update their `image` path.

- [ ] **Step 2: Commit servicesData changes**
  ```bash
  git add src/data/servicesData.js
  git commit -m "chore: align servicesData image paths with service IDs"
  ```

---

### Task 2: Create Directory and Generate Service Images

**Files:**
- Create: `public/service-images/` (directory)
- Create: generated image files for each of the 10 services.

- [ ] **Step 1: Generate image for cma-data-project-financing**
  Save to `public/service-images/cma-data-project-financing.jpg`.

- [ ] **Step 2: Generate image for business-loan-assistance**
  Save to `public/service-images/business-loan-assistance.jpg`.

- [ ] **Step 3: Generate image for govt-subsidy-consulting**
  Save to `public/service-images/govt-subsidy-consulting.jpg`.

- [ ] **Step 4: Generate image for company-llp-formation**
  Save to `public/service-images/company-llp-formation.jpg`.

- [ ] **Step 5: Generate image for shop-act-msme**
  Save to `public/service-images/shop-act-msme.jpg`.

- [ ] **Step 6: Generate image for roc-annual-compliance**
  Save to `public/service-images/roc-annual-compliance.jpg`.

- [ ] **Step 7: Generate image for gst-returns-solutions**
  Save to `public/service-images/gst-returns-solutions.jpg`.

- [ ] **Step 8: Generate image for income-tax-planning**
  Save to `public/service-images/income-tax-planning.jpg`.

- [ ] **Step 9: Generate image for financial-reporting**
  Save to `public/service-images/financial-reporting.jpg`.

- [ ] **Step 10: Generate image for internal-audit**
  Save to `public/service-images/internal-audit.jpg`.

- [ ] **Step 11: Commit images**
  ```bash
  git add public/service-images/
  git commit -m "asset: add generated service illustration images"
  ```

---

### Task 3: Restructure ServiceDetail.jsx Markup

**Files:**
- Modify: [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx)

- [ ] **Step 1: Replace layout with Grid Split & Tab-less sequential content**
  Clean up the tabs section and replace the main layout with a grid wrapper containing:
  - Left column: breadcrumbs, service image, directory menu (linked list of all services from `servicesData`), and quick contact/trust card.
  - Right column: a unified detail box showing category, title, description, overview/detailed html, benefits, features grid, process timeline, FAQs, and CTA consultation footer.

- [ ] **Step 2: Commit markup changes**
  ```bash
  git add src/portals/user/ServiceDetail.jsx
  git commit -m "feat: rewrite ServiceDetail layout to tab-less grid split"
  ```

---

### Task 4: Rewrite ServiceDetail.css Styles

**Files:**
- Modify: [ServiceDetail.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.css)

- [ ] **Step 1: Update CSS styles for compact fonts, margins, and grid layout**
  Replace old tabbed and centering styling rules. Add grid layouts, services directory highlights, compact spacing, smaller fonts, and responsive media queries.

- [ ] **Step 2: Commit styling changes**
  ```bash
  git add src/portals/user/ServiceDetail.css
  git commit -m "style: reduce font sizes and style unified service grid layout"
  ```
