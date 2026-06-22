import { Target, Users, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: Target,
      title: 'Precision Execution',
      desc: 'We map every engineering sprint to strict customer specifications and SLA parameters. Zero room for deployment drift.'
    },
    {
      icon: Users,
      title: 'Client Integration',
      desc: 'We operate as an extension of your tech leadership, working closely to enable full code visibility and clean knowledge handovers.'
    },
    {
      icon: ShieldCheck,
      title: 'Absolute Integrity',
      desc: 'Every security scanner we set, policy we audit, and dataset we clean aligns with global compliance and security frameworks.'
    },
    {
      icon: Heart,
      title: 'Continuous Growth',
      desc: 'We commit resources to continuous testing and learning models, equipping our engineers with the latest frameworks and tools.'
    }
  ];

  const leaders = [
    {
      name: 'Elena Rostova',
      role: 'Chief Executive Officer',
      desc: 'Ex-Accenture Managing Director, specializing in Fortune 500 digital transformations and global operational scale.'
    },
    {
      name: 'Dr. Aaron Patel',
      role: 'Chief Technology Officer',
      desc: 'Former AI Core Architect at IBM Research. Deep expert in cognitive LLM structures and distributed neural pipelines.'
    },
    {
      name: 'Claire Moreau',
      role: 'Global Head of Cybersecurity',
      desc: '15+ years defending critical banking infrastructure. Architect of OmNetaTech’s Zero-Trust Defense standard.'
    },
    {
      name: 'Rajesh Nair',
      role: 'VP of AI & Digital Automation',
      desc: 'Pioneer of agentic workflows. Spearheads the development of OmNetaTech’s proprietary model-tuning engines.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', desc: 'Launched as a boutique cloud engineering advisory team in Seattle.' },
    { year: '2021', title: 'Global APAC Expansion', desc: 'Opened delivery centers in Bangalore and Singapore. Exceeded 100 staff.' },
    { year: '2024', title: 'ISO Certifications & AI Suite', desc: 'Achieved ISO 9001/27001 stamps. Unveiled cognitive AI engine solutions.' },
    { year: '2026', title: 'Digital Futures Initiative', desc: 'Scaling operations to 15+ countries, securing ₹1 Lakh Crore+ in transactional systems.' }
  ];

  return (
    <div className="about-page-wrapper">
      <div className="grid-overlay"></div>
      <div className="world-map-bg"></div>

      {/* Hero Header */}
      <div className="about-hero container">
        <div className="badge">Corporate Profile</div>
        <h1 className="about-hero-title">
          Modernizing Infrastructure. <br />
          <span className="text-gradient">Securing Innovation.</span>
        </h1>
        <p className="about-hero-sub">
          OmNetaTech – Digital Futures is a premier technology consulting firm. We design, deploy, and secure the next generation of enterprise AI, cloud architecture, and automation pipelines.
        </p>
      </div>

      {/* Vision & Mission */}
      <section className="about-split-section container">
        <div className="about-split-card">
          <div className="card-top-glow"></div>
          <h2 className="split-title">Our Corporate Vision</h2>
          <p className="split-text">
            To build a resilient global business ecosystem where enterprises leverage intelligent machines, cloud automation, and zero-trust networks to drive sustainable human progress.
          </p>
        </div>
        <div className="about-split-card">
          <div className="card-top-glow" style={{ background: 'radial-gradient(circle, rgba(109, 93, 252, 0.15) 0%, transparent 60%)' }}></div>
          <h2 className="split-title">Our Engineering Mission</h2>
          <p className="split-text">
            To deliver high-performance, ISO-compliant software architectures. We commit to maximum service availability, strict security frameworks, and direct business ROI.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values container">
        <div className="section-title-block">
          <h2 className="about-sec-title">Core Principles</h2>
          <p className="about-sec-desc">The foundations driving our developer sprints, code audits, and partner relationships.</p>
        </div>
        <div className="values-grid">
          {coreValues.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="value-card">
                <div className="value-icon-box">
                  <Icon size={22} />
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-text">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="about-leaders container">
        <div className="section-title-block">
          <h2 className="about-sec-title">Executive Leadership</h2>
          <p className="about-sec-desc">Leading technologists, authors, and industry pioneers driving our global strategies.</p>
        </div>
        <div className="leaders-grid">
          {leaders.map((leader, i) => (
            <div key={i} className="leader-card shadow-md">
              <div className="leader-avatar-placeholder">
                <span className="avatar-initials">{leader.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="leader-name">{leader.name}</h3>
              <div className="leader-role">{leader.role}</div>
              <p className="leader-desc">{leader.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones History Timeline */}
      <section className="about-history container">
        <div className="section-title-block">
          <h2 className="about-sec-title">Our Milestones</h2>
          <p className="about-sec-desc">A timeline of scaling engineering capability and international expansion.</p>
        </div>
        
        <div className="timeline-wrapper">
          <div className="timeline-bar"></div>
          {milestones.map((m, i) => (
            <div key={i} className={`timeline-node ${i % 2 === 0 ? 'left-node' : 'right-node'}`}>
              <div className="timeline-node-content shadow-md">
                <div className="timeline-year">{m.year}</div>
                <h4 className="timeline-title-node">{m.title}</h4>
                <p className="timeline-desc-node">{m.desc}</p>
              </div>
              <div className="timeline-bullet-point"></div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-page-wrapper {
          position: relative;
          background-color: var(--color-navy-dark);
          color: var(--color-white-pure);
          padding-top: 120px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        .about-hero {
          text-align: center;
          max-width: 800px;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-top: 16px;
          margin-bottom: 24px;
        }

        .about-hero-sub {
          font-size: 1.15rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Split Vision Mission Cards */
        .about-split-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 100px;
        }

        .about-split-card {
          background: rgba(13, 34, 60, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-lg);
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .card-top-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(0, 191, 255, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .split-title {
          font-family: var(--font-title);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .split-text {
          font-size: 1rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Values styling */
        .about-values, .about-leaders, .about-history {
          margin-bottom: 100px;
        }

        .section-title-block {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px auto;
        }

        .about-sec-title {
          font-size: 2rem;
          margin-bottom: 12px;
          font-weight: 800;
        }

        .about-sec-desc {
          font-size: 0.95rem;
          color: var(--color-gray-dark);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 24px;
          transition: var(--transition-fast);
        }

        .value-card:hover {
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.03);
        }

        .value-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--border-radius-sm);
          background: rgba(0, 191, 255, 0.1);
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .value-title {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .value-text {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
        }

        /* Leaders Grid Layout */
        .leaders-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .leader-card {
          background: rgba(13, 34, 60, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 32px;
          text-align: center;
          transition: var(--transition-normal);
        }

        .leader-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-purple);
        }

        .leader-avatar-placeholder {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 4px 10px rgba(109, 93, 252, 0.3);
        }

        .avatar-initials {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--color-white-pure);
          font-size: 1.25rem;
        }

        .leader-name {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .leader-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .leader-desc {
          font-size: 0.8rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
        }

        /* History Timeline styling */
        .timeline-wrapper {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .timeline-bar {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(0, 191, 255, 0.3), transparent);
          transform: translateX(-50%);
        }

        .timeline-node {
          position: relative;
          width: 50%;
          margin-bottom: 40px;
        }

        .timeline-node.left-node {
          left: 0;
          padding-right: 40px;
          text-align: right;
        }

        .timeline-node.right-node {
          left: 50%;
          padding-left: 40px;
          text-align: left;
        }

        .timeline-node-content {
          background: rgba(13, 34, 60, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 24px;
          position: relative;
        }

        .timeline-year {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--color-cyan);
          margin-bottom: 4px;
        }

        .timeline-title-node {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .timeline-desc-node {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
        }

        .timeline-bullet-point {
          position: absolute;
          top: 30px;
          width: 14px;
          height: 14px;
          background: var(--color-cyan);
          border: 3px solid var(--color-white-pure);
          border-radius: 50%;
          z-index: 5;
          box-shadow: 0 0 10px var(--color-cyan);
        }

        .left-node .timeline-bullet-point {
          right: -7px;
        }

        .right-node .timeline-bullet-point {
          left: -7px;
        }

        @media (max-width: 991px) {
          .about-split-section {
            grid-template-columns: 1fr;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .leaders-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .timeline-bar {
            left: 20px;
          }
          .timeline-node {
            width: 100%;
            left: 0 !important;
            padding-left: 50px !important;
            padding-right: 0 !important;
            text-align: left !important;
          }
          .timeline-bullet-point {
            left: 13px !important;
          }
        }

        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
          .leaders-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
