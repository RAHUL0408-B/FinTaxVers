import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

const UserPortal = lazy(() => import('./portals/user/UserPortal'))
const Calculators = lazy(() => import('./portals/user/Calculators'))
const ServiceDetail = lazy(() => import('./portals/user/ServiceDetail'))
const AdminPortal = lazy(() => import('./portals/admin/AdminPortal'))
const AdminLogin = lazy(() => import('./portals/admin/AdminLogin'))
const Blog = lazy(() => import('./portals/user/Blog'))
const BlogPost = lazy(() => import('./portals/user/BlogPost'))
const Links = lazy(() => import('./pages/Links'))

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('fintxyug_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#0B1F3A', background: '#F8FAFC' }}>Loading FinTaxVers…</div>}>
          <Routes>
            <Route path="/" element={<UserPortal />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/links" element={<Links />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminPortal /></ProtectedRoute>} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  )
}

export default App
