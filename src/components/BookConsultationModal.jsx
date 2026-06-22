import { useState } from 'react';
import { X, Loader2, CheckCircle2, Phone, Mail } from 'lucide-react';

export default function BookConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = Configuration, 2 = Contact, 3 = Success
  const [service, setService] = useState('ai');
  const [budget, setBudget] = useState('25-75');
  const [timeline, setTimeline] = useState('3-6');
  
  const [formData, setFormData] = useState({ name: '', company: '', email: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper for Indian Pricing Display
  const getBudgetLabel = (b) => {
    if (b === 'under-25') return 'Under ₹25 Lakhs';
    if (b === '25-75') return '₹25 Lakhs - ₹75 Lakhs';
    return '₹75 Lakhs+';
  };

  // Instant calculation simulator computed during render (no useEffect)
  const getCalcStats = () => {
    let sprints;
    let engineers;
    let sla;

    if (service === 'ai') {
      sprints = budget === 'under-25' ? 4 : budget === '25-75' ? 8 : 14;
      engineers = budget === 'under-25' ? 2 : budget === '25-75' ? 4 : 6;
      sla = 'Premium 99.9% AI Availability';
    } else if (service === 'cloud') {
      sprints = budget === 'under-25' ? 3 : budget === '25-75' ? 6 : 12;
      engineers = budget === 'under-25' ? 1 : budget === '25-75' ? 3 : 5;
      sla = '99.99% Multi-Cloud SLA';
    } else if (service === 'sec') {
      sprints = budget === 'under-25' ? 4 : budget === '25-75' ? 7 : 10;
      engineers = budget === 'under-25' ? 2 : budget === '25-75' ? 3 : 4;
      sla = 'Compliance Zero-Risk SLA';
    } else {
      sprints = budget === 'under-25' ? 3 : budget === '25-75' ? 6 : 9;
      engineers = budget === 'under-25' ? 1 : budget === '25-75' ? 2 : 4;
      sla = '99.9% Workflow SLA';
    }

    // Timeline modifier
    if (timeline === '1-3') {
      sprints = Math.min(sprints, 6);
      engineers = Math.max(engineers, 3); // Faster delivery requires more engineers
    } else if (timeline === '6plus') {
      sprints = Math.max(sprints, 12);
    }

    return { sprints, engineers, sla };
  };

  const calcStats = getCalcStats();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500); // Simulate network request
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({ name: '', company: '', email: '', note: '' });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-content shadow-premium" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-badge">Architecture Estimator</div>
          <h3 className="modal-title">Book Project Consultation</h3>
          <button className="btn-close-modal" onClick={resetAndClose}>
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Configurator */}
        {step === 1 && (
          <div className="modal-step-body">
            <div className="configurator-grid">
              
              {/* Input column */}
              <div className="configurator-form">
                
                {/* Services options */}
                <div className="config-group">
                  <label className="config-label">1. Select Service Pillar</label>
                  <div className="config-options-grid">
                    <button 
                      className={`config-opt-btn ${service === 'ai' ? 'active' : ''}`}
                      onClick={() => setService('ai')}
                    >
                      AI Development
                    </button>
                    <button 
                      className={`config-opt-btn ${service === 'cloud' ? 'active' : ''}`}
                      onClick={() => setService('cloud')}
                    >
                      Cloud Infrastructure
                    </button>
                    <button 
                      className={`config-opt-btn ${service === 'sec' ? 'active' : ''}`}
                      onClick={() => setService('sec')}
                    >
                      Cyber Security
                    </button>
                    <button 
                      className={`config-opt-btn ${service === 'auto' ? 'active' : ''}`}
                      onClick={() => setService('auto')}
                    >
                      Workflow Automation
                    </button>
                  </div>
                </div>

                {/* Budget options */}
                <div className="config-group">
                  <label className="config-label">2. Target Budget Range (INR)</label>
                  <div className="config-options-grid cols-3">
                    <button 
                      className={`config-opt-btn ${budget === 'under-25' ? 'active' : ''}`}
                      onClick={() => setBudget('under-25')}
                    >
                      Under ₹25 Lakhs
                    </button>
                    <button 
                      className={`config-opt-btn ${budget === '25-75' ? 'active' : ''}`}
                      onClick={() => setBudget('25-75')}
                    >
                      ₹25 Lakhs - ₹75 Lakhs
                    </button>
                    <button 
                      className={`config-opt-btn ${budget === '75plus' ? 'active' : ''}`}
                      onClick={() => setBudget('75plus')}
                    >
                      ₹75 Lakhs+
                    </button>
                  </div>
                </div>

                {/* Timeline options */}
                <div className="config-group">
                  <label className="config-label">3. Target Delivery Timeline</label>
                  <div className="config-options-grid cols-3">
                    <button 
                      className={`config-opt-btn ${timeline === '1-3' ? 'active' : ''}`}
                      onClick={() => setTimeline('1-3')}
                    >
                      1 - 3 Months
                    </button>
                    <button 
                      className={`config-opt-btn ${timeline === '3-6' ? 'active' : ''}`}
                      onClick={() => setTimeline('3-6')}
                    >
                      3 - 6 Months
                    </button>
                    <button 
                      className={`config-opt-btn ${timeline === '6plus' ? 'active' : ''}`}
                      onClick={() => setTimeline('6plus')}
                    >
                      6+ Months
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic Output Indicator Column */}
              <div className="configurator-calculator" style={{ background: 'rgba(7, 20, 38, 0.4)' }}>
                <div className="calculator-heading">Project Delivery Estimate</div>
                
                <div className="calc-metrics-row">
                  <div className="calc-metric-card">
                    <div className="calc-metric-value">{calcStats.sprints}</div>
                    <div className="calc-metric-title">Est. Agile Sprints</div>
                  </div>
                  
                  <div className="calc-metric-card">
                    <div className="calc-metric-value">{calcStats.engineers}</div>
                    <div className="calc-metric-title">Dedicated Engineers</div>
                  </div>
                </div>

                <div className="calc-details-list">
                  <div className="calc-detail-item">
                    <span className="dot-green"></span>
                    <span><strong>SLA:</strong> {calcStats.sla}</span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="dot-green"></span>
                    <span><strong>Method:</strong> ISO-Compliant Sprint Loops</span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="dot-green"></span>
                    <span><strong>Support:</strong> Assigned Solutions Architect</span>
                  </div>
                </div>

                <button className="btn-proceed-step" onClick={() => setStep(2)}>
                  Book Free Consultation
                </button>

                {/* Direct Contact Information Card */}
                <div className="contact-info-card-calc">
                  <div className="contact-info-title">Direct Contact Information</div>
                  <div className="contact-info-content">
                    <a href="tel:8237140776" className="contact-link-item">
                      <Phone size={14} className="contact-icon-green" />
                      <span>+91 8237140776</span>
                    </a>
                    <a href="mailto:omnetatech@gmail.com" className="contact-link-item">
                      <Mail size={14} className="contact-icon-blue" />
                      <span>omnetatech@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Contact Form */}
        {step === 2 && (
          <form className="modal-step-body" onSubmit={handleFormSubmit}>
            <div className="contact-form-modal">
              <div className="form-info-strip">
                Project Scope Selected: <span className="text-cyan">Pillar: {service.toUpperCase()} &mdash; Budget: {getBudgetLabel(budget)} &mdash; Duration: {timeline} months</span>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label">Your Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="form-input-text" 
                    placeholder="E.g. Charles Sterling"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Company Name *</label>
                  <input 
                    type="text" 
                    name="company" 
                    required 
                    className="form-input-text" 
                    placeholder="E.g. Sterling Capital Group"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field full-width">
                  <label className="field-label">Corporate Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="form-input-text" 
                    placeholder="E.g. c.sterling@sterlingcap.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field full-width">
                  <label className="field-label">Project Details / Notes (Optional)</label>
                  <textarea 
                    name="note" 
                    rows="3" 
                    className="form-textarea-text" 
                    placeholder="Describe specific integrations, migration requirements, or dataset targets..."
                    value={formData.note}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <div className="form-actions-row">
                <button type="button" className="btn-back-step" onClick={() => setStep(1)}>
                  Modify Specifications
                </button>
                <button type="submit" className="btn-submit-form" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Securing Booking...</span>
                    </>
                  ) : (
                    <span>Schedule Consultation</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="modal-step-body success-body">
            <CheckCircle2 size={64} className="success-icon-svg" />
            <h4 className="success-heading">Consultation Scheduled Successfully</h4>
            <p className="success-desc">
              Thank you, <strong>{formData.name}</strong>. An email confirmation has been sent to <strong>{formData.email}</strong>. One of our Enterprise Solutions Architects will contact you within the next 4 hours with an initial architectural brief for <strong>{formData.company}</strong>.
            </p>
            
            <div className="success-summary-box">
              <div className="summary-title">Scope Specification Summary:</div>
              <div className="summary-line">Pillar: <span className="text-cyan">{service.toUpperCase()}</span></div>
              <div className="summary-line">Budget Tier: <span className="text-cyan">{getBudgetLabel(budget)}</span></div>
              <div className="summary-line">Timeline: <span className="text-cyan">{timeline} Months</span></div>
              <div className="summary-line">Guaranteed SLA: <span className="text-cyan">{calcStats.sla}</span></div>
            </div>

            <button className="btn-success-close" onClick={resetAndClose}>
              Return to Website
            </button>
          </div>
        )}

      </div>

      <style>{`
        .modal-backdrop {
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
          z-index: 2100;
        }

        .modal-content {
          background: var(--color-navy);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: var(--border-radius-lg);
          max-width: 800px;
          width: 100%;
          overflow: hidden;
          position: relative;
          animation: modalAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          padding: 24px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .modal-header-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .modal-title {
          font-size: 1.5rem;
          color: var(--color-white-pure);
          font-weight: 800;
          margin-top: 4px;
        }

        .btn-close-modal {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: var(--color-gray-dark);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-close-modal:hover {
          color: var(--color-white-pure);
        }

        .modal-step-body {
          padding: 32px;
        }

        /* Configurator Grid Layout */
        .configurator-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
        }

        .configurator-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .config-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .config-label {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          font-weight: 600;
        }

        .config-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .config-options-grid.cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .config-opt-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-white-pure);
          padding: 10px 8px;
          font-family: var(--font-primary);
          font-size: 0.8rem;
          font-weight: 500;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: center;
        }

        .config-opt-btn:hover, .config-opt-btn.active {
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.1);
          color: var(--color-cyan);
        }

        /* Calculator Display column */
        .configurator-calculator {
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .calculator-heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .calc-metrics-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .calc-metric-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-sm);
          padding: 12px;
          text-align: center;
        }

        .calc-metric-value {
          font-family: var(--font-title);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-cyan);
        }

        .calc-metric-title {
          font-size: 0.65rem;
          color: var(--color-gray-dark);
          margin-top: 4px;
        }

        .calc-details-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .calc-detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--color-gray-medium);
        }

        .dot-green {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
        }

        .btn-proceed-step {
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
          margin-top: auto;
        }

        .btn-proceed-step:hover {
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Direct Contact Card Styles */
        .contact-info-card-calc {
          margin-top: 20px;
          padding: 16px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .contact-info-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-cyan);
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .contact-info-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-link-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-white-pure);
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .contact-link-item:hover {
          color: var(--color-cyan);
          transform: translateX(2px);
        }

        .contact-icon-green {
          color: #10B981;
          flex-shrink: 0;
        }

        .contact-icon-blue {
          color: var(--color-cyan);
          flex-shrink: 0;
        }

        /* Form styling */
        .contact-form-modal {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-info-strip {
          background: rgba(0, 191, 255, 0.05);
          border: 1px solid rgba(0, 191, 255, 0.15);
          padding: 8px 16px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-medium);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field.full-width {
          grid-column: span 2;
        }

        .field-label {
          font-size: 0.8rem;
          color: var(--color-gray-medium);
          font-weight: 500;
        }

        .form-input-text {
          background: rgba(7, 20, 38, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-white-pure);
          padding: 10px 14px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          outline: none;
        }

        .form-input-text:focus, .form-textarea-text:focus {
          border-color: var(--color-cyan);
        }

        .form-textarea-text {
          background: rgba(7, 20, 38, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-white-pure);
          padding: 12px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          resize: none;
          outline: none;
        }

        .form-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .btn-back-step {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-gray-medium);
          padding: 12px 20px;
          font-size: 0.85rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
        }

        .btn-back-step:hover {
          color: var(--color-white-pure);
          border-color: var(--color-white-pure);
        }

        .btn-submit-form {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 12px 28px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition-fast);
        }

        .btn-submit-form:hover:not(:disabled) {
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
          transform: translateY(-2px);
        }

        .btn-submit-form:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Success screen styling */
        .success-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 48px;
        }

        .success-icon-svg {
          color: #10B981;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.2));
        }

        .success-heading {
          font-family: var(--font-title);
          font-size: 1.5rem;
          color: var(--color-white-pure);
          font-weight: 800;
          margin-bottom: 12px;
        }

        .success-desc {
          font-size: 0.95rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 32px;
        }

        .success-summary-box {
          background: rgba(7, 20, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 24px;
          width: 100%;
          max-width: 480px;
          margin-bottom: 36px;
          text-align: left;
        }

        .summary-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-dark);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .summary-line {
          font-size: 0.9rem;
          margin-bottom: 6px;
          color: var(--color-white-pure);
        }

        .btn-success-close {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 32px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-success-close:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
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

        @media (max-width: 768px) {
          .configurator-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-field.full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
