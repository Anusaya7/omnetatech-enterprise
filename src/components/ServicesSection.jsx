import { useState } from 'react';
import { 
  Code, Globe, Smartphone, Palette, Cloud, Bot, 
  Compass, ArrowRight, CheckCircle2, ChevronRight,
  Database, Cpu, Layers, ShoppingCart, Terminal, Server
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  Code, Globe, Smartphone, Palette, Cloud, Bot, Compass,
  Database, Cpu, Layers, ShoppingCart, Terminal, Server
};

export default function ServicesSection({ onSelectService }) {
  const { services: dynamicServices } = useCms();
  const [activeDetail, setActiveDetail] = useState(null);

  const defaultServices = [
    {
      id: 'software-dev',
      title: 'Software Development',
      icon: Code,
      category: 'Core Engineering',
      desc: 'Engineered backend systems, custom web software, and secure APIs designed to handle complex business operations efficiently.',
      points: [
        'Custom Web Applications',
        'Business Software Solutions',
        'API Development & Integration',
        'Backend Systems & Microservices',
        'Database Architecture & Optimization'
      ],
      details: 'We build custom business software tailored to your specific organizational workflows. Our development focus emphasizes clean architecture, database efficiency, secure endpoints, and maintainability for long-term scalability.'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      icon: Globe,
      category: 'Digital Presence',
      desc: 'Modern, high-speed, and responsive business websites crafted to establish trust and convert visitors into active inquiries.',
      points: [
        'Business & Corporate Websites',
        'Responsive Web Applications',
        'Custom E-commerce Solutions',
        'Content Management Platforms',
        'Website Maintenance & Speed Optimization'
      ],
      details: 'From corporate brand websites to dynamic client portals, we build fast, SEO-friendly, and mobile-responsive web platforms using modern web standards that represent your brand with technical authority.'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      icon: Smartphone,
      category: 'Application Engineering',
      desc: 'Intuitive native and cross-platform mobile apps for Android and iOS that provide smooth performance and delightful user experience.',
      points: [
        'Android Applications',
        'iOS Applications',
        'Cross-Platform Development (Flutter/React Native)',
        'Mobile API Integration',
        'App Maintenance & Store Publishing'
      ],
      details: 'We design and develop mobile applications that deliver consistent experiences across diverse devices. We handle state management, offline-first caching, push notifications, and secure backend synchronization.'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: Palette,
      category: 'Product Design',
      desc: 'User-centered interfaces that balance visual elegance, brand consistency, and frictionless user journeys across screens.',
      points: [
        'Website & Portal UI Design',
        'Application & Dashboard UI',
        'User Experience & Wireframing',
        'Responsive Layout Systems',
        'Design Systems & Component Libraries'
      ],
      details: 'Great software starts with clear design. We map out user personas, wireframes, interactive prototypes, and production design systems to ensure users complete their goals without confusion.'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      icon: Cloud,
      category: 'Infrastructure',
      desc: 'Reliable cloud environments, automated deployment pipelines, and proactive server configuration for maximum uptime.',
      points: [
        'Cloud Deployment & Hosting',
        'CI/CD Automated Pipelines',
        'Server Configuration & Management',
        'Performance & Load Optimization',
        'Backup & Disaster Recovery Planning'
      ],
      details: 'We help businesses set up, manage, and scale cloud environments across standard cloud providers. Our automated pipelines reduce manual deployment errors and ensure your applications run reliably.'
    },
    {
      id: 'automation-ai',
      title: 'Automation & AI',
      icon: Bot,
      category: 'Process Intelligence',
      desc: 'Practical automation workflows and intelligent tools that eliminate repetitive tasks and accelerate business turnaround.',
      points: [
        'Business Process Automation',
        'AI-Powered Practical Features',
        'Workflow & Notification Automation',
        'Third-Party API Automation',
        'Intelligent Business Tools'
      ],
      details: 'We integrate practical AI capabilities and workflow automations into existing operations—such as document processing, data extraction, and CRM updates—saving valuable team hours and reducing operational friction.'
    },
    {
      id: 'it-consulting',
      title: 'IT Consulting',
      icon: Compass,
      category: 'Technology Advisory',
      desc: 'Strategic guidance on technology selection, technical feasibility, architecture planning, and digital modernization roadmaps.',
      points: [
        'Technology Stack Consulting',
        'System Architecture Planning',
        'Product Development Strategy',
        'Code & Infrastructure Technical Audits',
        'Digital Transformation Roadmaps'
      ],
      details: 'Whether you are planning a new software product or revamping legacy systems, our consulting services help you make informed architectural decisions, avoid costly technical debt, and plan realistic timelines.'
    }
  ];

  const services = dynamicServices && dynamicServices.length > 0
    ? dynamicServices.map(s => ({
        id: s.slug || s.id,
        title: s.title,
        icon: iconMap[s.icon] || Code,
        category: s.category || 'Technology Services',
        desc: s.shortDescription || s.description || '',
        points: Array.isArray(s.features) ? s.features : [],
        details: s.description || s.shortDescription || ''
      }))
    : defaultServices;

  const handleConsultService = (svcTitle) => {
    setActiveDetail(null);
    if (onSelectService) {
      onSelectService(svcTitle);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="services-root section section-light">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">Our Capabilities</div>
          <h2 className="section-title">Technology Services Designed for Growth</h2>
          <p className="section-subtitle">
            From custom software development to cloud infrastructure and workflow automation, OmNetaTech provides end-to-end technology services tailored to your operational requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((svc) => {
            const Icon = svc.icon;
            const isExpanded = activeDetail === svc.id;

            return (
              <div 
                key={svc.id} 
                className={`service-card ${isExpanded ? 'card-active-border' : ''}`}
              >
                <div className="service-top-meta">
                  <div className="service-icon-container">
                    <Icon size={22} />
                  </div>
                  <span className="service-category-tag">{svc.category}</span>
                </div>

                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-desc">{svc.desc}</p>

                {/* Service Bullet Points */}
                <div className="service-points-area">
                  <div className="points-label">Key Capabilities:</div>
                  <ul className="service-points-list">
                    {svc.points.map((pt, idx) => (
                      <li key={idx} className="service-point-item">
                        <CheckCircle2 size={14} className="point-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="service-card-footer">
                  <button 
                    className="service-learn-more-btn"
                    onClick={() => setActiveDetail(isExpanded ? null : svc.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Learn More'}</span>
                    <ChevronRight size={15} className={`chevron-transition ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <button 
                    className="service-enquire-link"
                    onClick={() => handleConsultService(svc.title)}
                  >
                    Discuss Needs →
                  </button>
                </div>

                {/* Inline Accordion Details */}
                {isExpanded && (
                  <div className="service-detail-drawer animate-fade-in">
                    <div className="detail-drawer-content">
                      <p>{svc.details}</p>
                      <button 
                        className="btn-primary-blue drawer-cta-btn"
                        onClick={() => handleConsultService(svc.title)}
                      >
                        <span>Request Consultation for {svc.title}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .services-root {
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* Modern Corporate Service Card */
        .service-card {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                      border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: #CBD5E1;
          box-shadow: 0 12px 28px rgba(11, 31, 58, 0.08);
        }

        .card-active-border {
          border-color: var(--color-primary-blue) !important;
          box-shadow: 0 12px 28px rgba(23, 105, 224, 0.12) !important;
        }

        .service-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .service-icon-container {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .service-card:hover .service-icon-container {
          background-color: var(--color-primary-blue);
          color: var(--color-white);
        }

        .service-category-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          background: #F1F5F9;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .service-card-title {
          font-size: 1.25rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .service-card-desc {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        /* Bullet Points */
        .service-points-area {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--color-border);
          margin-bottom: 18px;
        }

        .points-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .service-points-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .service-point-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          color: #2D3748;
          line-height: 1.45;
        }

        .point-icon {
          color: var(--color-primary-blue);
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Footer inside card */
        .service-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--color-border);
          font-size: 0.84rem;
        }

        .service-learn-more-btn {
          background: none;
          border: none;
          color: var(--color-primary-blue);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 4px 0;
          transition: gap 0.2s ease;
        }

        .service-learn-more-btn:hover {
          gap: 8px;
        }

        .chevron-transition {
          transition: transform var(--transition-fast);
        }

        .rotate-90 {
          transform: rotate(90deg);
        }

        .service-enquire-link {
          background: none;
          border: none;
          color: var(--color-primary-blue);
          font-weight: 600;
          cursor: pointer;
          padding: 4px 0;
          transition: transform var(--transition-fast);
        }

        .service-enquire-link:hover {
          transform: translateX(3px);
          text-decoration: underline;
        }

        /* Drawer Details */
        .service-detail-drawer {
          margin-top: 16px;
          padding: 16px;
          background: #F8FAFD;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(23, 105, 224, 0.15);
        }

        .detail-drawer-content p {
          font-size: 0.84rem;
          color: var(--color-text);
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .drawer-cta-btn {
          width: 100%;
          padding: 9px 14px;
          font-size: 0.82rem;
        }

        @media (max-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 720px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .service-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
