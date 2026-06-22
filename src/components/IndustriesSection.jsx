import { useState } from 'react';
import { Landmark, HeartPulse, ShoppingBag, Factory, GraduationCap, Truck, ArrowRight } from 'lucide-react';

export default function IndustriesSection() {
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

  const industries = [
    {
      id: 'banking',
      title: 'Banking & Finance',
      icon: Landmark,
      metric: '₹1 Lakh Crore+ Secured',
      description: 'Developing high-throughput payment architectures, automated audits, and regulatory compliance engines backed by secure AI algorithms.',
      solutions: ['Fraud Detection Engines', 'High-Frequency Processing', 'Regulatory Compliance Checkers'],
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
    },
    {
      id: 'healthcare',
      title: 'Digital Healthcare',
      icon: HeartPulse,
      metric: '15M+ Patient Records Managed',
      description: 'HIPAA-compliant software platforms, predictive diagnostics, secure IoT medical device synchronization, and decentralized billing systems.',
      solutions: ['EHR Interoperability Systems', 'AI Diagnostics Handlers', 'IoMT Secure Networks'],
      gradient: 'linear-gradient(135deg, #065F46 0%, #10B981 100%)'
    },
    {
      id: 'retail',
      title: 'Enterprise Retail',
      icon: ShoppingBag,
      metric: '40% Inventory Overhead Reduction',
      description: 'AI-driven supply forecasting, multi-channel customer lifecycle optimization, and next-generation automated ERP systems.',
      solutions: ['Predictive Demand Planners', 'Unified Cart Platforms', 'Omnichannel Customer Portals'],
      gradient: 'linear-gradient(135deg, #7C2D12 0%, #F97316 100%)'
    },
    {
      id: 'manufacturing',
      title: 'Industrial Manufacturing',
      icon: Factory,
      metric: '30% Reduction in Downtime',
      description: 'Industry 4.0 automation, connected IoT telemetry, predictive maintenance machinery models, and warehouse robotics scheduling.',
      solutions: ['IoT Telemetry Gateways', 'Predictive Alert Engines', 'Digital Twin Visualizers'],
      gradient: 'linear-gradient(135deg, #312E81 0%, #6366F1 100%)'
    },
    {
      id: 'education',
      title: 'Higher Education',
      icon: GraduationCap,
      metric: '2.5M Students Connected',
      description: 'Scalable LMS architectures, automated student performance modeling, and immersive digital classrooms supporting global research databases.',
      solutions: ['LMS Core Integration', 'Automated Enrollment Systems', 'Predictive Retention Analytics'],
      gradient: 'linear-gradient(135deg, #581C87 0%, #8B5CF6 100%)'
    },
    {
      id: 'logistics',
      title: 'Logistics & Supply Chain',
      icon: Truck,
      metric: '99.8% On-Time Delivery Rates',
      description: 'Global route pathfinders, fleet management automation, carbon footprint tracking models, and blockchain-based customs clearing.',
      solutions: ['Route Optimization Algorithms', 'Fleet Telematics Platforms', 'Customs Clearing Ledgers'],
      gradient: 'linear-gradient(135deg, #0F172A 0%, #475569 100%)'
    }
  ];

  return (
    <section id="industries" className="industries-section">
      <div className="grid-overlay"></div>
      <div className="container">
        
        {/* Section Heading */}
        <div className="industries-header">
          <div className="badge">Sector Focus</div>
          <h2 className="industries-title">Tailored Industry Solutions</h2>
          <p className="industries-sub">
            Helping sector leaders modernize operations, maintain absolute compliance, and out-compete their markets through customized technology strategies.
          </p>
        </div>

        {/* Industry Card Grid */}
        <div className="industries-grid">
          {industries.map((ind) => {
            const IconComponent = ind.icon;
            const isHovered = hoveredIndustry === ind.id;
            return (
              <div 
                key={ind.id} 
                className={`industry-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndustry(ind.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
                style={{
                  '--card-gradient': ind.gradient
                }}
              >
                {/* Background color overlay */}
                <div className="industry-bg-gradient"></div>

                <div className="industry-content">
                  <div className="industry-top-row">
                    <div className="industry-icon-wrapper">
                      <IconComponent size={24} />
                    </div>
                    <span className="industry-metric-badge">{ind.metric}</span>
                  </div>

                  <h3 className="industry-card-title">{ind.title}</h3>
                  <p className="industry-card-desc">{ind.description}</p>

                  {/* Solutions sliding list */}
                  <div className="industry-solutions-wrapper">
                    <div className="solutions-heading">Key Modernizations:</div>
                    <ul className="solutions-list">
                      {ind.solutions.map((sol, index) => (
                        <li key={index} className="solution-item">
                          <span className="bullet-cyan">■</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="industry-card-footer">
                    <span className="footer-explore-text">Explore Solutions Architecture</span>
                    <ArrowRight size={16} className="footer-arrow-icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .industries-section {
          background-color: var(--color-navy);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .industries-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .industries-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-white-pure);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .industries-sub {
          font-size: 1.05rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        /* Industry Card design */
        .industry-card {
          background: rgba(13, 34, 60, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-lg);
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .industry-bg-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--card-gradient);
          opacity: 0.03;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .industry-card:hover {
          transform: translateY(-8px);
          border-color: var(--color-cyan);
          box-shadow: var(--shadow-premium);
        }

        .industry-card:hover .industry-bg-gradient {
          opacity: 0.15;
        }

        .industry-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 1;
        }

        .industry-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .industry-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-sm);
          background: rgba(0, 191, 255, 0.1);
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .industry-card:hover .industry-icon-wrapper {
          background: var(--color-cyan);
          color: var(--color-navy-dark);
          box-shadow: 0 0 15px var(--color-cyan);
        }

        .industry-metric-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-white-pure);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: 50px;
          font-weight: 500;
        }

        .industry-card-title {
          font-size: 1.5rem;
          color: var(--color-white-pure);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .industry-card-desc {
          font-size: 0.9rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 24px;
          transition: opacity 0.3s ease;
        }

        /* Solutions list inside card */
        .industry-solutions-wrapper {
          margin-top: auto;
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .industry-card.hovered .industry-solutions-wrapper {
          opacity: 1;
          height: 110px;
          margin-bottom: 20px;
        }

        .solutions-heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .solutions-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .solution-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-white-pure);
        }

        .bullet-cyan {
          color: var(--color-cyan);
          font-size: 0.6rem;
        }

        /* Footer inside card */
        .industry-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: auto;
          color: var(--color-gray-dark);
          font-size: 0.8rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .industry-card:hover .industry-card-footer {
          color: var(--color-cyan);
          border-color: rgba(0, 191, 255, 0.2);
        }

        .footer-arrow-icon {
          transition: transform var(--transition-fast);
        }

        .industry-card:hover .footer-arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
          .industry-card.hovered .industry-solutions-wrapper {
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
