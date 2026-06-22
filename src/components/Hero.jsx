import { Shield, Sparkles, Terminal, Activity, CloudLightning, Database, Cpu } from 'lucide-react';

export default function Hero({ openConsultationModal, scrollToServices }) {
  return (
    <section className="hero-container">
      <div className="grid-overlay"></div>
      <div className="world-map-bg"></div>
      
      {/* Background Lighting Orbs */}
      <div className="glow-orb" style={{ top: '10%', right: '10%', transform: 'translate(30%, -30%)' }}></div>
      <div className="glow-orb" style={{ bottom: '20%', left: '5%', transform: 'translate(-30%, 30%)', background: 'radial-gradient(circle, rgba(109, 93, 252, 0.1) 0%, rgba(7, 20, 38, 0) 70%)' }}></div>

      <div className="hero-content container">
        {/* Left Side: Copy and Actions */}
        <div className="hero-text-side">
          <div className="hero-badge badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>Enterprise AI & Digital Transformation</span>
          </div>

          <h1 className="hero-headline">
            Engineering Tomorrow <br />
            <span className="text-gradient font-bold">Through AI</span>
          </h1>

          <p className="hero-subheading">
            Empowering enterprises with intelligent automation, cloud modernization, cybersecurity, and scalable digital transformation solutions designed for the future.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={openConsultationModal}>
              Start Your Project
            </button>
            <button className="btn-secondary" onClick={scrollToServices}>
              Explore Services
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="check-mark">✓</span>
              <span className="trust-text">99.9% Uptime SLA</span>
            </div>
            <div className="trust-item">
              <span className="check-mark">✓</span>
              <span className="trust-text">Enterprise Security</span>
            </div>
            <div className="trust-item">
              <span className="check-mark">✓</span>
              <span className="trust-text">ISO-Compliant Processes</span>
            </div>
            <div className="trust-item">
              <span className="check-mark">✓</span>
              <span className="trust-text">Global Delivery Model</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Technology Ecosystem */}
        <div className="hero-visual-side">
          <div className="visual-wrapper animate-float">
            {/* Outer Rotating Technology Globe */}
            <div className="tech-globe-circle"></div>
            <div className="tech-globe-circle-inner"></div>

            {/* Neural Connections & Cloud Node Network */}
            <svg className="neural-lines" viewBox="0 0 400 400">
              {/* Connection Lines */}
              <line x1="200" y1="200" x2="80" y2="120" stroke="rgba(0, 191, 255, 0.2)" strokeWidth="1.5" />
              <line x1="200" y1="200" x2="320" y2="120" stroke="rgba(0, 191, 255, 0.2)" strokeWidth="1.5" />
              <line x1="200" y1="200" x2="280" y2="280" stroke="rgba(109, 93, 252, 0.2)" strokeWidth="1.5" />
              <line x1="200" y1="200" x2="120" y2="280" stroke="rgba(109, 93, 252, 0.2)" strokeWidth="1.5" />
              
              <line x1="80" y1="120" x2="320" y2="120" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="120" y1="280" x2="280" y2="280" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Moving Pulses along lines */}
              <circle r="4" fill="#00BFFF">
                <animateMotion 
                  path="M 200,200 L 80,120" 
                  dur="3s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <circle r="4" fill="#6D5DFC">
                <animateMotion 
                  path="M 200,200 L 320,120" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <circle r="4" fill="#00BFFF">
                <animateMotion 
                  path="M 200,200 L 280,280" 
                  dur="3.5s" 
                  repeatCount="indefinite" 
                />
              </circle>
            </svg>

            {/* Floating Analytics Dashboard Panel */}
            <div className="floating-card glass-panel card-analytics">
              <div className="card-header">
                <Activity size={12} className="card-icon-blue" />
                <span>AI Core Load</span>
                <span className="card-status-dot"></span>
              </div>
              <div className="card-body-chart">
                <div className="bar" style={{ height: '30%' }}></div>
                <div className="bar active" style={{ height: '65%' }}></div>
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar active" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
              </div>
              <div className="card-metric">94.8 TFLOPS</div>
            </div>

            {/* Floating Security System Panel */}
            <div className="floating-card glass-panel card-security">
              <div className="card-header">
                <Shield size={12} className="card-icon-purple" />
                <span>Threat Detection</span>
              </div>
              <div className="card-log">
                <div className="log-line text-cyan">&gt;_ Decrypting handshake...</div>
                <div className="log-line text-green">&gt;_ Status: 100% SECURE</div>
              </div>
            </div>

            {/* Central Engine Node */}
            <div className="central-node shadow-premium">
              <div className="pulse-ring"></div>
              <div className="pulse-ring-slow"></div>
              <Cpu size={32} className="central-icon" />
            </div>

            {/* Surrounding Nodes */}
            <div className="tech-node node-nw">
              <Terminal size={16} />
            </div>
            <div className="tech-node node-ne">
              <Database size={16} />
            </div>
            <div className="tech-node node-se">
              <CloudLightning size={16} />
            </div>
            <div className="tech-node node-sw">
              <Shield size={16} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-container {
          min-height: 100vh;
          position: relative;
          background-color: var(--color-navy-dark);
          background-image: var(--grad-hero);
          display: flex;
          align-items: center;
          padding-top: 100px;
          padding-bottom: 60px;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 40px;
          padding: 0 24px;
        }

        .hero-text-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-badge {
          margin-bottom: 24px;
        }
        
        .badge-sparkle {
          animation: pulseGlow 1.5s infinite;
        }

        .hero-headline {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
        }

        .hero-subheading {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          color: var(--color-gray-medium);
          margin-bottom: 36px;
          max-width: 580px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          width: 100%;
        }

        /* Buttons Styling */
        .btn-primary {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-cyan) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 191, 255, 0.25);
          transition: var(--transition-fast);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(0, 191, 255, 0.4), 0 0 20px rgba(109, 93, 252, 0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-cyan);
          transform: translateY(-2px);
        }

        /* Trust indicators styling */
        .trust-indicators {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 500px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .check-mark {
          color: var(--color-cyan);
          font-weight: 700;
          font-size: 1rem;
        }

        .trust-text {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          font-weight: 500;
        }

        /* Right side tech illustration */
        .hero-visual-side {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 100%;
        }

        .visual-wrapper {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .tech-globe-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px dashed rgba(0, 191, 255, 0.15);
          border-radius: 50%;
          animation: spin 30s linear infinite;
        }

        .tech-globe-circle-inner {
          position: absolute;
          top: 40px;
          left: 40px;
          width: calc(100% - 80px);
          height: calc(100% - 80px);
          border: 1px solid rgba(109, 93, 252, 0.1);
          border-radius: 50%;
          animation: spin 15s linear infinite reverse;
        }

        .neural-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Central Node Engine */
        .central-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 76px;
          height: 76px;
          background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-royal) 100%);
          border: 2px solid var(--color-cyan);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .central-icon {
          color: var(--color-cyan);
          filter: drop-shadow(0 0 5px var(--color-cyan));
        }

        .pulse-ring, .pulse-ring-slow {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1.5px solid var(--color-cyan);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        .pulse-ring {
          animation: ripple 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .pulse-ring-slow {
          animation: ripple 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 0.8s;
          border-color: var(--color-purple);
        }

        /* Tech Orbiting Nodes */
        .tech-node {
          position: absolute;
          width: 36px;
          height: 36px;
          background: var(--color-navy);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white-pure);
          transition: var(--transition-fast);
          z-index: 4;
        }

        .tech-node:hover {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
        }

        .node-nw { top: 100px; left: 60px; }
        .node-ne { top: 100px; right: 60px; }
        .node-se { bottom: 100px; right: 60px; }
        .node-sw { bottom: 100px; left: 60px; }

        /* Floating Dashboard Cards styling */
        .floating-card {
          position: absolute;
          padding: 12px 16px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 6;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .glass-panel {
          background: rgba(7, 20, 38, 0.7);
        }

        .card-analytics {
          top: 30px;
          left: -40px;
          width: 140px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-gray-medium);
        }

        .card-icon-blue { color: var(--color-cyan); }
        .card-icon-purple { color: var(--color-purple); }

        .card-status-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          margin-left: auto;
          box-shadow: 0 0 6px #10B981;
        }

        .card-body-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 40px;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card-body-chart .bar {
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          transition: var(--transition-slow);
        }

        .card-body-chart .bar.active {
          background: var(--color-cyan);
        }

        .card-metric {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-white-pure);
          text-align: right;
        }

        .card-security {
          bottom: 20px;
          right: -30px;
          width: 170px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-log {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .log-line {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .text-cyan { color: var(--color-cyan); }
        .text-green { color: #10B981; }

        /* Keyframes */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        @media (max-width: 991px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 60px;
          }
          .hero-text-side {
            align-items: center;
            text-align: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .trust-indicators {
            margin: 0 auto;
          }
          .hero-visual-side {
            order: -1;
            margin-bottom: 20px;
          }
          .visual-wrapper {
            width: 320px;
            height: 320px;
          }
          .node-nw { top: 80px; left: 40px; }
          .node-ne { top: 80px; right: 40px; }
          .node-se { bottom: 80px; right: 40px; }
          .node-sw { bottom: 80px; left: 40px; }
          .card-analytics { left: -10px; }
          .card-security { right: -10px; }
        }
      `}</style>
    </section>
  );
}
