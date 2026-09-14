import { useState } from 'react';
import { 
  Globe, Database, Cpu, Layers, ShoppingCart, 
  Cloud, Bot, ArrowRight, AlertCircle, CheckCircle, TrendingUp,
  Code, Smartphone, Palette, Compass, Building2, Factory, HeartPulse 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  Globe, Database, Cpu, Layers, ShoppingCart,
  Cloud, Bot, Code, Smartphone, Palette, Compass,
  Building2, Factory, HeartPulse
};

export default function SolutionsSection({ openConsultationModal }) {
  const { solutions: dynamicSolutions } = useCms();
  const [selectedSolution, setSelectedSolution] = useState(0);

  const defaultSolutions = [
    {
      id: 'website',
      title: 'Business Website Solutions',
      icon: Globe,
      tagline: 'Transforming digital presence into reliable lead pipelines',
      problem: 'Businesses frequently suffer from slow, outdated websites that fail to establish credibility or convert visitors into inquiries.',
      solution: 'We build modern, ultra-responsive corporate websites with clean messaging, mobile speed optimization, and clear call-to-actions.',
      benefit: 'Increased inbound inquiries, professional digital brand authority, and seamless viewing across mobile and desktop devices.'
    },
    {
      id: 'software',
      title: 'Custom Software Solutions',
      icon: Database,
      tagline: 'Tailored systems built around your operational workflows',
      problem: 'Generic off-the-shelf software rarely fits specific operational workflows, forcing teams to rely on clumsy spreadsheets.',
      solution: 'We develop bespoke web applications, internal dashboards, and database tools specifically mapped to your day-to-day operations.',
      benefit: 'Elimination of manual errors, faster team coordination, centralized data access, and full ownership of your technology.'
    },
    {
      id: 'automation',
      title: 'Automation Solutions',
      icon: Cpu,
      tagline: 'Eliminating repetitive manual bottlenecks across tools',
      problem: 'Valuable employee hours are wasted copying data between software, sending manual follow-ups, and compiling routine reports.',
      solution: 'We build automated pipelines connecting your emails, forms, databases, and third-party tools to trigger actions automatically.',
      benefit: 'Drastic reduction in repetitive manual tasks, faster customer response times, and higher employee productivity.'
    },
    {
      id: 'product-dev',
      title: 'Digital Product Development',
      icon: Layers,
      tagline: 'From initial concept to production-ready digital products',
      problem: 'Startups and SMEs often struggle to turn software ideas into functional, reliable products without escalating development costs.',
      solution: 'We guide digital products through structured prototyping, MVP engineering, user testing, and scalable cloud deployment.',
      benefit: 'Clear milestones, predictable development velocity, and a well-architected software foundation ready for user growth.'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      icon: ShoppingCart,
      tagline: 'Fast and secure digital commerce platforms',
      problem: 'Online stores often struggle with clunky checkout flows, inventory mismatches, and poor performance during customer traffic spikes.',
      solution: 'We build custom, fast e-commerce platforms with streamlined payment gateways, catalog management, and automated order notifications.',
      benefit: 'Higher checkout completion rates, smooth customer purchasing experience, and simplified product administration.'
    },
    {
      id: 'cloud',
      title: 'Cloud & Infrastructure Solutions',
      icon: Cloud,
      tagline: 'Dependable hosting and cloud architectures',
      problem: 'Unmanaged servers lead to unexpected downtime, slow load times, data loss vulnerabilities, and security concerns.',
      solution: 'We set up secure cloud hosting environments with automated backups, monitoring, and performance tuning.',
      benefit: 'Reliable application availability, peace of mind regarding data safety, and infrastructure that scales as your traffic expands.'
    },
    {
      id: 'ai',
      title: 'AI-Powered Business Solutions',
      icon: Bot,
      tagline: 'Practical AI implementations delivering tangible value',
      problem: 'Organizations want to leverage modern AI but struggle to identify realistic applications that actually assist their business operations.',
      solution: 'We implement targeted AI features such as intelligent document parsing, smart search across internal files, and automated chat assistance.',
      benefit: 'Faster information retrieval, automated first-line customer responses, and intelligent insights from your company data.'
    }
  ];

  const solutions = dynamicSolutions && dynamicSolutions.length > 0
    ? dynamicSolutions.map(s => ({
        id: s.slug || s.id,
        title: s.title,
        icon: iconMap[s.icon] || Layers,
        tagline: s.tagline || '',
        problem: s.problem || '',
        solution: s.solution || '',
        benefit: s.benefit || ''
      }))
    : defaultSolutions;

  return (
    <section id="solutions" className="solutions-root section section-white">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="badge">Problem-Solving Architecture</div>
          <h2 className="section-title">Business-Focused Solutions</h2>
          <p className="section-subtitle">
            We solve real business challenges with practical technology. Every solution is designed around clear business outcomes: reducing friction, improving customer experience, and driving operational efficiency.
          </p>
        </div>

        {/* Desktop Interactive Layout / Mobile Cards */}
        <div className="solutions-container-layout">
          
          {/* Left Navigation Selector */}
          <div className="solutions-nav-list">
            {solutions.map((sol, index) => {
              const Icon = sol.icon;
              const isActive = selectedSolution === index;
              return (
                <button
                  key={sol.id}
                  className={`solution-nav-btn ${isActive ? 'active-sol-btn' : ''}`}
                  onClick={() => setSelectedSolution(index)}
                >
                  <div className="sol-nav-icon">
                    <Icon size={18} />
                  </div>
                  <div className="sol-nav-text">
                    <div className="sol-nav-title">{sol.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Solution Detail Card */}
          <div className="solution-detail-panel shadow-md">
            {(() => {
              const active = solutions[selectedSolution];
              const Icon = active.icon;
              return (
                <div className="detail-panel-inner animate-fade-in" key={active.id}>
                  <div className="detail-header-row">
                    <div className="detail-icon-box">
                      <Icon size={26} />
                    </div>
                    <div>
                      <h3 className="detail-solution-title">{active.title}</h3>
                      <div className="detail-solution-tagline">{active.tagline}</div>
                    </div>
                  </div>

                  {/* Problem -> Solution -> Benefit Flow */}
                  <div className="triad-flow-grid">
                    
                    {/* Problem */}
                    <div className="triad-card triad-problem">
                      <div className="triad-card-header">
                        <AlertCircle size={16} className="triad-icon-problem" />
                        <span>The Business Challenge</span>
                      </div>
                      <p className="triad-card-desc">{active.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="triad-card triad-solution">
                      <div className="triad-card-header">
                        <CheckCircle size={16} className="triad-icon-solution" />
                        <span>Our Technology Solution</span>
                      </div>
                      <p className="triad-card-desc">{active.solution}</p>
                    </div>

                    {/* Benefit */}
                    <div className="triad-card triad-benefit">
                      <div className="triad-card-header">
                        <TrendingUp size={16} className="triad-icon-benefit" />
                        <span>The Measurable Benefit</span>
                      </div>
                      <p className="triad-card-desc">{active.benefit}</p>
                    </div>

                  </div>

                  {/* CTA Footer */}
                  <div className="detail-panel-footer">
                    <button 
                      className="btn-primary-blue"
                      onClick={openConsultationModal}
                    >
                      <span>Discuss Your Requirements</span>
                      <ArrowRight size={16} />
                    </button>
                    <span className="panel-footer-note">Tailored scoping & realistic delivery estimates.</span>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>

      <style>{`
        .solutions-root {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
        }

        .solutions-container-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 32px;
          align-items: flex-start;
        }

        /* Left Navigation List */
        .solutions-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--color-bg);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .solution-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          background: none;
          border: 1px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .solution-nav-btn:hover {
          background-color: var(--color-white);
          border-color: var(--color-border);
        }

        .active-sol-btn {
          background-color: var(--color-white) !important;
          border-color: rgba(23, 105, 224, 0.25) !important;
          box-shadow: var(--shadow-sm);
        }

        .sol-nav-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-xs);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .active-sol-btn .sol-nav-icon {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .sol-nav-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          line-height: 1.3;
        }

        /* Right Detail Panel */
        .solution-detail-panel {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 36px;
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }

        .detail-panel-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 1;
        }

        .detail-header-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 28px;
        }

        .detail-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-solution-title {
          font-size: 1.45rem;
          color: var(--color-primary-navy);
          font-weight: 800;
        }

        .detail-solution-tagline {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          margin-top: 3px;
        }

        /* Triad Flow Grid */
        .triad-flow-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .triad-card {
          padding: 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          display: flex;
          flex-direction: column;
        }

        .triad-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 12px;
        }

        .triad-problem .triad-card-header { color: #C53030; }
        .triad-icon-problem { color: #E53E3E; flex-shrink: 0; }

        .triad-solution .triad-card-header { color: var(--color-primary-blue); }
        .triad-icon-solution { color: var(--color-primary-blue); flex-shrink: 0; }

        .triad-benefit .triad-card-header { color: var(--color-success); }
        .triad-icon-benefit { color: var(--color-success); flex-shrink: 0; }

        .triad-card-desc {
          font-size: 0.86rem;
          color: var(--color-text);
          line-height: 1.6;
        }

        /* Footer */
        .detail-panel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
          margin-top: auto;
          flex-wrap: wrap;
          gap: 16px;
        }

        .panel-footer-note {
          font-size: 0.84rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 1024px) {
          .solutions-container-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .solutions-nav-list {
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 8px;
          }
          .solution-nav-btn {
            flex-shrink: 0;
            padding: 10px 14px;
          }
          .triad-flow-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .solution-detail-panel {
            padding: 20px 18px;
          }
          .detail-solution-title {
            font-size: 1.25rem;
          }
          .detail-panel-footer {
            flex-direction: column;
            align-items: flex-start;
          }
          .detail-panel-footer button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
