import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronDown, Code, Globe, Smartphone, 
  Palette, Cloud, Bot, Compass, Database, 
  Layers, ShoppingCart, Cpu
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, openConsultationModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'solutions' | null
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    if (tabId === 'home') {
      setActiveTab('home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-nav-drawer shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <div className="brand-name">OmNetaTech</div>
              <button 
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-nav-scroll">
              <button 
                className={`mobile-nav-link ${activeTab === 'home' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>

              <button 
                className={`mobile-nav-link ${activeTab === 'about' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About OmNetaTech
              </button>

              <div className="mobile-category-title">Services</div>
              <div className="mobile-sublinks-group">
                {servicesItems.map((item, i) => (
                  <button
                    key={i}
                    className="mobile-sublink-btn"
                    onClick={() => handleNavClick('home', 'services')}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div className="mobile-category-title">Solutions</div>
              <div className="mobile-sublinks-group">
                {solutionsItems.slice(0, 5).map((item, i) => (
                  <button
                    key={i}
                    className="mobile-sublink-btn"
                    onClick={() => handleNavClick('home', 'solutions')}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <button 
                className="mobile-nav-link"
                onClick={() => handleNavClick('home', 'industries')}
              >
                Industries
              </button>

              <button 
                className={`mobile-nav-link ${activeTab === 'insights' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('insights')}
              >
                Insights
              </button>

              <button 
                className={`mobile-nav-link ${activeTab === 'careers' ? 'mobile-active' : ''}`}
                onClick={() => handleNavClick('careers')}
              >
                Careers
              </button>

              <button 
                className="mobile-nav-link"
                onClick={() => handleNavClick('home', 'contact')}
              >
                Contact
              </button>

              <div className="mobile-drawer-cta">
                <button 
                  className="btn-primary-blue w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openConsultationModal();
                  }}
                >
                  Get a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
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
          padding: 6px;
        }

        /* Mobile Drawer */
        .mobile-nav-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 31, 58, 0.45);
          backdrop-filter: blur(4px);
          z-index: 1100;
        }

        .mobile-nav-drawer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 360px;
          background: var(--color-white);
          display: flex;
          flex-direction: column;
          z-index: 1200;
          animation: slideInRight 0.25s ease-out;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--color-primary-navy);
          cursor: pointer;
          padding: 4px;
        }

        .mobile-nav-scroll {
          padding: 20px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          text-align: left;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          padding: 10px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(227, 234, 243, 0.6);
        }

        .mobile-nav-link.mobile-active {
          color: var(--color-primary-blue);
        }

        .mobile-category-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 14px;
          margin-bottom: 4px;
        }

        .mobile-sublinks-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-left: 8px;
          border-left: 2px solid var(--color-light-blue);
          margin-bottom: 8px;
        }

        .mobile-sublink-btn {
          background: none;
          border: none;
          text-align: left;
          font-size: 0.88rem;
          color: var(--color-primary-navy);
          padding: 6px 0;
          cursor: pointer;
        }

        .mobile-drawer-cta {
          margin-top: 24px;
          padding-bottom: 24px;
        }

        .w-full {
          width: 100%;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 1080px) {
          .desktop-navigation {
            display: none;
          }
          .header-consult-btn {
            display: none;
          }
          .mobile-hamburger-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
