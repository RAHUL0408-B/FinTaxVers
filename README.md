# FinTaxVers — AI-Powered Tax & Finance Consultancy Platform

<div align="center">

![FinTaxVers Logo](./src/assets/fintaxverslogo.png)

**Enterprise-grade financial consultancy platform with AI chatbot, 20+ calculators, and full-stack deployment**

[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

🌐 **Live Site:** [https://fintaxvers.com](https://fintaxvers.com) &nbsp;|&nbsp; [https://fintxyug.web.app](https://fintxyug.web.app)  
🔧 **Backend API:** [https://fintaxvers.onrender.com/api/health](https://fintaxvers.onrender.com/api/health)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [AI Chatbot Setup](#-ai-chatbot-setup)
- [Available Scripts](#-available-scripts)

---

## 🏛️ Overview

**FinTaxVers** is a full-stack consultancy web platform for [FinTaxVers Consultancy Services](https://fintaxvers.com), Nagpur, Maharashtra — founded by **CA Yugant V. Rahele**.

The platform features an **AI-powered tax chatbot** with Retrieval-Augmented Generation (RAG), 20+ interactive financial calculators, a blog, government portal quick links, and a secure admin CRM — all deployed in a split architecture:

- 🔥 **Firebase Hosting** → Serves the React frontend (fast global CDN)
- ⚙️ **Render** → Runs the Node.js/Express backend with AI engine and WhatsApp webhooks

---

## ✨ Features

### 🤖 AI Tax Chatbot (RAG + LLM)
- Built-in knowledge base covering GST, Income Tax, Company Registration, Business Loans, and Subsidies
- Supports **Google Gemini** (free tier) and **OpenAI** as AI providers
- Automatic **intent detection** (GST filing, ITR, MSME, MUDRA, etc.)
- **Fallback responses** using TF-IDF keyword matching when no API key is configured
- Lead capture and **human handoff** to WhatsApp
- Conversation history with localStorage persistence

### 🧮 20+ Financial Calculators
| Category | Calculators |
| :--- | :--- |
| **Tax** | Income Tax, HRA Exemption, NPS Benefits |
| **Investment** | SIP, Step-Up SIP, SWP, Mutual Funds, CAGR |
| **Loans** | EMI, Home Affordability, EMI+SIP Hybrid, Cost of Delay |
| **Retirement** | Retirement Corpus, Goal Planner, Emergency Fund, Net Worth, Education |
| **Wealth** | Wealth Target, Purchasing Power |

### 🏢 Client Portal
- Dynamic hero slider with flagship service highlights
- Detailed service pages for 10+ services (GST, ITR, ROC, Loans, etc.)
- Testimonials, trust metrics, and professional certifications
- WhatsApp CTA and multi-channel inquiry touchpoints

### 📚 Blog & Knowledge Hub
- Articles on GST compliance, Union Budget, startup incorporation, tax savings
- Category filtering, estimated reading time, SEO-optimized with `react-helmet-async`
- JSON-LD structured data for Google rich results

### 🔗 Government Portal Directory
Quick-access links to all major Indian regulatory portals:
- Income Tax e-Filing, TRACES, GST Portal
- MCA21, EPFO, ESIC, Trademark Registry, RBI, SEBI, MSME/Udyam

### 🛡️ Admin CRM Portal
- Firebase Authentication–protected admin access
- Real-time lead and inquiry dashboard with Firebase Firestore
- EmailJS automated notifications on new inquiries
- Conversation management and handoff tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 + Vite 7 |
| **Routing** | React Router DOM v7 |
| **Styling** | Vanilla CSS3 (custom design system, glassmorphism, animations) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Node.js + Express |
| **AI / LLM** | Google Gemini API / OpenAI API |
| **RAG Engine** | In-memory vector store + TF-IDF fallback |
| **Database** | Firebase Firestore |
| **Hosting (Frontend)** | Firebase Hosting |
| **Hosting (Backend)** | Render (Web Service) |
| **Email** | EmailJS |
| **WhatsApp** | Meta WhatsApp Business Cloud API |
| **SEO** | react-helmet-async + JSON-LD |

---

## 📂 Project Structure

```
FinTaxVers/
├── public/                         # Static public assets
│   ├── favicon.png                 # Browser favicon
│   ├── robots.txt                  # SEO crawl rules
│   ├── sitemap.xml                 # SEO sitemap
│   ├── images/                     # Static images
│   └── service-images/             # Service page images
│
├── server/                         # Node.js/Express backend (deployed on Render)
│   ├── index.js                    # Server entry point (also serves dist/ in production)
│   ├── config/
│   │   └── env.js                  # Environment variable loader
│   ├── routes/
│   │   ├── chatRoutes.js           # POST /api/chat, handoff routes
│   │   ├── whatsappRoutes.js       # WhatsApp webhook
│   │   └── adminRoutes.js          # Admin API endpoints
│   ├── services/
│   │   ├── aiChatService.js        # RAG + LLM pipeline
│   │   ├── embeddingService.js     # Gemini/OpenAI embedding generator
│   │   ├── vectorStore.js          # In-memory vector index
│   │   └── conversationStore.js    # Conversation & lead management
│   └── data/
│       └── knowledgeBase.js        # Tax & compliance knowledge base (14 entries)
│
├── src/                            # React frontend (deployed on Firebase Hosting)
│   ├── assets/                     # Images, logos, profile photos
│   ├── components/
│   │   ├── calculators/            # 20+ calculator components
│   │   ├── chat/                   # FintaxversAIChatWidget.jsx + ChatWidget.css
│   │   └── common/                 # Navbar, Footer, HeroSlider, SEOHead, FAQSection
│   ├── context/
│   │   └── AppContext.jsx          # Global state (auth, leads, notifications)
│   ├── data/
│   │   ├── servicesData.js         # 10 detailed service profiles
│   │   └── blogData.js             # Blog articles
│   ├── lib/seo/
│   │   └── schemaGenerators.js     # JSON-LD schema generators
│   ├── pages/
│   │   └── Links.jsx               # Link-in-bio page
│   ├── portals/
│   │   ├── admin/                  # AdminPortal.jsx, AdminLogin.jsx, Admin.css
│   │   └── user/                   # UserPortal, Blog, BlogPost, Calculators, ServiceDetail
│   ├── App.jsx                     # Root app + routing
│   ├── firebase.js                 # Firebase SDK init
│   ├── index.css                   # Global styles & design tokens
│   └── main.jsx                    # React entry point
│
├── .env.example                    # Template for environment variables
├── .gitignore                      # Git exclusions
├── firebase.json                   # Firebase Hosting config
├── .firebaserc                     # Firebase project reference
├── index.html                      # Vite HTML entry
├── package.json                    # Dependencies & npm scripts
└── vite.config.js                  # Vite config (with /api proxy for local dev)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (v24 recommended)
- **npm** v9+
- A **Firebase** project with Firestore and Hosting enabled
- *(Optional)* A **Google Gemini** API key for the AI chatbot

### 1. Clone the Repository

```bash
git clone https://github.com/RAHUL0408-B/FinTaxVers.git
cd FinTaxVers
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values (see [Environment Variables](#-environment-variables) section).

### 4. Run Locally (Frontend + Backend Together)

```bash
npm run dev:all
```

This starts:
- **Vite** frontend on `http://localhost:5173`
- **Express** backend on `http://localhost:5000`

Vite automatically proxies `/api/*` requests to the backend.

---

## 🔑 Environment Variables

Copy `.env.example` → `.env.local` and fill in these values:

```ini
# Firebase (required for admin CRM and auth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# EmailJS (optional — for contact form emails)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# AI Chatbot — Google Gemini (free: 1,500 requests/day)
# Get free key at: https://aistudio.google.com/
LLM_PROVIDER=gemini
LLM_API_KEY=AIzaSy...
LLM_MODEL=gemini-2.0-flash
EMBEDDING_API_KEY=AIzaSy...
EMBEDDING_MODEL=text-embedding-004

# Server
PORT=5000
NODE_ENV=development
ADMIN_API_TOKEN=your_secure_random_token

# Site URL
VITE_SITE_URL=https://fintaxvers.com
```

> **Note:** `.env.local` is git-ignored. Never commit real API keys.

---

## 🚢 Deployment

This project uses a **split deployment** architecture:

```
Firebase Hosting (Frontend)  ←→  Render (Backend API)
  https://fintxyug.web.app         https://fintaxvers.onrender.com
```

### Deploy Frontend → Firebase Hosting

```bash
npm run build
npx firebase deploy --only hosting
```

### Deploy Backend → Render

1. Connect your GitHub repo to [Render](https://render.com/)
2. **Build Command:** `npm install; npm run build`
3. **Start Command:** `node server/index.js`
4. Add your environment variables in Render → **Environment** tab

### One-command full deploy

```bash
# 1. Build
npm run build

# 2. Deploy frontend to Firebase
npx firebase deploy --only hosting

# 3. Push backend changes to GitHub (Render auto-deploys)
git add -A && git commit -m "deploy: update" && git push origin main
```

---

## 🤖 AI Chatbot Setup

The AI chatbot works **without any API key** using a built-in tax knowledge engine. To enable full AI responses:

### Free Option: Google Gemini (Recommended)
1. Go to [Google AI Studio](https://aistudio.google.com/) → **Get API key**
2. Create a free key (1,500 requests/day, no credit card needed)
3. Add to your Render environment:

```ini
LLM_PROVIDER=gemini
LLM_API_KEY=AIzaSy...
LLM_MODEL=gemini-2.0-flash
EMBEDDING_API_KEY=AIzaSy...
EMBEDDING_MODEL=text-embedding-004
```

### Paid Option: OpenAI

```ini
LLM_PROVIDER=openai
LLM_API_KEY=sk-...
LLM_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-small
```

### How the RAG Pipeline Works

```
User Message
    │
    ▼
Intent Detection (GST / ITR / Loan / etc.)
    │
    ▼
Knowledge Search (Vector similarity + TF-IDF fallback)
    │
    ▼
Context Assembly (Top-K relevant chunks)
    │
    ▼
LLM Generation (Gemini / OpenAI / Domain fallback)
    │
    ▼
Response + Lead Capture + WhatsApp Handoff Option
```

---

## 📜 Available Scripts

```bash
npm run dev          # Start Vite frontend only (port 5173)
npm run dev:server   # Start Express backend only (port 5000)
npm run dev:all      # Start both frontend and backend together
npm run build        # Build React app for production → dist/
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint on all source files
npm run server       # Start backend in production mode
```

---

## 📞 Contact & Support

**FinTaxVers Consultancy Services**  
📍 Nagpur, Maharashtra, India  
👤 Founder: Yugant V. Rahele  
📱 WhatsApp / Call: [+91-8928895195](https://wa.me/918928895195)  
📧 Email: [contact@fintaxvers.com](mailto:contact@fintaxvers.com)  
🌐 Website: [https://fintaxvers.com](https://fintaxvers.com)

---

<div align="center">

Made with ❤️ for **FinTaxVers** | © 2025 All rights reserved

</div>
