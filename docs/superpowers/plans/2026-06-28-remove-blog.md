# Remove Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove public links and navigation to the blog section on `fintaxvers.com` and set up automatic routing redirects from `/blog` and `/blog/:slug` to `/`.

**Architecture:** We will disable the public route paths using React Router's `<Navigate to="/" replace />` component and clean up all UI navigation points that target the blog. The blog files (`Blog.jsx`, `BlogPost.jsx`, `blogData.js`) will remain in the codebase.

**Tech Stack:** React, React Router Dom

---

### Task 1: Update Routing in App.jsx

**Files:**
- Modify: [App.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/App.jsx)

- [ ] **Step 1: Replace Blog routes with Redirects**
  Change the `/blog` and `/blog/:slug` route definitions to render `<Navigate to="/" replace />`.
  
  Code to replace in `src/App.jsx`:
  ```jsx
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
  ```
  with:
  ```jsx
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
  ```

- [ ] **Step 2: Commit routing changes**
  ```bash
  git add src/App.jsx
  git commit -m "feat: redirect blog routes to home"
  ```

---

### Task 2: Remove Blog Link from Navbar

**Files:**
- Modify: [Navbar.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/components/common/Navbar.jsx)

- [ ] **Step 1: Remove Blog navigation list item**
  Remove the following line from the navbar navigation menu:
  ```jsx
                          <li><a href="/blog" onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate('/blog'); }}>Blog</a></li>
  ```

- [ ] **Step 2: Commit navbar changes**
  ```bash
  git add src/components/common/Navbar.jsx
  git commit -m "style: remove blog link from navbar"
  ```

---

### Task 3: Remove Blog Links from Footers

**Files:**
- Modify: [UserPortal.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/UserPortal.jsx)
- Modify: [Links.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/pages/Links.jsx)

- [ ] **Step 1: Remove Blog link from UserPortal footer**
  Remove the following line from the quick links list in the footer of `src/portals/user/UserPortal.jsx`:
  ```jsx
                                  <li><a href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Financial Insights Blog</a></li>
  ```

- [ ] **Step 2: Remove Blog link from Links footer**
  Remove the following line from the quick links list in the footer of `src/pages/Links.jsx`:
  ```jsx
                            <li><a href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Financial Insights Blog</a></li>
  ```

- [ ] **Step 3: Commit footer changes**
  ```bash
  git add src/portals/user/UserPortal.jsx src/pages/Links.jsx
  git commit -m "style: remove blog links from footers"
  ```

---

### Task 4: Remove Blog Links from Calculators and ServiceDetail Pages

**Files:**
- Modify: [Calculators.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/Calculators.jsx)
- Modify: [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx)

- [ ] **Step 1: Remove Blog button from Calculators page**
  Remove the following button line in `src/portals/user/Calculators.jsx`:
  ```jsx
                                  <a href="/blog" style={{ background: '#7C3AED', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Read Our Blog</a>
  ```

- [ ] **Step 2: Remove Blog button from ServiceDetail page**
  Remove the following button line in `src/portals/user/ServiceDetail.jsx`:
  ```jsx
                                      <button onClick={() => navigate('/blog')} style={{ padding: '8px 16px', border: '1px solid #7C3AED', background: '#F5F3FF', cursor: 'pointer', color: '#7C3AED', fontWeight: 600, fontSize: '0.85rem' }}>📖 Read Our Blog</button>
  ```

- [ ] **Step 3: Commit page button changes**
  ```bash
  git add src/portals/user/Calculators.jsx src/portals/user/ServiceDetail.jsx
  git commit -m "style: remove blog buttons from calculators and service detail pages"
  ```
