import { Target, ShieldCheck, Users, Heart, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function AboutSection({ onReadMore, openConsultationModal }) {
  const { content } = useCms();
  const about = content?.about || {};

  const whyCards = [
    {
      title: 'Business First',
      desc: 'Technology solutions designed around actual business requirements.',
      icon: Target
    },
    {
      title: 'Quality Engineering',
      desc: 'Clean, maintainable and scalable software built using modern development practices.',
      icon: ShieldCheck
    },
    {
      title: 'Transparent Communication',
      desc: 'Clear communication, realistic expectations and collaborative delivery.',
      icon: Users
    },
    {
      title: 'Long-Term Partnership',
      desc: 'We aim to build technology partnerships that continue beyond project delivery.',
      icon: Heart
    }
  ];

  return (
    <section id="about" className="about-sec-root section section-white">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">{about.badge || 'About OmNetaTech'}</div>
          <h2 className="section-title">{about.headline || 'Practical Technology Built Around Your Goals'}</h2>
          <p className="about-sec-lead">
            {about.leadText || 'OmNetaTech is an India-based technology company focused on helping businesses use technology to solve real-world challenges. We work across software development, web and mobile solutions, automation, cloud technologies and modern digital experiences.'}
          </p>
        </div>

        {/* Why OmNetaTech Cards */}
        <div className="why-section-block">
          <div className="why-block-title-row">
            <h3 className="why-block-heading">Why OmNetaTech?</h3>
            <span className="why-block-sub">Our core commitment to every client engagement</span>
          </div>

          <div className="why-cards-grid">
            {whyCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="why-pillar-card shadow-sm">
                  <div className="why-pillar-icon">
                    <Icon size={22} />
                  </div>
                  <h4 className="why-pillar-title">{card.title}</h4>
                  <p className="why-pillar-desc">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="about-action-bar">
          <button 
            className="btn-primary-blue"
            onClick={openConsultationModal}
          >
            <span>Get a Free Consultation</span>
            <ArrowRight size={16} />
          </button>
          {onReadMore && (
            <button 
              className="btn-secondary-outline"
              onClick={onReadMore}
            >
              <span>Read More About Our Company</span>
            </button>
          )}
        </div>

      </div>

      <style>{`
        .about-sec-root {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
        }

        .about-sec-lead {
          font-size: 1.08rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-top: 4px;
        }

        .why-section-block {
          margin-top: 48px;
          margin-bottom: 40px;
        }

        .why-block-title-row {
          text-align: center;
          margin-bottom: 32px;
        }

        .why-block-heading {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-bottom: 6px;
        }

        .why-block-sub {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
        }

        .why-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .why-pillar-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .why-pillar-card:hover {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .why-pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .why-pillar-card:hover .why-pillar-icon {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .why-pillar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .why-pillar-desc {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .about-action-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 24px;
        }

        @media (max-width: 1024px) {
          .why-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .why-cards-grid {
            grid-template-columns: 1fr;
          }
          .about-action-bar {
            flex-direction: column;
            width: 100%;
          }
          .about-action-bar button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
