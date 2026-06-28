import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import UserPortal from './portals/user/UserPortal'
import Calculators from './portals/user/Calculators'
import ServiceDetail from './portals/user/ServiceDetail'
import AdminPortal from './portals/admin/AdminPortal'
import AdminLogin from './portals/admin/AdminLogin'
// import Blog from './portals/user/Blog'
// import BlogPost from './portals/user/BlogPost'
import Links from './pages/Links'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('fintxyug_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserPortal />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
          <Route path="/links" element={<Links />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminPortal /></ProtectedRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
