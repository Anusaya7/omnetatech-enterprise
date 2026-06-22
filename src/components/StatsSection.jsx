import { useEffect, useState, useRef } from 'react';

const CountUpItem = ({ target, duration, suffix = "", prefix = "", decimal = false }) => {
  const [count, setCount] = useState(decimal ? 0.0 : 0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseFloat(target);
    if (start === end) return;

    const totalMiliseconds = duration;
    const stepTime = 30; // ms
    const numSteps = totalMiliseconds / stepTime;
    const increment = (end - start) / numSteps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration, decimal]);

  return (
    <div ref={elementRef} className="stat-value">
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-container container">
        <div className="stats-grid">
          
          <div className="stat-card">
            <CountUpItem target={250} duration={2000} suffix="+" />
            <div className="stat-title">Projects Delivered</div>
            <p className="stat-desc">Accelerating digital architecture globally</p>
          </div>

          <div className="stat-card">
            <CountUpItem target={100} duration={2000} suffix="+" />
            <div className="stat-title">Enterprise Clients</div>
            <p className="stat-desc">Partnering with Fortune 500 corporations</p>
          </div>

          <div className="stat-card">
            <CountUpItem target={15} duration={1500} suffix="+" />
            <div className="stat-title">Countries Served</div>
            <p className="stat-desc">Operating across three major global regions</p>
          </div>

          <div className="stat-card">
            <CountUpItem target={99.9} duration={2500} suffix="%" decimal={true} />
            <div className="stat-title">SLA Uptime Commitment</div>
            <p className="stat-desc">Guaranteed resilience and core availability</p>
          </div>

        </div>
      </div>

      <style>{`
        .stats-section {
          background-color: var(--color-navy-dark);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 80px 24px;
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .stat-card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -16px;
          top: 20%;
          height: 60%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(0, 191, 255, 0.2), transparent);
        }

        .stat-value {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          color: var(--color-white-pure);
          line-height: 1;
          letter-spacing: -1px;
          background: linear-gradient(135deg, var(--color-white-pure) 30%, var(--color-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-title {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-white-pure);
          margin-bottom: 6px;
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--color-gray-dark);
          max-width: 200px;
        }

        @media (max-width: 991px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .stat-card:nth-child(2)::after {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .stat-card::after {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
