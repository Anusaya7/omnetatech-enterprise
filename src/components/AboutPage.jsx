import { Target, Users, ShieldCheck, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage({ openConsultationModal }) {
  const whyCards = [
    {
      title: 'Business First',
      desc: 'Technology solutions designed around actual business requirements.',
      icon: Target
    },
    {
      title: 'Quality Engineering',
      desc: 'Clean, maintainable and scalable software built using modern development practices.',
      icon: ShieldCheck
    },
    {
      title: 'Transparent Communication',
      desc: 'Clear communication, realistic expectations and collaborative delivery.',
      icon: Users
    },
    {
      title: 'Long-Term Partnership',
      desc: 'We aim to build technology partnerships that continue beyond project delivery.',
      icon: Heart
    }
  ];

  const engineeringStandards = [
    'Clean, maintainable code architectures adhering to modern industry standards',
    'Responsive and accessible user interfaces tested across screens and devices',
    'Scalable backend databases and secure API communication protocols',
    'Practical business automations aimed at measurable operational efficiency',
    'Direct access to technical leads with clear sprint updates and milestone reviews',
    'Commitment to data confidentiality, code ownership, and client security'
  ];

  return (
    <div className="about-page-root">
      
      {/* Hero Header */}
      <section className="about-hero-section section-white">
        <div className="container about-hero-container">
          <div className="badge">About OmNetaTech</div>
          <h1 className="about-hero-title">
            Technology Solutions for a <span className="text-highlight">Digital Future</span>
          </h1>
          <p className="about-hero-lead">
            OmNetaTech is an India-based technology company focused on helping businesses use technology to solve real-world challenges. We work across software development, web and mobile solutions, automation, cloud technologies and modern digital experiences.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-light">
        <div className="container">
          <div className="split-vision-grid">
            <div className="vision-card shadow-sm">
              <div className="vision-tag">Our Vision</div>
              <h2 className="vision-title">Empowering Businesses Through Technology</h2>
              <p className="vision-desc">
                To be a trusted technology partner for growing Indian businesses and global organizations by delivering practical, scalable, and beautifully engineered software solutions that drive sustainable business growth.
              </p>
            </div>

            <div className="vision-card shadow-sm">
              <div className="vision-tag">Our Mission</div>
              <h2 className="vision-title">Reliable Engineering Without Compromise</h2>
              <p className="vision-desc">
                To bridge the gap between business objectives and technology implementation. We craft maintainable codebases, prioritize honest communication, and design digital experiences that users love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why OmNetaTech? */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="badge">Core Values</div>
            <h2 className="section-title">Why OmNetaTech?</h2>
            <p className="section-subtitle">
              We founded our practice on principles of integrity, pragmatic software craftsmanship, and collaborative partnerships.
            </p>
          </div>

          <div className="why-omnetatech-grid">
            {whyCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="why-card-box shadow-sm">
                  <div className="why-box-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="why-box-title">{card.title}</h3>
                  <p className="why-box-desc">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Standards */}
      <section className="section section-light">
        <div className="container">
          <div className="standards-layout shadow-sm">
            <div className="standards-info">
              <div className="badge">Quality Focus</div>
              <h2 className="standards-title">Our Engineering Standards</h2>
              <p className="standards-desc">
                Every line of code and user interface we craft is guided by strict quality principles. We don't believe in technical shortcuts or over-engineering.
              </p>
              <button 
                className="btn-primary-blue standards-cta"
                onClick={openConsultationModal}
              >
                <span>Discuss Your Project</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="standards-checklist">
              {engineeringStandards.map((item, idx) => (
                <div key={idx} className="standard-item">
                  <CheckCircle2 size={18} className="standard-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location / Direct Contact Banner */}
      <section className="about-contact-banner section-navy">
        <div className="container banner-inner">
          <div>
            <div className="badge badge-navy">India-Based Technology Company</div>
            <h2 className="banner-title">Ready to Discuss Your Technology Needs?</h2>
            <p className="banner-sub">
              Contact our team directly at <strong>+91 8237140776</strong> or <strong>omnetatech@gmail.com</strong>.
            </p>
          </div>
          <button 
            className="btn-primary-blue banner-btn"
            onClick={openConsultationModal}
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      <style>{`
        .about-page-root {
          background-color: var(--color-bg);
        }

        .about-hero-section {
          padding: 80px 0 60px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .about-hero-container {
          text-align: center;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-hero-title {
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          color: var(--color-primary-navy);
          font-weight: 800;
          margin-top: 16px;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .text-highlight {
          color: var(--color-primary-blue);
        }

        .about-hero-lead {
          font-size: clamp(1.05rem, 1.25vw, 1.15rem);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* Split Vision Grid */
        .split-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .vision-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 36px;
        }

        .vision-tag {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--color-primary-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .vision-title {
          font-size: 1.4rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 14px;
        }

        .vision-desc {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.65;
        }

        /* Why OmNetaTech Cards */
        .why-omnetatech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .why-card-box {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .why-card-box:hover {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .why-box-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .why-box-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .why-box-desc {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Standards Layout */
        .standards-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 48px;
          align-items: center;
        }

        .standards-title {
          font-size: 1.85rem;
          color: var(--color-primary-navy);
          font-weight: 800;
          margin-top: 14px;
          margin-bottom: 14px;
        }

        .standards-desc {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .standards-checklist {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .standard-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.92rem;
          color: var(--color-text);
          line-height: 1.5;
        }

        .standard-check {
          color: var(--color-success);
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Banner */
        .about-contact-banner {
          padding: 60px 0;
          background: #0B1F3A;
        }

        .banner-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .banner-title {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin-top: 10px;
          margin-bottom: 8px;
        }

        .banner-sub {
          font-size: 0.95rem;
          color: #CBD5E1;
        }

        .banner-btn {
          padding: 14px 28px;
          font-size: 0.95rem;
        }

        @media (max-width: 1024px) {
          .why-omnetatech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .standards-layout {
            grid-template-columns: 1fr;
            padding: 32px;
          }
        }

        @media (max-width: 768px) {
          .split-vision-grid {
            grid-template-columns: 1fr;
          }
          .why-omnetatech-grid {
            grid-template-columns: 1fr;
          }
          .banner-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
