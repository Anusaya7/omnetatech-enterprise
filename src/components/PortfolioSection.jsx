import { useState } from 'react';
import { 
  Code, ShoppingBag, Smartphone, Cpu, Database, 
  ArrowRight, X, CheckCircle2, Globe, Layers, Cloud, Bot
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  Code, ShoppingBag, Smartphone, Cpu, Database,
  Globe, Layers, Cloud, Bot
};

export default function PortfolioSection({ openConsultationModal }) {
  const { portfolio: dynamicPortfolio } = useCms();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Solutions' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'automation', label: 'Automation' }
  ];

  const defaultProjects = [
    {
      id: 1,
      tag: 'web',
      badge: 'Sample Project',
      title: 'Business Management Platform',
      category: 'Web Application',
      icon: Database,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      summary: 'Centralized operations dashboard unifying client tracking, project milestones, and invoicing in one secure web portal.',
      challenge: 'The business was struggling with disconnected spreadsheets, misplaced client communication, and delayed billing reconciliations.',
      approach: 'Engineered a modular web application with role-based access, automated PDF invoice generation, and real-time operational status updates.',
      deliverables: [
        'Secure role-based dashboard for team and managers',
        'Automated billing and invoice generation',
        'Client task and milestone tracking module',
        'Database optimization for fast search and filtering'
      ]
    },
    {
      id: 2,
      tag: 'ecommerce',
      badge: 'Sample Project',
      title: 'E-commerce Retail Website',
      category: 'Digital Storefront',
      icon: ShoppingBag,
      techStack: ['Next.js', 'Node.js', 'Razorpay', 'MongoDB'],
      summary: 'Modern, high-speed online shopping experience with seamless checkout, product catalogs, and inventory synchronization.',
      challenge: 'Existing online store experienced slow loading speeds on mobile devices and high checkout drop-off rates.',
      approach: 'Built a lightweight, responsive storefront with streamlined one-page checkout, Indian payment gateway integration, and automated order confirmation emails.',
      deliverables: [
        'Mobile-first responsive product catalog',
        'Payment gateway integration (UPI, Cards, NetBanking)',
        'Admin inventory and order dispatch panel',
        'Automated customer order status notifications'
      ]
    },
    {
      id: 3,
      tag: 'web',
      badge: 'Selected Solution',
      title: 'Service Booking & Inquiry Portal',
      category: 'Custom Web Application',
      icon: Code,
      techStack: ['React', 'Express.js', 'PostgreSQL', 'Redis'],
      summary: 'Automated booking workflow allowing customers to select services, pick available slots, and receive instant confirmations.',
      challenge: 'Handling appointments manually via phone calls led to double bookings, customer wait times, and staff scheduling errors.',
      approach: 'Created an intuitive booking portal with real-time calendar availability, automated reminder notifications, and an admin schedule overview.',
      deliverables: [
        'Interactive real-time calendar picker',
        'Automated email and SMS confirmation triggers',
        'Staff availability management dashboard',
        'Customer inquiry intake and follow-up tracker'
      ]
    },
    {
      id: 4,
      tag: 'mobile',
      badge: 'Selected Solution',
      title: 'Customer & Operations Mobile App',
      category: 'Cross-Platform Mobile Application',
      icon: Smartphone,
      techStack: ['React Native', 'Node.js', 'Firebase', 'REST API'],
      summary: 'Cross-platform Android and iOS application enabling on-the-go account management and real-time service tracking.',
      challenge: 'Field staff and end users required reliable access to project information without needing a desktop computer.',
      approach: 'Developed a cross-platform mobile application using modern frameworks, implementing offline caching and real-time cloud data sync.',
      deliverables: [
        'Cross-platform Android and iOS deployment',
        'Offline-first local caching mechanism',
        'Push notifications for critical status updates',
        'Intuitive touch-optimized user interface'
      ]
    },
    {
      id: 5,
      tag: 'automation',
      badge: 'Sample Project',
      title: 'Business Workflow Automation Pipeline',
      category: 'Automation Platform',
      icon: Cpu,
      techStack: ['Python', 'Node.js', 'Docker', 'Webhooks'],
      summary: 'Integrated data pipeline synchronizing incoming website inquiries directly with team communication channels and databases.',
      challenge: 'Valuable customer inquiries were sitting in mailboxes for hours before team members noticed and manually responded.',
      approach: 'Configured automated API webhooks linking contact forms, lead databases, and instant notifications to alert the team immediately.',
      deliverables: [
        'Instant multi-channel notifications on new lead arrival',
        'Centralized lead capture and deduplication',
        'Automated acknowledgement emails to clients',
        'Daily operational summary digests'
      ]
    }
  ];

  const projects = dynamicPortfolio && dynamicPortfolio.length > 0
    ? dynamicPortfolio.map(p => ({
        id: p.id,
        tag: p.tag || 'web',
        badge: p.badge || 'Sample Project',
        title: p.title,
        category: p.category || 'Technology Solution',
        icon: iconMap[p.icon] || Code,
        techStack: Array.isArray(p.techStack) && p.techStack.length > 0 ? p.techStack : ['React', 'Node.js', 'Cloud', 'SQL'],
        summary: p.summary || '',
        challenge: p.challenge || '',
        approach: p.approach || '',
        deliverables: Array.isArray(p.deliverables) ? p.deliverables : []
      }))
    : defaultProjects;

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.tag === selectedFilter);

  return (
    <section id="portfolio" className="portfolio-root section section-white">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="badge">Our Work</div>
          <h2 className="section-title">Selected Work & Solutions</h2>
          <p className="section-subtitle">
            Explore sample projects and technical architectures demonstrating how OmNetaTech builds practical, dependable digital solutions for businesses.
          </p>

          {/* Filter Pills */}
          <div className="portfolio-filter-bar">
            {filters.map(f => (
              <button
                key={f.id}
                className={`filter-pill-btn ${selectedFilter === f.id ? 'active-filter' : ''}`}
                onClick={() => setSelectedFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div 
                key={proj.id} 
                className="project-card shadow-sm"
                onClick={() => setActiveProject(proj)}
              >
                <div className="project-card-header">
                  <div className="project-icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="project-badge-type">{proj.badge}</span>
                </div>

                <div className="project-category-sub">{proj.category}</div>
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-summary">{proj.summary}</p>

                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="project-tech-pills">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                )}

                <div className="project-deliverables-mini">
                  <div className="mini-deliverables-title">Key Components:</div>
                  <ul className="mini-deliverables-list">
                    {proj.deliverables.slice(0, 3).map((item, i) => (
                      <li key={i} className="mini-item">
                        <CheckCircle2 size={13} className="mini-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-card-action">
                  <span>View Project Details</span>
                  <ArrowRight size={14} className="arrow-transition" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        {activeProject && (
          <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}>
            <div className="project-modal-content shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top-bar">
                <div className="modal-badge-row">
                  <span className="project-badge-type">{activeProject.badge}</span>
                  <span className="modal-cat-text">{activeProject.category}</span>
                </div>
                <button 
                  className="modal-close-icon"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-body">
                <h3 className="modal-project-title">{activeProject.title}</h3>
                <p className="modal-project-summary">{activeProject.summary}</p>

                {activeProject.techStack && activeProject.techStack.length > 0 && (
                  <div className="modal-tech-stack-row">
                    <span className="modal-tech-stack-label">Technology Stack:</span>
                    <div className="modal-tech-pills">
                      {activeProject.techStack.map((tech, i) => (
                        <span key={i} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-challenge-solution-grid">
                  <div className="modal-block">
                    <h4 className="modal-block-heading">Business Challenge:</h4>
                    <p className="modal-block-text">{activeProject.challenge}</p>
                  </div>

                  <div className="modal-block">
                    <h4 className="modal-block-heading">Our Engineering Approach:</h4>
                    <p className="modal-block-text">{activeProject.approach}</p>
                  </div>
                </div>

                <div className="modal-deliverables-section">
                  <h4 className="modal-block-heading">Architecture & Features Delivered:</h4>
                  <ul className="modal-full-list">
                    {activeProject.deliverables.map((item, idx) => (
                      <li key={idx} className="modal-list-item">
                        <CheckCircle2 size={16} className="modal-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-action-bar">
                  <button 
                    className="btn-primary-blue"
                    onClick={() => {
                      setActiveProject(null);
                      openConsultationModal();
                    }}
                  >
                    <span>Discuss Similar Solution for Your Business</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    className="btn-secondary-outline"
                    onClick={() => setActiveProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .portfolio-root {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
        }

        .portfolio-filter-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }

        .filter-pill-btn {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-pill-btn:hover {
          color: var(--color-primary-navy);
          border-color: #CBD5E1;
        }

        .active-filter {
          background-color: var(--color-primary-blue) !important;
          color: var(--color-white) !important;
          border-color: var(--color-primary-blue) !important;
          box-shadow: 0 2px 8px rgba(23, 105, 224, 0.2);
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .project-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .project-card:hover {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .project-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .project-card:hover .project-icon-box {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .project-badge-type {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          background: var(--color-light-blue);
          border: 1px solid rgba(23, 105, 224, 0.15);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .project-category-sub {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }

        .project-card-title {
          font-size: 1.25rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .project-card-summary {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .project-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .tech-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          background: #F1F5F9;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          padding: 3px 8px;
          line-height: 1.3;
        }

        .project-deliverables-mini {
          border-top: 1px solid var(--color-border);
          padding-top: 14px;
          margin-top: auto;
          margin-bottom: 18px;
        }

        .mini-deliverables-title {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .mini-deliverables-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mini-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--color-text);
          line-height: 1.4;
        }

        .mini-check {
          color: var(--color-primary-blue);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .project-card-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          border-top: 1px solid var(--color-border);
          padding-top: 14px;
        }

        .arrow-transition {
          transition: transform var(--transition-fast);
        }

        .project-card:hover .arrow-transition {
          transform: translateX(4px);
        }

        /* Modal */
        .project-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 31, 58, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 2000;
        }

        .project-modal-content {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          max-width: 720px;
          width: 100%;
          border: 1px solid var(--color-border);
          overflow: hidden;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 28px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-cat-text {
          font-size: 0.82rem;
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        .modal-close-icon {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .modal-close-icon:hover {
          color: var(--color-primary-navy);
        }

        .modal-content-body {
          padding: 28px;
        }

        .modal-project-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .modal-project-summary {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .modal-tech-stack-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-tech-stack-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .modal-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .modal-challenge-solution-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          background: var(--color-bg);
          padding: 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          margin-bottom: 24px;
        }

        .modal-block-heading {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .modal-block-text {
          font-size: 0.86rem;
          color: var(--color-text);
          line-height: 1.6;
        }

        .modal-full-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
          margin-bottom: 28px;
        }

        .modal-list-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-text);
          line-height: 1.45;
        }

        .modal-check-icon {
          color: var(--color-success);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .modal-action-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid var(--color-border);
          padding-top: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .modal-challenge-solution-grid,
          .modal-full-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
