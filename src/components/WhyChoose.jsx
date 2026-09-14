import { MessageSquare, Cpu, TrendingUp, CheckCircle, Clock, Headphones } from 'lucide-react';

export default function WhyChoose() {
  const valueProps = [
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      desc: 'Direct conversations, regular progress updates, and transparent expectation management from start to finish.'
    },
    {
      icon: Cpu,
      title: 'Practical Technology',
      desc: 'We select software stacks that genuinely fit your actual business needs without unnecessary over-engineering.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      desc: 'Engineered to comfortably accommodate growing business traffic, transactions, and evolving feature requirements.'
    },
    {
      icon: CheckCircle,
      title: 'Quality-Focused Development',
      desc: 'Clean, maintainable, and well-structured codebases built with modern development and testing standards.'
    },
    {
      icon: Clock,
      title: 'Flexible Engagement',
      desc: 'Adaptable project scopes and milestone schedules designed for startups, SMEs, and growing organizations.'
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      desc: 'Reliable post-launch technical assistance, system maintenance, and proactive performance monitoring.'
    }
  ];

  return (
    <section className="why-root section section-light">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">Why OmNetaTech</div>
          <h2 className="section-title">A Dedicated Technology Partner for Your Business</h2>
          <p className="section-subtitle">
            We focus on establishing long-term technology partnerships built on engineering reliability, honest timelines, and business-focused delivery.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="why-grid">
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="why-value-card shadow-sm">
                <div className="why-icon-box">
                  <Icon size={22} />
                </div>
                <h3 className="why-value-title">{item.title}</h3>
                <p className="why-value-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .why-root {
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .why-value-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .why-value-card:hover {
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .why-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all var(--transition-fast);
        }

        .why-value-card:hover .why-icon-box {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .why-value-title {
          font-size: 1.18rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .why-value-desc {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
          .why-value-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
