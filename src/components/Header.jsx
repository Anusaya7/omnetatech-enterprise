import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Award, Shield, Server, Cpu, Activity, BarChart3, Globe } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, openConsultationModal }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // 'services' or 'solutions' or null

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tabId, sectionId) => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    
    if (tabId === 'home') {
      setActiveTab('home');
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const servicesItems = [
    { title: 'Artificial Intelligence', icon: Cpu, desc: 'AI Agents, Generative LLM & RAG Systems', section: 'services' },
    { title: 'Cloud Infrastructure', icon: Server, desc: 'AWS, Azure, GCP & Modern DevOps', section: 'services' },
    { title: 'Cyber Security', icon: Shield, desc: 'Threat Detection, Compliance & Audits', section: 'services' },
    { title: 'Enterprise Automation', icon: Activity, desc: 'ERP, CRM & Workflow Optimization', section: 'services' }
  ];

  const solutionsItems = [
    { title: 'Finance & Banking', icon: BarChart3, desc: 'Secure payment pipelines & financial AI analytics' },
    { title: 'Digital Health', icon: Activity, desc: 'HIPAA-compliant software & patient diagnostics' },
    { title: 'Smart Logistics', icon: Globe, desc: 'Supply chain tracking & operations automation' },
    { title: 'Modern Manufacturing', icon: Award, desc: 'Industry 4.0 IoT & predictive maintenance' }
  ];

  return (
    <header className={`header-container ${isSticky ? 'sticky' : ''}`}>
      <div className="header-inner container">
        {/* Logo */}
        <div className="logo-section" onClick={() => handleNavClick('home')}>
          <span className="logo-glow"></span>
          <span className="logo-text">OmNetaTech</span>
          <span className="logo-subtext">Digital Futures</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
          </div>

          <div className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
          </div>

          {/* Services Dropdown */}
          <div 
            className="nav-item has-dropdown"
            onMouseEnter={() => setDropdownOpen('services')}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="nav-link flex-center">
              Services <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className={`dropdown-menu ${dropdownOpen === 'services' ? 'show' : ''}`}>
              <div className="dropdown-grid">
                {servicesItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="dropdown-card"
                    onClick={() => handleNavClick('home', item.section)}
                  >
                    <item.icon className="dropdown-icon" size={20} />
                    <div>
                      <div className="dropdown-title">{item.title}</div>
                      <div className="dropdown-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="nav-item has-dropdown"
            onMouseEnter={() => setDropdownOpen('solutions')}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="nav-link flex-center">
              Solutions <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className={`dropdown-menu mega-dropdown ${dropdownOpen === 'solutions' ? 'show' : ''}`}>
              <div className="dropdown-grid cols-2">
                {solutionsItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="dropdown-card"
                    onClick={() => handleNavClick('home', 'industries')}
                  >
                    <item.icon className="dropdown-icon" size={20} />
                    <div>
                      <div className="dropdown-title">{item.title}</div>
                      <div className="dropdown-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nav-item">
            <button 
              className="nav-link"
              onClick={() => handleNavClick('home', 'industries')}
            >
              Industries
            </button>
          </div>

          <div className="nav-item">
            <button 
              className="nav-link"
              onClick={() => handleNavClick('home', 'portfolio')}
            >
              Portfolio
            </button>
          </div>

          <div className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => handleNavClick('careers')}
            >
              Careers
            </button>
          </div>

          <div className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => handleNavClick('insights')}
            >
              Insights
            </button>
          </div>

          <div className="nav-item">
            <button 
              className="nav-link"
              onClick={() => handleNavClick('home', 'contact')}
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Right Action */}
        <div className="header-actions">
          <button className="btn-consultation" onClick={openConsultationModal}>
            Book Consultation
          </button>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <button onClick={() => handleNavClick('home')} className="mobile-link">Home</button>
          <button onClick={() => handleNavClick('about')} className="mobile-link">About Us</button>
          
          <div className="mobile-section-header">Services</div>
          {servicesItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => handleNavClick('home', 'services')} 
              className="mobile-sublink"
            >
              {item.title}
            </button>
          ))}

          <div className="mobile-section-header">Solutions & Industries</div>
          {solutionsItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => handleNavClick('home', 'industries')} 
              className="mobile-sublink"
            >
              {item.title}
            </button>
          ))}

          <button onClick={() => handleNavClick('home', 'portfolio')} className="mobile-link">Portfolio</button>
          <button onClick={() => handleNavClick('careers')} className="mobile-link">Careers</button>
          <button onClick={() => handleNavClick('insights')} className="mobile-link">Insights</button>
          <button onClick={() => handleNavClick('home', 'contact')} className="mobile-link">Contact</button>
          
          <button 
            className="mobile-btn-consultation" 
            onClick={() => {
              setMobileMenuOpen(false);
              openConsultationModal();
            }}
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* CSS Styles Specific to Header */}
      <style>{`
        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(7, 20, 38, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: var(--transition-normal);
          height: 80px;
          display: flex;
          align-items: center;
        }
        
        .header-container.sticky {
          background: rgba(3, 10, 20, 0.95);
          border-bottom: 1px solid rgba(0, 191, 255, 0.15);
          box-shadow: var(--shadow-md);
          height: 70px;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        /* Logo Styling */
        .logo-section {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }
        
        .logo-glow {
          position: absolute;
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.2) 0%, transparent 70%);
          top: -15px;
          left: -15px;
          pointer-events: none;
        }

        .logo-text {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--color-white-pure);
          line-height: 1;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, #fff 0%, var(--color-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-subtext {
          font-family: var(--font-mono);
          font-weight: 500;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-cyan);
          margin-top: 2px;
        }

        /* Nav Link Styling */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--color-gray-dark);
          font-family: var(--font-primary);
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: var(--border-radius-sm);
          transition: var(--transition-fast);
        }

        .nav-link:hover, .nav-link.active {
          color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.05);
        }

        .flex-center {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chevron-icon {
          transition: var(--transition-fast);
        }
        .has-dropdown:hover .chevron-icon {
          transform: rotate(180deg);
          color: var(--color-cyan);
        }

        /* Dropdown Styling */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          background: rgba(7, 20, 38, 0.98);
          border: 1px solid rgba(0, 191, 255, 0.15);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-premium);
          padding: 16px;
          width: 320px;
          transition: var(--transition-normal);
          backdrop-filter: blur(10px);
          z-index: 100;
        }

        .dropdown-menu.mega-dropdown {
          width: 580px;
        }

        .has-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-grid {
          display: grid;
          gap: 12px;
        }

        .dropdown-grid.cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .dropdown-card {
          display: flex;
          gap: 12px;
          padding: 10px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .dropdown-card:hover {
          background: rgba(15, 82, 186, 0.15);
          border-left: 3px solid var(--color-cyan);
        }

        .dropdown-icon {
          color: var(--color-cyan);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .dropdown-title {
          font-family: var(--font-title);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-white-pure);
        }

        .dropdown-desc {
          font-size: 0.75rem;
          color: var(--color-gray-dark);
          margin-top: 2px;
        }

        /* Buttons & Actions */
        .btn-consultation {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.85rem;
          padding: 10px 22px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(109, 93, 252, 0.3);
          transition: var(--transition-fast);
        }

        .btn-consultation:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(109, 93, 252, 0.5), 0 0 15px rgba(0, 191, 255, 0.3);
          background: linear-gradient(135deg, var(--color-purple) 0%, var(--color-cyan) 100%);
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-white-pure);
          cursor: pointer;
        }

        /* Mobile Nav Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3, 10, 20, 0.98);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          z-index: 999;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-normal);
          overflow-y: auto;
          padding: 24px;
        }

        .mobile-nav-drawer.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-link {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-title);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-white-pure);
          padding: 8px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-section-header {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-cyan);
          margin-top: 12px;
        }

        .mobile-sublink {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-primary);
          font-size: 0.95rem;
          color: var(--color-gray-dark);
          padding: 4px 12px;
          cursor: pointer;
        }

        .mobile-sublink:hover {
          color: var(--color-cyan);
        }

        .mobile-btn-consultation {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 1rem;
          padding: 14px;
          border-radius: var(--border-radius-md);
          margin-top: 20px;
          cursor: pointer;
          text-align: center;
        }

        @media (max-width: 991px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .btn-consultation {
            display: none;
          }
          .header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>
    </header>
  );
}
