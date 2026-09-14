import { Search, Compass, Code, CheckCircle, Headphones } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      desc: 'Understand business goals, challenges and requirements.',
      icon: Search,
      details: 'We begin with an in-depth conversation to understand your workflow, user expectations, and exact technical needs.'
    },
    {
      number: '02',
      title: 'Plan',
      desc: 'Define technology, architecture, scope and delivery roadmap.',
      icon: Compass,
      details: 'We formulate the technical architecture, select modern toolsets, outline sprint milestones, and establish clear delivery timelines.'
    },
    {
      number: '03',
      title: 'Design & Develop',
      desc: 'Build the product using modern development practices.',
      icon: Code,
      details: 'Our engineers write clean, modular, and maintainable code adhering to software engineering best practices and agile sprints.'
    },
    {
      number: '04',
      title: 'Test & Launch',
      desc: 'Perform quality checks, optimization and deployment.',
      icon: CheckCircle,
      details: 'Rigorous cross-device testing, responsive layout verification, performance profiling, and seamless production deployment.'
    },
    {
      number: '05',
      title: 'Support & Improve',
      desc: 'Provide maintenance, improvements and ongoing technical support.',
      icon: Headphones,
      details: 'We remain your dedicated technology partner post-launch, ensuring ongoing stability, security updates, and incremental enhancements.'
    }
  ];

  return (
    <section className="process-root section section-light">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">Our Engineering Methodology</div>
          <h2 className="section-title">How We Deliver Results</h2>
          <p className="section-subtitle">
            A structured, collaborative, and transparent delivery process ensuring predictable milestones from concept through long-term support.
          </p>
        </div>

        {/* Step Flow Grid */}
        <div className="process-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="process-step-card shadow-sm">
                <div className="step-card-top">
                  <span className="step-number-pill">{step.number}</span>
                  <div className="step-icon-circle">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                <div className="step-detail-text">{step.details}</div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .process-root {
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          position: relative;
        }

        /* Connecting Timeline Line */
        .process-grid::before {
          content: '';
          position: absolute;
          top: 44px;
          left: 40px;
          right: 40px;
          height: 2px;
          background: #E2E8F0;
          z-index: 1;
        }

        .process-step-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px 18px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        .process-step-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary-blue);
          box-shadow: 0 10px 24px rgba(11, 31, 58, 0.08);
        }

        .step-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .step-number-pill {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-primary-blue);
          line-height: 1;
        }

        .step-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          border: 2px solid var(--color-white);
          box-shadow: 0 0 0 1px var(--color-border);
        }

        .process-step-card:hover .step-icon-circle {
          background: var(--color-primary-blue);
          color: var(--color-white);
          border-color: var(--color-white);
        }

        .step-title {
          font-size: 1.1rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .step-desc {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .step-detail-text {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-top: auto;
          border-top: 1px solid var(--color-border);
          padding-top: 10px;
        }

        @media (max-width: 1100px) {
          .process-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .process-grid::before {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
