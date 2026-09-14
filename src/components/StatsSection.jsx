import { Code2, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  const focuses = [
    {
      icon: Code2,
      title: 'Modern Development',
      desc: 'Modular, well-structured frontend and backend codebases built using established modern frameworks and standards.'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      desc: 'Frictionless, fluid digital experiences engineered to perform consistently across all modern screen resolutions and devices.'
    },
    {
      icon: Cpu,
      title: 'Scalable Architecture',
      desc: 'Clean database design, robust API endpoints, and efficient server structures built to handle growing user traffic smoothly.'
    },
    {
      icon: ShieldCheck,
      title: 'Business Automation',
      desc: 'Practical automation pipelines connecting internal data and operations to minimize repetitive manual overhead.'
    }
  ];

  return (
    <section className="tech-focus-root section-navy">
      <div className="container">
        <div className="tech-focus-header">
          <div className="badge badge-navy">Our Technical Standard</div>
          <h2 className="tech-focus-title">Engineering Excellence in Every Project</h2>
          <p className="tech-focus-sub">
            We focus on clean software architecture and practical usability rather than hype. Our goal is delivering digital solutions that work reliably day in and day out.
          </p>
        </div>

        <div className="tech-focus-grid">
          {focuses.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="tech-focus-card">
                <div className="focus-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3 className="focus-title">{item.title}</h3>
                <p className="focus-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .tech-focus-root {
          padding: 96px 0;
          background: #0B1F3A;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 1024px) {
          .tech-focus-root {
            padding: 72px 0;
          }
        }

        @media (max-width: 640px) {
          .tech-focus-root {
            padding: 54px 0;
          }
        }

        .tech-focus-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 48px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tech-focus-title {
          font-size: clamp(1.85rem, 2.8vw, 2.4rem);
          color: #FFFFFF;
          margin-top: 14px;
          margin-bottom: 14px;
          font-weight: 800;
        }

        .tech-focus-sub {
          font-size: 1rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        .tech-focus-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .tech-focus-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .tech-focus-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(23, 105, 224, 0.5);
          transform: translateY(-3px);
        }

        .focus-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(23, 105, 224, 0.2);
          color: #60A5FA;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .focus-title {
          font-size: 1.15rem;
          color: #FFFFFF;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .focus-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .tech-focus-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .tech-focus-grid {
            grid-template-columns: 1fr;
          }
          .tech-focus-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
}
