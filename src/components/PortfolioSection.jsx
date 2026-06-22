import { useState } from 'react';
import { ArrowRight, Cpu, Server, ShieldCheck, Activity, X } from 'lucide-react';

export default function PortfolioSection() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'cloud', label: 'Cloud Systems' },
    { id: 'sec', label: 'Cybersecurity' },
    { id: 'auto', label: 'Automation' }
  ];

  const projects = [
    {
      id: 1,
      tag: 'ai',
      title: 'AI-Driven Support Engine',
      client: 'Global Logistics Corp',
      metric: '88% Auto-Resolution Rate',
      metricLabel: 'Customer tickets closed instantly',
      icon: Cpu,
      summary: 'Architecting a state-of-the-art conversational AI agent system powered by deep RAG to ingest internal service databases and resolve queries.',
      challenge: 'The client was processing over 45,000 service requests daily with high operational costs and average response times exceeding 6 hours.',
      approach: 'We developed a multi-agent orchestration framework connected to a private vector store database. We fine-tuned open-source models with specific industry-compliant vocabulary.',
      result: 'Average resolution times dropped to under 90 seconds. Scaled agent infrastructure to support 15 languages, saving ₹35 Crore annually in labor costs.',
      color: 'var(--color-royal)'
    },
    {
      id: 2,
      tag: 'auto',
      title: 'Enterprise ERP Automation',
      client: 'Apex Industrial Manufacturing',
      metric: '4x Logistics Throughput',
      metricLabel: 'Supply chain pipelines accelerated',
      icon: Activity,
      summary: 'Connecting legacy databases with intelligent SAP/Salesforce integrations, eliminating 12,000 monthly manual entry points.',
      challenge: 'Siloed database records led to errors in order assembly, delayed tracking notifications, and significant inventory reporting drift.',
      approach: 'Implemented custom RESTful data adapters linking inventory sensors with the core SAP database and built process automation bots to sync client CRM schedules.',
      result: 'Achieved 99.9% inventory reporting alignment. Eliminated order verification delays, reducing typical factory shipping cycles from 4 days to 18 hours.',
      color: '#4F46E5'
    },
    {
      id: 3,
      tag: 'cloud',
      title: 'Global Cloud Modernization',
      client: 'Nova Payments & Fintech',
      metric: '35% Infrastructure Savings',
      metricLabel: 'Cloud operations overhead cut',
      icon: Server,
      summary: 'Migrating a monolithic payment engine into a highly resilient multi-cloud architecture utilizing Kubernetes and secure cloud orchestration.',
      challenge: 'High maintenance costs and severe scaling restrictions during seasonal payment traffic peaks resulted in occasional transaction losses.',
      approach: 'Containerized the core API services, built auto-scaling Kubernetes nodes across AWS and Azure, and deployed Terraform scripts for multi-region backup systems.',
      result: 'System capability scaled to handle 24,000 transactions/second (a 300% capacity increase) with zero recorded core service degradation.',
      color: 'var(--color-cyan)'
    },
    {
      id: 4,
      tag: 'sec',
      title: 'Zero Trust Cybersecurity',
      client: 'OmniHealth Medical Network',
      metric: 'Zero Breaches In 24 Months',
      metricLabel: 'Continuous network security status',
      icon: ShieldCheck,
      summary: 'Designing a zero-trust network access model (ZTNA) combined with endpoint threat mitigation across 12,000 hospital terminals.',
      challenge: 'Frequent security vulnerabilities, phishing incidents, and legacy Active Directory setups put critical HIPAA-regulated healthcare databases at risk.',
      approach: 'Deployed identity protection protocols, established continuous network segment access verification, and launched an automated threat auditing console.',
      result: 'Identified and isolated 4,800 phishing and script execution threats immediately at the gateway level. Achieved 100% HIPAA and SOC 2 audits.',
      color: 'var(--color-purple)'
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.tag === selectedFilter);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="world-map-bg"></div>
      <div className="container">
        
        {/* Section Header */}
        <div className="portfolio-header">
          <div className="badge">Success Stories</div>
          <h2 className="portfolio-title">Enterprise Case Studies</h2>
          <p className="portfolio-sub">
            Realizing massive scale, ironclad security, and cost reductions. Explore details on our key customer transformations.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs-row">
            {filters.map(f => (
              <button 
                key={f.id}
                className={`filter-tab-btn ${selectedFilter === f.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((proj) => {
            const IconComponent = proj.icon;
            return (
              <div 
                key={proj.id} 
                className="project-card shadow-md"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="project-accent-bar" style={{ backgroundColor: proj.color }}></div>
                
                <div className="project-body">
                  <div className="project-meta-top">
                    <span className="project-client-name">{proj.client}</span>
                    <div className="project-icon-box" style={{ color: proj.color }}>
                      <IconComponent size={20} />
                    </div>
                  </div>

                  <h3 className="project-title-h3">{proj.title}</h3>
                  <p className="project-desc-p">{proj.summary}</p>
                  
                  {/* Highlighting specific metric */}
                  <div className="project-metric-block" style={{ borderLeft: `3px solid ${proj.color}`, background: 'rgba(255, 255, 255, 0.02)' }}>
                    <div className="project-metric-value" style={{ color: proj.color }}>{proj.metric}</div>
                    <div className="project-metric-label">{proj.metricLabel}</div>
                  </div>

                  <div className="project-card-action">
                    <span>View Architectural Details</span>
                    <ArrowRight size={16} className="arrow-project" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Case Study Details Modal */}
        {selectedProject && (
          <div className="case-study-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="case-study-modal-body shadow-premium" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-accent-top" style={{ backgroundColor: selectedProject.color }}></div>

              <div className="modal-main-content">
                <div className="modal-header-section">
                  <span className="modal-client-label">{selectedProject.client}</span>
                  <h3 className="modal-title-h3">{selectedProject.title}</h3>
                </div>

                {/* Grid for case study details */}
                <div className="modal-detail-grid">
                  <div className="modal-text-col">
                    <div className="modal-text-block">
                      <h4 className="modal-block-title">The Challenge</h4>
                      <p className="modal-block-text">{selectedProject.challenge}</p>
                    </div>

                    <div className="modal-text-block">
                      <h4 className="modal-block-title">Our Technical Approach</h4>
                      <p className="modal-block-text">{selectedProject.approach}</p>
                    </div>

                    <div className="modal-text-block">
                      <h4 className="modal-block-title">Business Outcomes</h4>
                      <p className="modal-block-text">{selectedProject.result}</p>
                    </div>
                  </div>

                  <div className="modal-metric-col" style={{ background: 'rgba(7, 20, 38, 0.4)' }}>
                    <div className="modal-icon-header" style={{ color: selectedProject.color }}>
                      <selectedProject.icon size={48} />
                    </div>
                    <div className="large-outcome-value" style={{ color: selectedProject.color }}>
                      {selectedProject.metric}
                    </div>
                    <p className="large-outcome-desc">
                      {selectedProject.metricLabel}
                    </p>
                    <div className="sla-guarantee">
                      ✓ Zero Security Incidents Recorded<br />
                      ✓ Full Knowledge Transfer Completed
                    </div>
                    <button 
                      className="btn-modal-enquire" 
                      onClick={() => {
                        setSelectedProject(null);
                        setTimeout(() => {
                          const contactSec = document.getElementById('contact');
                          if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                    >
                      Inquire About This Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .portfolio-section {
          background-color: var(--color-navy-dark);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .portfolio-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .portfolio-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-white-pure);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .portfolio-sub {
          font-size: 1.05rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Filter Tab Row */
        .filter-tabs-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 6px;
          border-radius: var(--border-radius-md);
        }

        .filter-tab-btn {
          background: none;
          border: none;
          color: var(--color-gray-dark);
          padding: 8px 18px;
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: var(--border-radius-sm);
          transition: var(--transition-fast);
        }

        .filter-tab-btn:hover, .filter-tab-btn.active {
          color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.1);
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        /* Case study card layout */
        .project-card {
          background: rgba(13, 34, 60, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .project-accent-bar {
          height: 5px;
          width: 100%;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 191, 255, 0.2);
          box-shadow: var(--shadow-lg);
          background: rgba(13, 34, 60, 0.55);
        }

        .project-body {
          padding: 36px;
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 1;
        }

        .project-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .project-client-name {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .project-icon-box {
          background: rgba(255, 255, 255, 0.03);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-title-h3 {
          font-size: 1.4rem;
          color: var(--color-white-pure);
          margin-bottom: 12px;
          font-weight: 700;
        }

        .project-desc-p {
          font-size: 0.9rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        /* Metric Block inside Card */
        .project-metric-block {
          padding: 16px 20px;
          border-radius: var(--border-radius-sm);
          margin-bottom: 24px;
          margin-top: auto;
        }

        .project-metric-value {
          font-family: var(--font-title);
          font-size: 1.5rem;
          font-weight: 800;
        }

        .project-metric-label {
          font-size: 0.75rem;
          color: var(--color-gray-dark);
          margin-top: 2px;
        }

        .project-card-action {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-white-pure);
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .project-card:hover .project-card-action {
          color: var(--color-cyan);
        }

        .arrow-project {
          transition: transform var(--transition-fast);
        }

        .project-card:hover .arrow-project {
          transform: translateX(4px);
        }

        /* Modal styling */
        .case-study-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3, 10, 20, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 2000;
        }

        .case-study-modal-body {
          background: var(--color-navy);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: var(--border-radius-lg);
          max-width: 900px;
          width: 100%;
          position: relative;
          overflow: hidden;
          animation: modalAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: var(--color-gray-dark);
          cursor: pointer;
          transition: var(--transition-fast);
          z-index: 10;
        }

        .modal-close-btn:hover {
          color: var(--color-white-pure);
        }

        .modal-accent-top {
          height: 6px;
        }

        .modal-main-content {
          padding: 48px;
        }

        .modal-header-section {
          margin-bottom: 32px;
        }

        .modal-client-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .modal-title-h3 {
          font-size: 2rem;
          color: var(--color-white-pure);
          font-weight: 800;
          margin-top: 6px;
        }

        .modal-detail-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }

        .modal-text-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .modal-block-title {
          font-family: var(--font-title);
          font-size: 1.05rem;
          color: var(--color-cyan);
          margin-bottom: 8px;
          font-weight: 700;
        }

        .modal-block-text {
          font-size: 0.95rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        .modal-metric-col {
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .modal-icon-header {
          margin-bottom: 16px;
        }

        .large-outcome-value {
          font-family: var(--font-title);
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .large-outcome-desc {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          margin-bottom: 24px;
        }

        .sla-guarantee {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #10B981;
          line-height: 1.8;
          text-align: left;
          margin-bottom: 32px;
          width: 100%;
        }

        .btn-modal-enquire {
          width: 100%;
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 12px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-modal-enquire:hover {
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
          transform: translateY(-2px);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 991px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          .modal-detail-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .modal-main-content {
            padding: 30px;
          }
        }
      `}</style>
    </section>
  );
}
