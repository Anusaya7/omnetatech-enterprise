import { useState } from 'react';
import { Cpu, Server, Shield, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesSection() {
  const [activeDetail, setActiveDetail] = useState(null);

  const services = [
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      icon: Cpu,
      badge: 'Cognitive Computing',
      desc: 'Harness the power of machine learning and large language models to automate complex cognitive processes and gain unprecedented insights.',
      items: ['AI Agents', 'Generative AI', 'LLM Development', 'RAG Systems'],
      color: 'var(--color-royal)',
      details: 'Our AI solutions focus on agentic frameworks and Retrieval-Augmented Generation (RAG) that allow internal business data to safely fuel private LLMs. We build secure intelligence platforms compliant with global audit protocols.'
    },
    {
      id: 'cloud',
      title: 'Cloud Infrastructure',
      icon: Server,
      badge: 'Modern Architecture',
      desc: 'Migrate, optimize, and manage scalable multi-cloud architectures. We ensure highly resilient, secure deployments for enterprise scale.',
      items: ['AWS Integration', 'Azure Deployment', 'Google Cloud', 'DevOps & GitOps'],
      color: 'var(--color-cyan)',
      details: 'We specialize in zero-downtime migrations, hybrid cloud setup, infrastructure-as-code (Terraform), and Kubernetes orchestration. Our DevOps pipelines reduce deployment cycle times by up to 60%.'
    },
    {
      id: 'sec',
      title: 'Cyber Security',
      icon: Shield,
      badge: 'Zero Trust Security',
      desc: 'Protect your enterprise assets with absolute defense protocols, advanced penetration tests, and real-time active threat mitigation.',
      items: ['Threat Detection', 'Security Audits', 'Compliance Reporting', 'Continuous Monitoring'],
      color: 'var(--color-purple)',
      details: 'Implementing Zero Trust network access (ZTNA), SIEM logging, endpoint defense, and regulatory alignment (SOC 2, ISO 27001, HIPAA, GDPR). Our secure operations centers offer 24/7 scanning.'
    },
    {
      id: 'auto',
      title: 'Enterprise Automation',
      icon: Activity,
      badge: 'Process Acceleration',
      desc: 'Connect legacy structures with modern workflows. Eliminate operational bottlenecks through robotic process automation (RPA) and custom ERP/CRM integrations.',
      items: ['Workflow Automation', 'ERP Integration', 'CRM Solutions', 'Process Optimization'],
      color: '#4F46E5',
      details: 'Maximize resource efficiency through RPA pipelines, seamless Salesforce/SAP data syncs, and intelligent invoice/document processing bots that save thousands of manual hours annually.'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="services-header">
          <div className="badge">Services & Competencies</div>
          <h2 className="services-title">
            Enterprise Technology Portfolio
          </h2>
          <p className="services-sub">
            Leading engineering practices tailored to accelerate enterprise transformation. Our solutions scale seamlessly, ensuring continuous operation, ironclad security, and AI-driven growth.
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="services-grid">
          {services.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div 
                key={svc.id} 
                className="service-card shadow-md"
                onClick={() => setActiveDetail(activeDetail === svc.id ? null : svc.id)}
              >
                <div className="card-top-accent" style={{ backgroundColor: svc.color }}></div>
                
                <div className="service-icon-box" style={{ background: `rgba(15, 82, 186, 0.05)`, color: svc.color }}>
                  <IconComponent size={28} />
                </div>

                <div className="service-card-meta">
                  <span className="service-badge-cat" style={{ color: svc.color }}>{svc.badge}</span>
                  <h3 className="service-card-title">{svc.title}</h3>
                </div>

                <p className="service-card-desc">{svc.desc}</p>

                <ul className="service-items-list">
                  {svc.items.map((item, idx) => (
                    <li key={idx} className="service-item-bullet">
                      <CheckCircle2 size={14} className="bullet-check-icon" style={{ color: svc.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className="btn-card-action" 
                  style={{ color: svc.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetail(activeDetail === svc.id ? null : svc.id);
                  }}
                >
                  <span>{activeDetail === svc.id ? 'Close Details' : 'Deep Dive'}</span>
                  <ArrowRight size={14} className={`arrow-transition ${activeDetail === svc.id ? 'rotate-90' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Drawer (Shows additional text when card is clicked) */}
        {activeDetail && (
          <div className="detail-drawer shadow-premium">
            <div className="drawer-inner">
              <div className="drawer-accent" style={{ backgroundColor: services.find(s => s.id === activeDetail).color }}></div>
              <div className="drawer-body">
                <h4 className="drawer-title">
                  {services.find(s => s.id === activeDetail).title} - Architecture & Methodology
                </h4>
                <p className="drawer-text">
                  {services.find(s => s.id === activeDetail).details}
                </p>
                <div className="drawer-cta-row">
                  <span className="drawer-sla">ISO 9001 & 27001 Certified Delivery</span>
                  <a href="#contact" className="btn-drawer-quote">Request Technical Architecture Outline</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .services-section {
          background-color: var(--color-white);
          color: #1E293B; /* Sleek slate dark text for readability on white background */
          padding: 100px 24px;
        }

        .services-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .services-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-navy-dark);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .services-sub {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        /* Card Styling - Premium white design as specified */
        .service-card {
          background: var(--color-white-pure);
          border-radius: var(--border-radius-md);
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(7, 20, 38, 0.05);
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px rgba(7, 20, 38, 0.12);
        }

        .card-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .service-icon-box {
          width: 54px;
          height: 54px;
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .service-card-meta {
          margin-bottom: 14px;
        }

        .service-badge-cat {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .service-card-title {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin-top: 4px;
          font-weight: 700;
        }

        .service-card-desc {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .service-items-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 16px;
          margin-bottom: 24px;
        }

        .service-item-bullet {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #334155;
          font-weight: 500;
        }

        .bullet-check-icon {
          flex-shrink: 0;
        }

        .btn-card-action {
          background: none;
          border: none;
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          padding: 4px 0;
        }

        .arrow-transition {
          transition: transform var(--transition-fast);
        }
        
        .rotate-90 {
          transform: rotate(90deg);
        }

        /* Detail Drawer Animation */
        .detail-drawer {
          background: var(--color-navy);
          border: 1px solid rgba(0, 191, 255, 0.15);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          margin-top: 24px;
          color: var(--color-white-pure);
          animation: slideDown 0.3s ease-out;
        }

        .drawer-inner {
          display: flex;
        }

        .drawer-accent {
          width: 6px;
          flex-shrink: 0;
        }

        .drawer-body {
          padding: 24px 32px;
          flex-grow: 1;
        }

        .drawer-title {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .drawer-text {
          font-size: 0.95rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .drawer-cta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
        }

        .drawer-sla {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-cyan);
        }

        .btn-drawer-quote {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--color-white-pure);
          padding: 8px 18px;
          font-size: 0.8rem;
          border-radius: var(--border-radius-sm);
          font-weight: 600;
        }

        .btn-drawer-quote:hover {
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1199px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .drawer-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
