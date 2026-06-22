import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import PortfolioSection from './components/PortfolioSection';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookConsultationModal from './components/BookConsultationModal';

// Subpages
import AboutPage from './components/AboutPage';
import CareersPage from './components/CareersPage';
import InsightsPage from './components/InsightsPage';

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'about', 'careers', 'insights'
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultationModal = () => setIsConsultationOpen(true);
  const closeConsultationModal = () => setIsConsultationOpen(false);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Sticky Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
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
            <SearchSection />
            <ServicesSection />
            <StatsSection />
            <IndustriesSection />
            <PortfolioSection />
            <WhyChoose />
            <Testimonials />
            <ContactSection />
          </>
        ) : activeTab === 'about' ? (
          <AboutPage />
        ) : activeTab === 'careers' ? (
          <CareersPage />
        ) : activeTab === 'insights' ? (
          <InsightsPage />
        ) : null}
      </main>

      {/* Dynamic Global Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
      />

      {/* Booking Estimator Modal Overlay */}
      <BookConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={closeConsultationModal}
      />
    </>
  );
}

export default App;
