import { useState } from 'react';
import { Phone, Mail, MapPin, Lock } from 'lucide-react';
import LegalModal from './LegalModal';
import { useCms } from '../context/CmsContext';

export default function Footer({ setActiveTab }) {
  const { content } = useCms();
  const footerData = content?.footer || {};
  const contactData = content?.contact || {};
  const [legalType, setLegalType] = useState(null); // 'privacy' | 'terms' | null

  const handleNav = (tabId, sectionId) => {
    if (tabId === 'home') {
      setActiveTab('home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAdminNav = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <footer className="footer-root">
      <div className="container footer-main-grid">
        
        {/* Column 1: Brand & Description */}
        <div className="footer-brand-col">
          <div className="footer-logo" onClick={() => handleNav('home')}>
            <span className="brand-title">OmNetaTech</span>
          </div>
          <p className="footer-brand-desc">
            {footerData.description || 'Technology solutions that help businesses build, grow and transform.'}
          </p>
          <div className="footer-identity-tag">
            <span>India-Based Technology Company</span>
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">Company</h4>
          <ul className="footer-nav-list">
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('about')}>
                About OmNetaTech
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('careers')}>
                Careers
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('insights')}>
                Insights
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'contact')}>
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">Services</h4>
          <ul className="footer-nav-list">
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'services')}>
                Software Development
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'services')}>
                Web Development
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'services')}>
                Mobile App Development
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'services')}>
                Cloud & DevOps
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'services')}>
                Automation & AI
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Solutions */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">Solutions</h4>
          <ul className="footer-nav-list">
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'solutions')}>
                Custom Software
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'solutions')}>
                Digital Products
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'solutions')}>
                Business Automation
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNav('home', 'solutions')}>
                E-commerce
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact Info */}
        <div className="footer-contact-col">
          <h4 className="footer-col-heading">Contact</h4>
          <div className="footer-contact-items">
            <a href={`tel:${contactData.phone || '+918237140776'}`} className="footer-contact-link">
              <Phone size={15} className="contact-icon" />
              <span>{contactData.phone || '+91 8237140776'}</span>
            </a>
            <a href={`mailto:${contactData.email || 'omnetatech@gmail.com'}`} className="footer-contact-link">
              <Mail size={15} className="contact-icon" />
              <span>{contactData.email || 'omnetatech@gmail.com'}</span>
            </a>
            <div className="footer-contact-static">
              <MapPin size={15} className="contact-icon" />
              <span>{contactData.country || 'India'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar container">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} {footerData.copyright || 'OmNetaTech. All rights reserved.'}
        </div>

        <div className="footer-legal-links">
          <button className="legal-btn" onClick={() => setLegalType('privacy')}>
            Privacy Policy
          </button>
          <span className="legal-separator">•</span>
          <button className="legal-btn" onClick={() => setLegalType('terms')}>
            Terms & Conditions
          </button>
          <span className="legal-separator">•</span>
          <a href="/admin" onClick={handleAdminNav} className="legal-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#93C5FD' }}>
            <Lock size={12} />
            <span>Admin Portal</span>
          </a>
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal 
        isOpen={Boolean(legalType)} 
        type={legalType} 
        onClose={() => setLegalType(null)} 
      />

      <style>{`
        .footer-root {
          background-color: var(--color-primary-navy);
          color: #E2E8F0;
          padding: 80px 0 36px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1fr 1.2fr;
          gap: 36px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Brand Column */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-logo {
          cursor: pointer;
        }

        .brand-title {
          font-family: var(--font-title);
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-white);
          letter-spacing: -0.02em;
        }

        .footer-brand-desc {
          font-size: 0.88rem;
          color: #94A3B8;
          line-height: 1.6;
          max-width: 280px;
        }

        .footer-identity-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #60A5FA;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Links Columns */
        .footer-col-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-btn {
          background: none;
          border: none;
          color: #94A3B8;
          font-family: inherit;
          font-size: 0.86rem;
          cursor: pointer;
          text-align: left;
          padding: 0;
          transition: all var(--transition-fast);
        }

        .footer-link-btn:hover {
          color: #FFFFFF;
          transform: translateX(2px);
        }

        /* Contact Column */
        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-contact-link,
        .footer-contact-static {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: #CBD5E1;
          text-decoration: none;
        }

        .footer-contact-link:hover {
          color: #60A5FA;
        }

        .contact-icon {
          color: #60A5FA;
          flex-shrink: 0;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          font-size: 0.82rem;
          color: #94A3B8;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-btn {
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 0.82rem;
          cursor: pointer;
          padding: 0;
        }

        .legal-btn:hover {
          color: #FFFFFF;
          text-decoration: underline;
        }

        .legal-separator {
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1080px) {
          .footer-main-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
