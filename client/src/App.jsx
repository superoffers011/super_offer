import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MyVaultPage from './pages/MyVaultPage';
import UserProfilePage from './pages/UserProfilePage';
import LuckyDrawPage from './pages/LuckyDrawPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsDisclaimerPage from './pages/TermsDisclaimerPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import { FloatingSparkles } from './components/DiyaSparkles';
import FestiveSoundToggle from './components/FestiveSoundToggle';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col bg-festive-dark text-slate-100">
          {/* Subtle floating Diwali gold particles */}
          <FloatingSparkles />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main App Content View */}
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vault" element={<MyVaultPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/lucky-draw" element={<LuckyDrawPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              
              {/* Mandatory Payment & Merchant Compliance Pages */}
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/return-policy" element={<RefundPolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/disclaimer" element={<TermsDisclaimerPage />} />
              <Route path="/terms" element={<TermsDisclaimerPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Festive Sound Engine Toggle Button */}
          <FestiveSoundToggle />

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
