import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, X, ChevronDown, Code, Globe, Smartphone, 
  Palette, Cloud, Bot, Compass, Database, 
  Layers, ShoppingCart, Cpu
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, openConsultationModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'solutions' | null
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mobileMenuOpen) {
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu if window is resized beyond mobile breakpoint (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock background page scroll when mobile menu is open, preserving scroll position perfectly
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleScrollLock = () => {
      if (window.scrollY !== scrollY) {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }
    };

    const handleTouchMove = (e) => {
      if (!e.target.closest('.mobile-nav-scroll-content')) {
        if (e.cancelable) e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScrollLock, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScrollLock);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [mobileMenuOpen]);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleNavClick = (tabId, sectionId) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);

    // Allow the body unfreeze to complete before scrolling
    setTimeout(() => {
      if (tabId === 'home') {
        setActiveTab('home');
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        setActiveTab(tabId);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 60);
  };

  const servicesItems = [
    { title: 'Software Development', icon: Code, desc: 'Custom web apps, APIs & backend architectures' },
    { title: 'Web Development', icon: Globe, desc: 'Responsive business websites & e-commerce' },
    { title: 'Mobile App Development', icon: Smartphone, desc: 'Native & cross-platform Android/iOS applications' },
    { title: 'UI/UX Design', icon: Palette, desc: 'User interface design, design systems & wireframes' },
    { title: 'Cloud & DevOps', icon: Cloud, desc: 'Hosting, CI/CD, migration & server management' },
    { title: 'Automation & AI', icon: Bot, desc: 'Process automation & intelligent workflow tools' },
    { title: 'IT Consulting', icon: Compass, desc: 'Technical audits, architecture planning & roadmaps' }
  ];

  const solutionsItems = [
    { title: 'Business Website Solutions', icon: Globe, desc: 'High-performing websites designed to generate business inquiries' },
    { title: 'Custom Software Solutions', icon: Database, desc: 'Bespoke systems built around your company operations' },
    { title: 'Business Automation Solutions', icon: Cpu, desc: 'Streamlining manual tasks and multi-app data workflows' },
    { title: 'Digital Product Development', icon: Layers, desc: 'End-to-end design, MVP building, and technical deployment' },
    { title: 'E-commerce Solutions', icon: ShoppingCart, desc: 'Custom online storefronts, catalog tools & checkout systems' },
    { title: 'Cloud & Infrastructure Solutions', icon: Cloud, desc: 'Secure hosting, performance optimization & database setups' },
    { title: 'AI-Powered Business Solutions', icon: Bot, desc: 'Intelligent features, document processing & assistants' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`header-root ${isScrolled ? 'header-scrolled' : ''}`}
    >
      <div className="header-inner container">
        {/* Brand Logo */}
        <button 
          className="brand-logo"
          onClick={() => handleNavClick('home')}
          aria-label="OmNetaTech Home"
        >
          <div className="logo-symbol">
            <span className="logo-letter">O</span>
          </div>
          <div className="logo-text-group">
            <span className="brand-name">OmNetaTech</span>
            <span className="brand-tagline">Technology • Innovation • Digital Solutions</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-navigation" aria-label="Main Navigation">
          <button 
            className={`nav-btn ${activeTab === 'home' && !openDropdown ? 'nav-btn-active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>

          <button 
            className={`nav-btn ${activeTab === 'about' ? 'nav-btn-active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About
          </button>

          {/* Services Dropdown */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button 
              className={`nav-btn nav-btn-dropdown ${openDropdown === 'services' ? 'dropdown-active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
              aria-expanded={openDropdown === 'services'}
            >
              <span>Services</span>
              <ChevronDown size={14} className={`dropdown-arrow ${openDropdown === 'services' ? 'arrow-up' : ''}`} />
            </button>

            {openDropdown === 'services' && (
              <div className="dropdown-panel dropdown-services-panel shadow-lg">
                <div className="dropdown-header-strip">
                  <span>Core Technology Services</span>
                  <button 
                    className="dropdown-view-all"
                    onClick={() => handleNavClick('home', 'services')}
                  >
                    View All Services →
                  </button>
                </div>
                <div className="dropdown-grid-services">
                  {servicesItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        className="dropdown-item-btn"
                        onClick={() => handleNavClick('home', 'services')}
                      >
                        <div className="dropdown-item-icon">
                          <Icon size={18} />
                        </div>
                        <div className="dropdown-item-text">
                          <div className="dropdown-item-title">{item.title}</div>
                          <div className="dropdown-item-desc">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setOpenDropdown('solutions')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button 
              className={`nav-btn nav-btn-dropdown ${openDropdown === 'solutions' ? 'dropdown-active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
              aria-expanded={openDropdown === 'solutions'}
            >
              <span>Solutions</span>
              <ChevronDown size={14} className={`dropdown-arrow ${openDropdown === 'solutions' ? 'arrow-up' : ''}`} />
            </button>

            {openDropdown === 'solutions' && (
              <div className="dropdown-panel dropdown-solutions-panel shadow-lg">
                <div className="dropdown-header-strip">
                  <span>Business-Driven Solutions</span>
                  <button 
                    className="dropdown-view-all"
                    onClick={() => handleNavClick('home', 'solutions')}
                  >
                    View All Solutions →
                  </button>
                </div>
                <div className="dropdown-grid-solutions">
                  {solutionsItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        className="dropdown-item-btn"
                        onClick={() => handleNavClick('home', 'solutions')}
                      >
                        <div className="dropdown-item-icon">
                          <Icon size={18} />
                        </div>
                        <div className="dropdown-item-text">
                          <div className="dropdown-item-title">{item.title}</div>
                          <div className="dropdown-item-desc">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button 
            className="nav-btn"
            onClick={() => handleNavClick('home', 'industries')}
          >
            Industries
          </button>

          <button 
            className={`nav-btn ${activeTab === 'insights' ? 'nav-btn-active' : ''}`}
            onClick={() => handleNavClick('insights')}
          >
            Insights
          </button>

          <button 
            className={`nav-btn ${activeTab === 'careers' ? 'nav-btn-active' : ''}`}
            onClick={() => handleNavClick('careers')}
          >
            Careers
          </button>

          <button 
            className="nav-btn"
            onClick={() => handleNavClick('home', 'contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="header-action-area">
          <button 
            className="btn-primary-blue header-consult-btn"
            onClick={openConsultationModal}
          >
            Get a Free Consultation
          </button>

          <button 
            className={`mobile-hamburger-btn ${mobileMenuOpen ? 'hamburger-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal (rendered directly to body to avoid header backdrop-filter / containing block bugs) */}
      {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
        <div className="mobile-nav-portal-root">
          <div 
            className="mobile-nav-backdrop" 
            onClick={() => setMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />
          <nav 
            className="mobile-nav-panel shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="mobile-nav-scroll-content">
              {/* 1. Home */}
              <button 
                className={`mobile-nav-link ${activeTab === 'home' && !openDropdown ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <span>Home</span>
              </button>

              {/* 2. About */}
              <button 
                className={`mobile-nav-link ${activeTab === 'about' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                <span>About</span>
              </button>

              {/* 3. Services Accordion Item */}
              <div className="mobile-accordion-item">
                <div className="mobile-accordion-header">
                  <button 
                    className="mobile-nav-link mobile-accordion-link"
                    onClick={() => handleNavClick('home', 'services')}
                  >
                    <span>Services</span>
                  </button>
                  <button 
                    className={`mobile-accordion-toggle ${mobileServicesOpen ? 'toggle-active' : ''}`}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-label={mobileServicesOpen ? 'Collapse services list' : 'Expand services list'}
                    aria-expanded={mobileServicesOpen}
                  >
                    <ChevronDown size={18} className={`accordion-chevron ${mobileServicesOpen ? 'chevron-up' : ''}`} />
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="mobile-accordion-sublinks">
                    {servicesItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={i}
                          className="mobile-sublink-btn"
                          onClick={() => handleNavClick('home', 'services')}
                        >
                          <div className="mobile-sublink-icon">
                            <Icon size={16} />
                          </div>
                          <span className="mobile-sublink-title">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Solutions Accordion Item */}
              <div className="mobile-accordion-item">
                <div className="mobile-accordion-header">
                  <button 
                    className="mobile-nav-link mobile-accordion-link"
                    onClick={() => handleNavClick('home', 'solutions')}
                  >
                    <span>Solutions</span>
                  </button>
                  <button 
                    className={`mobile-accordion-toggle ${mobileSolutionsOpen ? 'toggle-active' : ''}`}
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    aria-label={mobileSolutionsOpen ? 'Collapse solutions list' : 'Expand solutions list'}
                    aria-expanded={mobileSolutionsOpen}
                  >
                    <ChevronDown size={18} className={`accordion-chevron ${mobileSolutionsOpen ? 'chevron-up' : ''}`} />
                  </button>
                </div>

                {mobileSolutionsOpen && (
                  <div className="mobile-accordion-sublinks">
                    {solutionsItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={i}
                          className="mobile-sublink-btn"
                          onClick={() => handleNavClick('home', 'solutions')}
                        >
                          <div className="mobile-sublink-icon">
                            <Icon size={16} />
                          </div>
                          <span className="mobile-sublink-title">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. Industries */}
              <button 
                className="mobile-nav-link"
                onClick={() => handleNavClick('home', 'industries')}
              >
                <span>Industries</span>
              </button>

              {/* 6. Portfolio */}
              <button 
                className="mobile-nav-link"
                onClick={() => handleNavClick('home', 'portfolio')}
              >
                <span>Portfolio</span>
              </button>

              {/* 7. Careers */}
              <button 
                className={`mobile-nav-link ${activeTab === 'careers' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('careers')}
              >
                <span>Careers</span>
              </button>

              {/* 8. Blog */}
              <button 
                className={`mobile-nav-link ${activeTab === 'insights' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('insights')}
              >
                <span>Blog</span>
              </button>

              {/* 9. Contact */}
              <button 
                className="mobile-nav-link"
                onClick={() => handleNavClick('home', 'contact')}
              >
                <span>Contact</span>
              </button>

              {/* 10 & 11. Mobile CTA and Direct Contact Section */}
              <div className="mobile-menu-footer">
                <button 
                  className="btn-primary-blue mobile-menu-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openConsultationModal();
                  }}
                >
                  Get a Free Consultation
                </button>

                <div className="mobile-menu-direct-contact">
                  <a href="tel:+918237140776" className="mobile-contact-pill">
                    <span>📞 +91 8237140776</span>
                  </a>
                  <a href="mailto:omnetatech@gmail.com" className="mobile-contact-pill">
                    <span>✉️ omnetatech@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>,
        document.body
      )}

      <style>{`
        .header-root {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
          transition: all var(--transition-normal);
          height: 76px;
          display: flex;
          align-items: center;
        }

        .header-scrolled {
          height: 68px;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(11, 31, 58, 0.06);
          border-bottom-color: #D6E2EE;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Logo */
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .logo-symbol {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(23, 105, 224, 0.25);
          flex-shrink: 0;
        }

        .logo-letter {
          color: var(--color-white);
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.25rem;
          line-height: 1;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.35rem;
          color: var(--color-primary-navy);
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .brand-tagline {
          font-size: 0.68rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Desktop Nav */
        .desktop-navigation {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-btn {
          background: none;
          border: none;
          color: var(--color-primary-navy);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          position: relative;
        }

        .nav-btn:hover {
          color: var(--color-primary-blue);
          background-color: var(--color-light-blue);
        }

        .nav-btn-active {
          color: var(--color-primary-blue);
          background-color: var(--color-light-blue);
          font-weight: 700;
        }

        .nav-dropdown-wrapper {
          position: relative;
        }

        .dropdown-arrow {
          transition: transform var(--transition-fast);
          color: var(--color-text-secondary);
        }

        .dropdown-arrow.arrow-up {
          transform: rotate(180deg);
          color: var(--color-primary-blue);
        }

        /* Dropdown panels */
        .dropdown-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
          z-index: 100;
          animation: fadeIn 0.2s ease-out;
        }

        .dropdown-services-panel {
          width: 580px;
        }

        .dropdown-solutions-panel {
          width: 620px;
        }

        .dropdown-header-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 8px 12px 8px;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 12px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dropdown-view-all {
          background: none;
          border: none;
          color: var(--color-primary-blue);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
        }

        .dropdown-view-all:hover {
          text-decoration: underline;
        }

        .dropdown-grid-services,
        .dropdown-grid-solutions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .dropdown-item-btn {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: none;
          border: 1px solid transparent;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dropdown-item-btn:hover {
          background-color: var(--color-light-blue);
          border-color: rgba(23, 105, 224, 0.15);
        }

        .dropdown-item-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          background: #F0F6FF;
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          transition: all var(--transition-fast);
        }

        .dropdown-item-btn:hover .dropdown-item-icon {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .dropdown-item-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          line-height: 1.3;
        }

        .dropdown-item-desc {
          font-size: 0.76rem;
          color: var(--color-text-secondary);
          margin-top: 3px;
          line-height: 1.4;
        }

        /* Right CTA */
        .header-action-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-consult-btn {
          padding: 10px 20px;
          font-size: 0.88rem;
        }

        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: var(--color-primary-navy);
          cursor: pointer;
          min-width: 44px;
          min-height: 44px;
          padding: 10px;
          border-radius: var(--radius-sm);
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .mobile-hamburger-btn:hover,
        .mobile-hamburger-btn:focus-visible {
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
        }

        .mobile-hamburger-btn.hamburger-active {
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
        }

        /* Mobile Portal Backdrop & Drawer */
        .mobile-nav-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 31, 58, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 998;
          touch-action: none;
          animation: fadeInBackdrop 0.2s ease-out;
        }

        .mobile-nav-panel {
          position: fixed;
          top: var(--mobile-header-height, 68px);
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: calc(100vh - var(--mobile-header-height, 68px));
          height: calc(100dvh - var(--mobile-header-height, 68px));
          max-height: calc(100dvh - var(--mobile-header-height, 68px));
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          z-index: 999;
          box-shadow: 0 12px 32px rgba(11, 31, 58, 0.12);
          border-top: 1px solid var(--color-border);
          overflow: hidden;
          animation: fadeInBackdrop 0.2s ease-out;
        }

        .mobile-nav-scroll-content {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          padding: 16px 20px calc(36px + env(safe-area-inset-bottom, 20px));
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          min-height: 44px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:focus-visible {
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
        }

        .mobile-nav-link.mobile-active {
          color: var(--color-primary-blue);
          font-weight: 700;
          background-color: rgba(23, 105, 224, 0.06);
        }

        .mobile-accordion-item {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-sm);
          margin-bottom: 2px;
        }

        .mobile-accordion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-accordion-link {
          flex: 1;
          min-height: 44px;
        }

        .mobile-accordion-toggle {
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mobile-accordion-toggle:hover,
        .mobile-accordion-toggle:focus-visible,
        .mobile-accordion-toggle.toggle-active {
          color: var(--color-primary-blue);
          background-color: var(--color-light-blue);
        }

        .accordion-chevron {
          transition: transform 0.2s ease;
        }

        .accordion-chevron.chevron-up {
          transform: rotate(180deg);
          color: var(--color-primary-blue);
        }

        .mobile-accordion-sublinks {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 4px 0 8px 12px;
          margin-left: 12px;
          border-left: 2px solid var(--color-light-blue);
          animation: fadeInBackdrop 0.15s ease-out;
        }

        .mobile-sublink-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 40px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .mobile-sublink-btn:hover,
        .mobile-sublink-btn:focus-visible {
          background-color: var(--color-light-blue);
        }

        .mobile-sublink-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(23, 105, 224, 0.08);
          color: var(--color-primary-blue);
          flex-shrink: 0;
        }

        .mobile-sublink-title {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--color-primary-navy);
          line-height: 1.3;
        }

        .mobile-menu-footer {
          margin-top: 14px;
          padding-top: 16px;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-menu-cta {
          width: 100%;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.92rem;
          font-weight: 600;
        }

        .mobile-menu-direct-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-contact-pill {
          min-height: 40px;
          display: flex;
          align-items: center;
          padding: 8px 14px;
          background-color: #f4f7fa;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          text-decoration: none;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }

        .mobile-contact-pill:hover {
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
          border-color: rgba(23, 105, 224, 0.15);
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .desktop-navigation {
            display: none !important;
          }
          .header-consult-btn {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
          .header-root,
          .header-scrolled {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: var(--mobile-header-height, 68px) !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-hamburger-btn {
            display: none !important;
          }
          .desktop-navigation {
            display: flex;
          }
          .header-consult-btn {
            display: inline-flex;
          }
        }

        @media (min-width: 769px) and (max-width: 1080px) {
          .desktop-navigation {
            gap: 4px;
          }
          .nav-btn {
            padding: 8px 10px;
            font-size: 0.84rem;
          }
          .header-consult-btn {
            padding: 9px 14px;
            font-size: 0.82rem;
          }
          .brand-name {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </header>
  );
}
