import { 
  HeartPulse, GraduationCap, Landmark, ShoppingBag, 
  Factory, Building2, Truck, Briefcase, Rocket, ArrowRight,
  Code, Globe, Smartphone, Palette, Cloud, Bot, Compass, Database, Cpu, Layers
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  HeartPulse, GraduationCap, Landmark, ShoppingBag, 
  Factory, Building2, Truck, Briefcase, Rocket,
  Code, Globe, Smartphone, Palette, Cloud, Bot, Compass, Database, Cpu, Layers
};

export default function IndustriesSection({ openConsultationModal }) {
  const { industries: dynamicIndustries } = useCms();

  const defaultIndustries = [
    {
      title: 'Healthcare',
      icon: HeartPulse,
      desc: 'Technology solutions for Healthcare clinics, practices, and health businesses: patient inquiry portals, digital booking systems, and responsive health service websites.'
    },
    {
      title: 'Education',
      icon: GraduationCap,
      desc: 'Technology solutions for Education institutions and training academies: student learning portals, course registration workflows, and educational content hubs.'
    },
    {
      title: 'Finance',
      icon: Landmark,
      desc: 'Technology solutions for Finance firms and advisory services: client onboarding forms, invoice and billing integrations, and secure account access portals.'
    },
    {
      title: 'Retail & E-commerce',
      icon: ShoppingBag,
      desc: 'Technology solutions for Retail & E-commerce businesses: modern online storefronts, catalog management tools, and seamless payment gateway integrations.'
    },
    {
      title: 'Manufacturing',
      icon: Factory,
      desc: 'Technology solutions for Manufacturing units: internal operational trackers, supply scheduling dashboards, and distributor communication portals.'
    },
    {
      title: 'Real Estate',
      icon: Building2,
      desc: 'Technology solutions for Real Estate agencies and developers: property showcases, dynamic lead inquiry forms, and virtual project presentation websites.'
    },
    {
      title: 'Logistics',
      icon: Truck,
      desc: 'Technology solutions for Logistics & transport providers: delivery status lookups, customer booking tools, and automated dispatch notification systems.'
    },
    {
      title: 'Professional Services',
      icon: Briefcase,
      desc: 'Technology solutions for Legal, accounting, and consulting firms: authoritative corporate websites, appointment schedulers, and client intake workflows.'
    },
    {
      title: 'Startups & SMEs',
      icon: Rocket,
      desc: 'Technology solutions for Startups & growing Indian businesses: agile MVP development, scalable web applications, and fast time-to-market software delivery.'
    }
  ];

  const industries = dynamicIndustries && dynamicIndustries.length > 0
    ? dynamicIndustries.map(i => ({
        id: i.slug || i.id,
        title: i.title,
        icon: iconMap[i.icon] || Building2,
        desc: i.desc || ''
      }))
    : defaultIndustries;

  return (
    <section id="industries" className="industries-root section section-white">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="badge">Sector Focus</div>
          <h2 className="section-title">Industry-Specific Technology Solutions</h2>
          <p className="section-subtitle">
            Every sector has unique operational patterns and customer expectations. We engineer software and web solutions customized for your industry's specific workflow requirements.
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="industries-grid">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="industry-card shadow-sm">
                <div className="ind-icon-box">
                  <Icon size={22} />
                </div>
                <h3 className="ind-card-title">{ind.title}</h3>
                <p className="ind-card-desc">{ind.desc}</p>
                <button 
                  className="ind-explore-link"
                  onClick={openConsultationModal}
                >
                  <span>Explore Solutions</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .industries-root {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .industry-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .industry-card:hover {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .ind-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: all var(--transition-fast);
        }

        .industry-card:hover .ind-icon-box {
          background: var(--color-primary-blue);
          color: var(--color-white);
        }

        .ind-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .ind-card-desc {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
          flex-grow: 1;
        }

        .ind-explore-link {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          cursor: pointer;
          padding: 0;
          transition: transform var(--transition-fast);
        }

        .ind-explore-link:hover {
          transform: translateX(3px);
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
          .industry-card {
            padding: 22px;
          }
        }
      `}</style>
    </section>
  );
}
