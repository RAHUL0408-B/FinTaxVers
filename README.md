# 🏛️ FinTaxVers

[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38.0-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![EmailJS](https://img.shields.io/badge/EmailJS-Integrated-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](https://www.emailjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**FinTaxYug** is an enterprise-grade, modern web platform designed for comprehensive Financial, Taxation, Auditing, Corporate Compliance, and Business Consultancy services. Built with high performance, interactive financial calculators, secure lead management, and dynamic service portals.

---

## 🚀 Key Highlights & Features

### 🏢 1. Client Portal & Showcase
* **Dynamic Hero Slider:** Visual banners highlighting flagship services like Digital Signature Certificates (DSC), Home/Car Loans, Corporate Compliance, and Tax Advisory.
* **Service Directory:** Detailed showcases covering Direct & Indirect Taxation, GST, Company Registration, Trademark, Audit, and Advisory.
* **Why Choose Us & Testimonials:** Trust metrics, client feedback, and professional certifications.
* **Instant Connect & WhatsApp CTA:** Multi-channel inquiry touchpoints for rapid client conversion.

### 🧮 2. 20+ Interactive Financial Calculators
Comprehensive suite of calculation engines equipped with real-time charting, breakdown analytics, and input validation:
* **Taxation & Deductions:** Income Tax Calculator, HRA Exemption Calculator, NPS Benefit Estimator.
* **Wealth & Investment:** SIP, Step-Up SIP, SWP, Mutual Funds, CAGR, Purchasing Power, Wealth Target.
* **Loans & Debt Management:** EMI Calculator, Home Loan Affordability, EMI + SIP Hybrid Calculator, Cost of Delay.
* **Retirement & Safety:** Retirement Corpus Planner, Goal Planner, Emergency Fund, Net Worth Analyzer, Child Education Planner.

### 📚 3. Financial Blog & Knowledge Hub
* **In-Depth Articles & Guides:** Curated articles on Union Budget updates, GST compliance tips, startup incorporation roadmaps, and tax savings strategies.
* **SEO & Meta Optimization:** Powered by `react-helmet-async` for optimized search engine discovery, social graph cards, and canonical tags.
* **Interactive Reading Experience:** Related posts, category filtering, estimated reading times, and quick share functionality.

### 🔗 4. Regulatory & Government Portals Quick Links Hub
* Consolidated, categorized directory with one-click direct access to official government and regulatory authorities:
  * **Income Tax Department** (e-Filing portal, TRACES)
  * **Goods and Services Tax** (GST Portal)
  * **Ministry of Corporate Affairs** (MCA21 V3)
  * **EPFO, ESIC, Trademark Registry, RBI, SEBI, and MSME/Udyam**

### 🛡️ 5. Admin Portal & CRM Dashboard
* **Protected Access:** Route guarding with secure authentication.
* **Lead & Inquiry Pipeline:** Real-time synchronization of inquiries received from web forms into Firebase Firestore.
* **Instant Email Notifications:** Seamless integration with EmailJS to dispatch automated inquiry alerts directly to administrators.

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling & Design** | Vanilla CSS3 (Custom Design System, Responsive Glassmorphism & Animations) |
| **Animations & Motion** | [Framer Motion](https://www.framer.com/motion/) / Motion |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & Cloud** | [Firebase Firestore](https://firebase.google.com/docs/firestore) & Firebase App Hosting |
| **Email Automation** | [EmailJS](https://www.emailjs.com/) |
| **SEO Management** | [react-helmet-async](https://github.com/staylor/react-helmet-async) |

---

## 📂 Project Structure

```text
FinTaxYug/
├── public/                     # Static public assets (icons, logos, manifests)
├── src/
│   ├── assets/                 # Images, banners, and vector assets
│   ├── components/             # Reusable UI components
│   │   ├── calculators/        # 20+ Financial Calculator modules
│   │   └── common/             # HeroSlider, Navbar, Footer, Modals, Breadcrumbs
│   ├── context/                # Global Application Context (AppContext.jsx)
│   ├── data/                   # Data stores (blogData.js, servicesData.js)
│   ├── pages/                  # Static standalone pages (Links.jsx, etc.)
│   ├── portals/                # Major portal views
│   │   ├── admin/              # AdminPortal.jsx, AdminLogin.jsx
│   │   └── user/               # UserPortal.jsx, Calculators.jsx, ServiceDetail.jsx, Blog.jsx, BlogPost.jsx
│   ├── App.jsx                 # App routing & protected route configuration
│   ├── firebase.js             # Firebase initialization & configuration
│   ├── index.css               # Global theme tokens, typography, and utility classes
│   └── main.jsx                # Application root entry point
├── .env.local                  # Local environment configuration (Ignored in Git)
├── firebase.json               # Firebase deployment configuration
├── package.json                # Project dependencies and npm scripts
├── vercel.json                 # Vercel SPA routing redirects
└── vite.config.js              # Vite bundler configuration
```

---

