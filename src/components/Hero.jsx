import { ArrowRight, CheckCircle, Code2, Cloud, Database, Shield, Layers, Smartphone, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Hero({ openConsultationModal, scrollToServices }) {
  const { content } = useCms();
  const hero = content?.hero || {};

  const capabilities = [
    { title: 'Business-Focused Solutions', desc: 'Engineered for real operational ROI' },
    { title: 'Scalable Technology', desc: 'Built to grow seamlessly with your userbase' },
    { title: 'Modern Development Practices', desc: 'Clean, maintainable & tested codebases' },
    { title: 'Reliable Support', desc: 'Committed technical partnership & maintenance' }
  ];

  return (
    <section className="hero-section">
      <div className="hero-pattern"></div>
      
      <div className="container hero-container">
        {/* Left Column: Copy & CTAs */}
        <div className="hero-content">
          <div className="badge hero-badge">
            <Sparkles size={14} />
            <span>{hero.badgeText || 'Indian Technology Services Company'}</span>
          </div>

          <h1 className="hero-title">
            Building Digital Solutions That Move Your <span className="hero-title-highlight">{hero.highlight || 'Business Forward'}</span>
          </h1>

          <p className="hero-description">
            {hero.subheading || 'OmNetaTech delivers practical, scalable and reliable technology solutions that help businesses improve operations, automate processes and build better digital experiences.'}
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-blue hero-btn" onClick={openConsultationModal}>
              <span>{hero.primaryCta || 'Get a Free Consultation'}</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary-outline hero-btn" onClick={scrollToServices}>
              <span>{hero.secondaryCta || 'Explore Our Services'}</span>
            </button>
          </div>

          {/* Small Trust Statement */}
          <div className="hero-trust-statement">
            <CheckCircle size={16} className="trust-check-icon" />
            <span>{hero.trustStatement || 'Technology solutions designed around your business goals.'}</span>
          </div>
        </div>

        {/* Right Column: Modern Software Architecture Visual */}
        <div className="hero-visual">
          <div className="architecture-card shadow-lg">
            {/* Header bar */}
            <div className="arch-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="arch-title-tag">Solution Architecture Stack</div>
            </div>

            {/* Visual Layers Diagram: Frontend -> API -> Backend -> Database / Cloud */}
            <div className="arch-body">
              {/* Tier 1: Frontend */}
              <div className="arch-layer layer-frontend">
                <div className="layer-header">
                  <div className="layer-icon-box">
                    <Layers size={14} className="layer-icon" />
                  </div>
                  <span className="layer-name">Frontend Applications</span>
                </div>
                <div className="layer-chips">
                  <span className="chip"><Smartphone size={11} /> Responsive Web</span>
                  <span className="chip"><Smartphone size={11} /> Mobile Apps</span>
                  <span className="chip"><Code2 size={11} /> Business Portals</span>
                </div>
              </div>

              {/* Connecting Step: API */}
              <div className="arch-connector">
                <div className="connector-line"></div>
                <div className="connector-badge">
                  <span>↓</span>
                  <span>API Integration Layer (REST / GraphQL)</span>
                  <span>↓</span>
                </div>
                <div className="connector-line"></div>
              </div>

              {/* Tier 2: Backend */}
              <div className="arch-layer layer-backend">
                <div className="layer-header">
                  <div className="layer-icon-box">
                    <Code2 size={14} className="layer-icon" />
                  </div>
                  <span className="layer-name">Backend & Business Logic</span>
                </div>
                <div className="layer-chips">
                  <span className="chip">Modular Microservices</span>
                  <span className="chip">Automated Workflows</span>
                  <span className="chip">Custom Logic</span>
                </div>
              </div>

              {/* Connecting Step: Data Bus */}
              <div className="arch-connector">
                <div className="connector-line"></div>
                <div className="connector-badge">
                  <span>↓</span>
                  <span>Secure Cloud Data Layer</span>
                  <span>↓</span>
                </div>
                <div className="connector-line"></div>
              </div>

              {/* Tier 3: Database & Cloud */}
              <div className="arch-layer layer-infra">
                <div className="layer-header">
                  <div className="layer-icon-box">
                    <Cloud size={14} className="layer-icon" />
                  </div>
                  <span className="layer-name">Database & Cloud Foundation</span>
                </div>
                <div className="layer-chips">
                  <span className="chip"><Database size={11} /> Scalable Database</span>
                  <span className="chip"><Cloud size={11} /> Cloud Hosting</span>
                  <span className="chip"><Shield size={11} /> Data Protection</span>
                </div>
              </div>
            </div>

            {/* Architecture Footer Status */}
            <div className="arch-footer">
              <div className="arch-status-pill">
                <span className="live-indicator"></span>
                <span>Production-Ready Engineering</span>
              </div>
              <span className="arch-quality-tag">Clean Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Trust Capability Area */}
      <div className="hero-trust-bar">
        <div className="container">
          <div className="trust-grid">
            {capabilities.map((item, idx) => (
              <div key={idx} className="trust-card">
                <div className="trust-card-icon">
                  <CheckCircle size={18} />
                </div>
                <div className="trust-card-content">
                  <div className="trust-card-title">{item.title}</div>
                  <div className="trust-card-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          background: linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%);
          padding-top: 60px;
          padding-bottom: 0;
          overflow: hidden;
          border-bottom: 1px solid var(--color-border);
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(rgba(23, 105, 224, 0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          padding-bottom: 72px;
        }

        /* Left Copy */
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          font-weight: 800;
          color: var(--color-primary-navy);
          line-height: 1.16;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
        }

        .hero-title-highlight {
          color: var(--color-primary-blue);
          position: relative;
          display: inline-block;
        }

        .hero-description {
          font-size: clamp(1.05rem, 1.3vw, 1.18rem);
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin-bottom: 36px;
          max-width: 600px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 14px 28px;
          font-size: 0.96rem;
        }

        .hero-trust-statement {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--color-primary-navy);
          font-weight: 500;
        }

        .trust-check-icon {
          color: var(--color-success);
          flex-shrink: 0;
        }

        /* Right Visual */
        .hero-visual {
          position: relative;
        }

        .architecture-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 16px 36px rgba(11, 31, 58, 0.08);
          animation: subtleFloat 6s ease-in-out infinite;
        }

        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .architecture-card {
            animation: none !important;
          }
        }

        .arch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #F1F5F9;
          border-bottom: 1px solid var(--color-border);
        }

        .window-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-red { background: #FF5F56; }
        .dot-yellow { background: #FFBD2E; }
        .dot-green { background: #27C93F; }

        .arch-title-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .arch-body {
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FAFBFD;
        }

        .arch-layer {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-fast);
        }

        .arch-layer:hover {
          border-color: var(--color-primary-blue);
          transform: translateY(-1px);
        }

        .layer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .layer-icon-box {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .layer-icon {
          color: var(--color-primary-blue);
        }

        .layer-name {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--color-primary-navy);
        }

        .layer-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--color-light-blue);
          color: var(--color-primary-navy);
          border: 1px solid rgba(23, 105, 224, 0.15);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          font-size: 0.72rem;
          font-weight: 600;
        }

        /* Connectors */
        .arch-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .connector-line {
          flex: 1;
          height: 1px;
          background: #CBD5E1;
        }

        .connector-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-primary-blue);
          background: #EEF4FC;
          border: 1px solid rgba(23, 105, 224, 0.12);
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }

        .arch-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background: var(--color-white);
          border-top: 1px solid var(--color-border);
          font-size: 0.76rem;
        }

        .arch-status-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--color-primary-navy);
          font-weight: 600;
        }

        .live-indicator {
          width: 7px;
          height: 7px;
          background: var(--color-success);
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(22, 138, 91, 0.15);
        }

        .arch-quality-tag {
          font-family: var(--font-mono);
          color: var(--color-primary-blue);
          font-weight: 600;
          font-size: 0.72rem;
        }

        /* Trust Bar */
        .hero-trust-bar {
          background-color: var(--color-white);
          border-top: 1px solid var(--color-border);
          padding: 28px 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .trust-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: var(--transition-fast);
        }

        .trust-card-icon {
          color: var(--color-primary-blue);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .trust-card-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 2px;
        }

        .trust-card-desc {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 36px;
            padding-bottom: 48px;
          }
          .hero-content {
            align-items: center;
            text-align: center;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-visual {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .trust-grid {
            grid-template-columns: 1fr;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn {
            width: 100%;
          }
          .arch-body {
            padding: 14px;
            gap: 8px;
          }
          .arch-layer {
            padding: 10px 12px;
          }
        }
      `}</style>
    </section>
  );
}
