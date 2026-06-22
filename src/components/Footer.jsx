import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNavClick = (tabId, sectionId) => {
    if (tabId === 'home') {
      setActiveTab('home');
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        
        {/* Column 1: Company Logo & Pitch & Newsletter */}
        <div className="footer-company-col">
          <div className="footer-logo" onClick={() => handleNavClick('home')}>
            <span className="logo-text">OmNetaTech</span>
            <span className="logo-sub">Digital Futures</span>
          </div>
          <p className="footer-pitch">
            Engineering next-generation enterprise technology. Providing scalable AI, robust multi-cloud systems, and zero-trust security architectures globally.
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-label">Subscribe to Insights</div>
            {!subscribed ? (
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  required 
                  placeholder="name@corporation.com" 
                  className="newsletter-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </div>
            ) : (
              <div className="newsletter-success">
                <Check size={14} className="check-green" />
                <span>Joined publication registry.</span>
              </div>
            )}
          </form>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('about')} className="footer-btn-link">About Us</button></li>
            <li><button onClick={() => handleNavClick('about')} className="footer-btn-link">Leadership</button></li>
            <li><button onClick={() => handleNavClick('careers')} className="footer-btn-link">Careers</button></li>
            <li><button onClick={() => handleNavClick('home', 'contact')} className="footer-btn-link">Contact</button></li>
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">AI Solutions</button></li>
            <li><button onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Cloud Services</button></li>
            <li><button onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Cybersecurity</button></li>
            <li><button onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Automation</button></li>
          </ul>
        </div>

        {/* Column 4: Resources & Contact Info */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('insights')} className="footer-btn-link">Blog & News</button></li>
            <li><button onClick={() => handleNavClick('home', 'portfolio')} className="footer-btn-link">Case Studies</button></li>
            <li><button onClick={() => handleNavClick('insights')} className="footer-btn-link">Insights Reports</button></li>
            <li><button onClick={() => handleNavClick('insights')} className="footer-btn-link">Documentation</button></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom copyright & socials */}
      <div className="footer-bottom container">
        <div className="footer-bottom-left">
          <span>&copy; {new Date().getFullYear()} OmNetaTech – Digital Futures. All rights reserved.</span>
          <span className="divider">|</span>
          <a href="#" className="bottom-link">Privacy Policy</a>
          <span className="divider">|</span>
          <a href="#" className="bottom-link">SLA Terms</a>
        </div>

        <div className="footer-socials">
          <a href="#" className="social-icon-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="social-icon-btn" aria-label="Twitter">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="#" className="social-icon-btn" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--color-navy-dark);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 80px 24px 40px 24px;
          color: var(--color-gray-medium);
          position: relative;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(3, 0.83fr);
          gap: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 60px;
          margin-bottom: 40px;
        }

        /* Company col styling */
        .footer-company-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .footer-logo .logo-text {
          font-family: var(--font-title);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-white-pure);
          letter-spacing: -0.5px;
        }

        .footer-logo .logo-sub {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 2px;
        }

        .footer-pitch {
          font-size: 0.85rem;
          color: var(--color-gray-dark);
          line-height: 1.5;
          max-width: 320px;
        }

        /* Newsletter */
        .newsletter-form {
          margin-top: 12px;
        }

        .newsletter-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .newsletter-input-group {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          max-width: 280px;
        }

        .newsletter-input {
          background: none;
          border: none;
          color: var(--color-white-pure);
          padding: 8px 12px;
          font-size: 0.8rem;
          font-family: var(--font-primary);
          flex: 1;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: var(--color-gray-dark);
        }

        .newsletter-btn {
          background: var(--color-royal);
          border: none;
          color: var(--color-white-pure);
          padding: 8px 16px;
          font-size: 0.8rem;
          font-family: var(--font-primary);
          font-weight: 600;
          cursor: pointer;
        }

        .newsletter-btn:hover {
          background: var(--color-cyan);
          color: var(--color-navy-dark);
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #10B981;
        }

        .check-green {
          color: #10B981;
        }

        /* Links columns styling */
        .footer-heading {
          font-family: var(--font-title);
          font-size: 0.95rem;
          color: var(--color-white-pure);
          margin-bottom: 20px;
          font-weight: 700;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-btn-link {
          background: none;
          border: none;
          color: var(--color-gray-dark);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0;
          text-align: left;
        }

        .footer-btn-link:hover {
          color: var(--color-cyan);
          transform: translateX(2px);
        }

        /* Bottom Section styling */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--color-gray-dark);
        }

        .footer-bottom-left {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .divider {
          color: rgba(255, 255, 255, 0.05);
        }

        .bottom-link:hover {
          color: var(--color-cyan);
        }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .social-icon-btn {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-medium);
          transition: var(--transition-fast);
        }

        .social-icon-btn:hover {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.05);
        }

        @media (max-width: 991px) {
          .footer-grid {
            grid-template-columns: 1fr repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .footer-bottom-left {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
