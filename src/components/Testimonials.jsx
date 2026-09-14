import { MessageSquare, ShieldCheck, Target, Headphones, Check } from 'lucide-react';

export default function Testimonials() {
  const clientValues = [
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      highlight: 'Direct & Transparent',
      desc: 'Transparent project scoping, realistic milestones, and direct consultations without misleading technical jargon.'
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Delivery',
      highlight: 'Predictable Timelines',
      desc: 'Predictable engineering velocity, structured testing before release, and committed adherence to agreed schedules.'
    },
    {
      icon: Target,
      title: 'Business-Focused Development',
      highlight: 'Outcome-Oriented',
      desc: 'Software built around real operational objectives—aimed at improving team workflows, saving time, and delighting users.'
    },
    {
      icon: Headphones,
      title: 'Responsive Support',
      highlight: 'Committed Partnership',
      desc: 'Ongoing post-deployment availability, prompt bug resolution, routine maintenance, and dedicated technical support.'
    }
  ];

  return (
    <section className="client-values-root section section-light">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">Client Commitment</div>
          <h2 className="section-title">What Our Clients Value</h2>
          <p className="section-subtitle">
            Our technology practice is built around four fundamental principles that ensure peace of mind, high software quality, and lasting client relationships.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="values-cards-grid">
          {clientValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="value-pillar-card shadow-sm">
                <div className="value-card-top">
                  <div className="value-icon-circle">
                    <Icon size={22} />
                  </div>
                  <span className="value-highlight-tag">{val.highlight}</span>
                </div>

                <h3 className="value-pillar-title">{val.title}</h3>
                <p className="value-pillar-desc">{val.desc}</p>

                <div className="value-guarantee-line">
                  <Check size={14} className="check-guarantee" />
                  <span>Standard on every engagement</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .client-values-root {
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .values-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .value-pillar-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .value-pillar-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
        }

        .value-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;
        }

        .value-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .value-pillar-card:hover .value-icon-circle {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .value-highlight-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--color-primary-blue);
          background: #F0F7FF;
          padding: 4px 8px;
          border-radius: var(--radius-xs);
          font-weight: 600;
        }

        .value-pillar-title {
          font-size: 1.15rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .value-pillar-desc {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .value-guarantee-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--color-primary-navy);
          font-weight: 600;
          border-top: 1px solid var(--color-border);
          padding-top: 14px;
          width: 100%;
        }

        .check-guarantee {
          color: var(--color-success);
        }

        @media (max-width: 1024px) {
          .values-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .values-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
