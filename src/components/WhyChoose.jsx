import { Award, Zap, Globe, Shield, RefreshCw, Headphones, ArrowUpRight } from 'lucide-react';

export default function WhyChoose() {
  const benefits = [
    {
      icon: Award,
      title: 'Enterprise Expertise',
      desc: 'Our delivery pipelines match absolute ISO quality scales, engineered specifically for high-load operations and complex corporate code architectures.',
      detail: 'ISO 9001/27001 Certified Processes'
    },
    {
      icon: Zap,
      title: 'AI-Driven Innovation',
      desc: 'We integrate cognitive AI structures directly into database pipelines, enabling automatic process auditing and reducing manual labor scales.',
      detail: 'Private & Secure RAG Architecture'
    },
    {
      icon: Globe,
      title: 'Global Delivery Capability',
      desc: 'Operating distributed engineering teams across APAC, Europe, and the Americas, providing round-the-clock developer operations and support.',
      detail: '24/7 Follow-the-Sun Support Model'
    },
    {
      icon: Shield,
      title: 'Security First Approach',
      desc: 'We enforce zero-trust identity checks, continuous endpoint audit scanning, and full data encryption at rest and in transit.',
      detail: 'SOC 2 & HIPAA-Ready Frameworks'
    },
    {
      icon: RefreshCw,
      title: 'Proven Success Framework',
      desc: 'Our sprint plans deploy functional prototypes in 2-week iterations, reducing go-to-market wait schedules and ensuring budget alignment.',
      detail: 'Adaptive Agile Lifecycle Delivery'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support Teams',
      desc: 'Every corporate partner receives direct access to designated Solutions Architects and Client Success Executives for instant communication.',
      detail: 'Dedicated Slack & Private Teams Access'
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="grid-overlay"></div>
      <div className="container">
        
        {/* Header section */}
        <div className="why-header">
          <div className="badge">Corporate Strategy</div>
          <h2 className="why-title">Why Enterprises Choose OmNetaTech</h2>
          <p className="why-sub">
            Engineering digital architectures that combine agility with bulletproof reliability. We bridge the gap between experimental AI prototypes and secure enterprise-grade systems.
          </p>
        </div>

        {/* Card Grid */}
        <div className="why-grid">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-card-glow"></div>
                <div className="why-content">
                  <div className="why-icon-box">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="why-card-title">{b.title}</h3>
                  <p className="why-card-desc">{b.desc}</p>
                  
                  <div className="why-card-footer">
                    <span className="why-detail-tag">{b.detail}</span>
                    <ArrowUpRight size={14} className="why-arrow" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .why-choose-section {
          background-color: var(--color-navy);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .why-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .why-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-white-pure);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .why-sub {
          font-size: 1.05rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Why Grid Layout */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative;
          z-index: 10;
        }

        /* Why Card Custom Style */
        .why-card {
          background: rgba(13, 34, 60, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .why-card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(0, 191, 255, 0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .why-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 191, 255, 0.2);
          box-shadow: var(--shadow-lg);
          background: rgba(13, 34, 60, 0.55);
        }

        .why-card:hover .why-card-glow {
          opacity: 1;
        }

        .why-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 1;
        }

        .why-icon-box {
          width: 44px;
          height: 44px;
          background: rgba(109, 93, 252, 0.15);
          color: var(--color-purple);
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: var(--transition-fast);
        }

        .why-card:hover .why-icon-box {
          color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.15);
        }

        .why-card-title {
          font-size: 1.25rem;
          color: var(--color-white-pure);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .why-card-desc {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        /* Footer inside card */
        .why-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: auto;
        }

        .why-detail-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-cyan);
          text-transform: uppercase;
        }

        .why-arrow {
          color: var(--color-gray-dark);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .why-card:hover .why-arrow {
          transform: translate(2px, -2px);
          color: var(--color-cyan);
        }

        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
