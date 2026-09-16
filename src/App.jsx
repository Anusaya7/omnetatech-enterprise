import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import SolutionsSection from './components/SolutionsSection';
import ProcessSection from './components/ProcessSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import WhyChoose from './components/WhyChoose';
import PortfolioSection from './components/PortfolioSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookConsultationModal from './components/BookConsultationModal';

// Subpages
import AboutPage from './components/AboutPage';
import CareersPage from './components/CareersPage';
import InsightsPage from './components/InsightsPage';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminEnquiries from './admin/AdminEnquiries';
import AdminNotifications from './admin/AdminNotifications';
import AdminWebsite from './admin/AdminWebsite';
import AdminServices from './admin/AdminServices';
import AdminSolutions from './admin/AdminSolutions';
import AdminIndustries from './admin/AdminIndustries';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminInsights from './admin/AdminInsights';
import AdminCareers from './admin/AdminCareers';
import AdminSettings from './admin/AdminSettings';

import { authStorage, api } from './services/api';

function App() {
  // Navigation & Location state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeTab, setActiveTab] = useState(() => {
    const p = window.location.pathname;
    if (p === '/about') return 'about';
    if (p === '/careers') return 'careers';
    if (p === '/insights') return 'insights';
    return 'home';
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(authStorage.getToken()));

  // Determine current route mode
  const isAdminArea = currentPath.startsWith('/admin');

  // Resolve admin subroute from path
  const getAdminSubroute = (path) => {
    if (path === '/admin/login') return 'login';
    if (path === '/admin/contact-enquiries' || path === '/admin/enquiries') return 'enquiries';
    if (path === '/admin/notifications') return 'notifications';
    if (path === '/admin/website') return 'website';
    if (path === '/admin/services') return 'services';
    if (path === '/admin/solutions') return 'solutions';
    if (path === '/admin/industries') return 'industries';
    if (path === '/admin/portfolio') return 'portfolio';
    if (path === '/admin/insights') return 'insights';
    if (path === '/admin/careers') return 'careers';
    if (path === '/admin/settings') return 'settings';
    return 'dashboard'; // default /admin or /admin/dashboard
  };

  const [adminRoute, setAdminRoute] = useState(getAdminSubroute(currentPath));

  // Sync state with browser location
  const handleLocationChange = useCallback(() => {
    const path = window.location.pathname;
    setCurrentPath(path);

    if (path.startsWith('/admin')) {
      const sub = getAdminSubroute(path);
      setAdminRoute(sub);
      setIsAuthenticated(Boolean(authStorage.getToken()));
    } else {
      if (path === '/about') setActiveTab('about');
      else if (path === '/careers') setActiveTab('careers');
      else if (path === '/insights') setActiveTab('insights');
      else setActiveTab('home');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [handleLocationChange]);

  // Handle direct navigation to home page section routes on initial load
  useEffect(() => {
    const path = window.location.pathname;
    const sectionMap = {
      '/services': 'services',
      '/solutions': 'solutions',
      '/industries': 'industries',
      '/portfolio': 'portfolio',
      '/contact': 'contact',
      '/about-section': 'about'
    };
    if (sectionMap[path]) {
      setTimeout(() => {
        const el = document.getElementById(sectionMap[path]);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, []);

  // Navigate helper
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    handleLocationChange();
  };

  // Admin navigation
  const handleAdminNavigate = (routeId, path) => {
    if (routeId === 'public') {
      navigateTo('/');
      return;
    }
    setAdminRoute(routeId);
    navigateTo(path || `/admin/${routeId === 'dashboard' ? 'dashboard' : routeId}`);
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigateTo('/admin/dashboard');
  };

  const handleLogout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    navigateTo('/admin/login');
  };

  // Consultation Modal Handlers
  const openConsultationModal = () => setIsConsultationOpen(true);
  const closeConsultationModal = () => setIsConsultationOpen(false);

  const scrollToServices = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      navigateTo('/');
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('services');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePublicNavigate = (tabId, sectionId) => {
    setActiveTab(tabId);
    const pathMap = { home: '/', about: '/about', careers: '/careers', insights: '/insights' };
    window.history.pushState({}, '', pathMap[tabId] || '/');
    setCurrentPath(window.location.pathname);

    if (tabId === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // ADMIN PANEL ROUTING
  // ----------------------------------------------------
  if (isAdminArea) {
    // If not authenticated or on /admin/login
    if (!isAuthenticated || adminRoute === 'login') {
      return (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={() => navigateTo('/')}
        />
      );
    }

    // Authenticated Admin Area
    return (
      <AdminLayout 
        activeRoute={adminRoute} 
        onNavigate={handleAdminNavigate}
        onLogout={handleLogout}
      >
        {({ showToast, refreshBadges }) => {
          switch (adminRoute) {
            case 'dashboard':
              return (
                <AdminDashboard 
                  onNavigate={handleAdminNavigate} 
                  showToast={showToast} 
                  refreshBadges={refreshBadges} 
                />
              );
            case 'enquiries':
              return (
                <AdminEnquiries 
                  showToast={showToast} 
                  refreshBadges={refreshBadges} 
                />
              );
            case 'notifications':
              return (
                <AdminNotifications 
                  onNavigate={handleAdminNavigate} 
                  showToast={showToast} 
                  refreshBadges={refreshBadges} 
                />
              );
            case 'website':
              return <AdminWebsite showToast={showToast} />;
            case 'services':
              return <AdminServices showToast={showToast} />;
            case 'solutions':
              return <AdminSolutions showToast={showToast} />;
            case 'industries':
              return <AdminIndustries showToast={showToast} />;
            case 'portfolio':
              return <AdminPortfolio showToast={showToast} />;
            case 'insights':
              return <AdminInsights showToast={showToast} />;
            case 'careers':
              return <AdminCareers showToast={showToast} />;
            case 'settings':
              return <AdminSettings showToast={showToast} />;
            default:
              return (
                <AdminDashboard 
                  onNavigate={handleAdminNavigate} 
                  showToast={showToast} 
                  refreshBadges={refreshBadges} 
                />
              );
          }
        }}
      </AdminLayout>
    );
  }

  // ----------------------------------------------------
  // PUBLIC WEBSITE
  // ----------------------------------------------------
  return (
    <div className="app-layout">
      {/* Global Sticky Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handlePublicNavigate} 
        openConsultationModal={openConsultationModal}
      />

      {/* Main Routed Content */}
      <main className="main-content-view">
        {activeTab === 'home' ? (
          <>
            {/* Landing Page Content */}
            <Hero 
              openConsultationModal={openConsultationModal}
              scrollToServices={scrollToServices}
            />
            
            <SearchSection 
              onNavigate={handlePublicNavigate}
              openConsultationModal={openConsultationModal}
            />

            <AboutSection 
              onReadMore={() => handlePublicNavigate('about')}
              openConsultationModal={openConsultationModal}
            />

            <ServicesSection 
              onSelectService={openConsultationModal}
            />

            <SolutionsSection 
              openConsultationModal={openConsultationModal}
            />

            <ProcessSection />

            <StatsSection />

            <IndustriesSection 
              openConsultationModal={openConsultationModal}
            />

            <WhyChoose />

            <PortfolioSection 
              openConsultationModal={openConsultationModal}
            />

            <Testimonials />

            <ContactSection />
          </>
        ) : activeTab === 'about' ? (
          <AboutPage openConsultationModal={openConsultationModal} />
        ) : activeTab === 'careers' ? (
          <CareersPage />
        ) : activeTab === 'insights' ? (
          <InsightsPage openConsultationModal={openConsultationModal} />
        ) : null}
      </main>

      {/* Dynamic Global Footer */}
      <Footer 
        setActiveTab={handlePublicNavigate} 
      />

      {/* Consultation Modal Overlay */}
      <BookConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={closeConsultationModal}
      />
    </div>
  );
}

export default App;
