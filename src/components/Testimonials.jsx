import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Landmark, Activity, Server, Shield } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "OmNetaTech's implementation of dynamic agentic AI and cloud automation changed our entire shipping flow. They took a legacy ERP system and modernized it in months, saving us Crores of Rupees while improving delivery schedules by 80%.",
      author: "Marcus Vance",
      role: "VP of Global Logistics Operations",
      company: "Global Logistics Corp",
      stars: 5
    },
    {
      quote: "Security in digital healthcare is not optional. OmNetaTech built a secure zero-trust patient directory that cleared ISO 27001 and HIPAA guidelines on the first sweep. Their technical clarity is stellar.",
      author: "Dr. Sarah Lin",
      role: "Chief Information Officer",
      company: "OmniHealth Medical Network",
      stars: 5
    },
    {
      quote: "Our monolithic payments pipeline was buckling during sales peaks. OmNetaTech containerized our database node systems and migrated us to multi-cloud. We handled 3x peak load with zero issues.",
      author: "David Kael",
      role: "Director of Platform Engineering",
      company: "Nova Payments & Fintech",
      stars: 5
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Mock enterprise client logos
  const clientLogos = [
    { name: 'Global Logistics', icon: Server },
    { name: 'Apex Industrial', icon: Activity },
    { name: 'Nova Payments', icon: Landmark },
    { name: 'OmniHealth', icon: Shield }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        
        {/* Header */}
        <div className="test-header">
          <div className="badge">Client Endorsements</div>
          <h2 className="test-title">Trusted By Corporate Leaders</h2>
          <p className="test-sub">
            Read how global corporations partner with OmNetaTech to solve complex engineering challenges, lower operational overhead, and secure their core infrastructure.
          </p>
        </div>

        {/* Carousel & Review Block */}
        <div className="test-carousel-card shadow-premium">
          <div className="quote-icon-bg">
            <Quote size={120} />
          </div>

          <div className="test-carousel-inner">
            <div className="star-rating">
              {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                <Star key={i} size={16} fill="var(--color-cyan)" stroke="var(--color-cyan)" />
              ))}
            </div>

            <p className="testimonial-quote">
              "{testimonials[activeIndex].quote}"
            </p>

            <div className="testimonial-author-block">
              <div className="author-info">
                <div className="author-name">{testimonials[activeIndex].author}</div>
                <div className="author-role">
                  {testimonials[activeIndex].role} &mdash; <span className="text-cyan">{testimonials[activeIndex].company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="carousel-controls">
            <button className="control-btn" onClick={handlePrev}>
              <ChevronLeft size={20} />
            </button>
            <span className="carousel-indicator-text">
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
            <button className="control-btn" onClick={handleNext}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="logos-section">
          <div className="logos-heading">Enterprise Client Ecosystem</div>
          <div className="logos-grid">
            {clientLogos.map((logo, idx) => {
              const LogoIcon = logo.icon;
              return (
                <div key={idx} className="logo-item">
                  <LogoIcon size={18} className="logo-icon-svg" />
                  <span className="logo-item-text">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--color-navy-dark);
          padding: 100px 24px;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .test-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .test-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-white-pure);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .test-sub {
          font-size: 1.05rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Carousel Card Layout */
        .test-carousel-card {
          background: rgba(13, 34, 60, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-lg);
          padding: 60px;
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
        }

        .quote-icon-bg {
          position: absolute;
          top: -20px;
          left: -10px;
          color: rgba(0, 191, 255, 0.03);
          pointer-events: none;
          z-index: 1;
        }

        .test-carousel-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .star-rating {
          display: flex;
          gap: 4px;
          margin-bottom: 28px;
        }

        .testimonial-quote {
          font-family: var(--font-title);
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 500;
          color: var(--color-white-pure);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .testimonial-author-block {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .author-name {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-white-pure);
        }

        .author-role {
          font-size: 0.85rem;
          color: var(--color-gray-dark);
          margin-top: 4px;
        }

        /* Carousel Controls */
        .carousel-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 40px;
          position: relative;
          z-index: 2;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-white-pure);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .control-btn:hover {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.08);
        }

        .carousel-indicator-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-gray-dark);
        }

        /* Logos Section */
        .logos-section {
          margin-top: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 48px;
          text-align: center;
        }

        .logos-heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-dark);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
        }

        .logos-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 40px;
        }

        .logo-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.25);
          transition: var(--transition-fast);
          cursor: pointer;
        }

        .logo-item:hover {
          color: var(--color-cyan);
        }

        .logo-icon-svg {
          flex-shrink: 0;
        }

        .logo-item-text {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        @media (max-width: 768px) {
          .test-carousel-card {
            padding: 30px;
          }
          .logos-grid {
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
