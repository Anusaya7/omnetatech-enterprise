import { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, Send, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function BookConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = Configuration, 2 = Contact, 3 = Confirmation
  const [selectedService, setSelectedService] = useState('Software Development');
  const [projectTimeline, setProjectTimeline] = useState('Within 1 month');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const services = [
    'Software Development',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud & DevOps',
    'Automation & AI',
    'IT Consulting'
  ];

  const timelines = [
    'Immediate (within 2 weeks)',
    'Within 1 month',
    '1 - 3 months',
    'Exploring options'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.submitContact({
        fullName: formData.name,
        companyName: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: selectedService,
        message: `Requested Timeline: ${projectTimeline}\nProject Notes: ${formData.notes || 'None specified'}`
      });
      setStep(3);
    } catch (err) {
      console.error('Consultation submission error:', err);
      setErrorMessage(err.message || 'Submission failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setFormData({ name: '', company: '', email: '', phone: '', notes: '' });
    onClose();
  };

  return (
    <div className="consult-modal-backdrop" onClick={handleResetAndClose}>
      <div className="consult-modal-body shadow-xl" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="consult-modal-header">
          <div>
            <div className="badge">Direct Consultation</div>
            <h3 className="consult-modal-title">Get a Free Consultation</h3>
          </div>
          <button className="consult-close-btn" onClick={handleResetAndClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Service & Timeline Selection */}
        {step === 1 && (
          <div className="consult-modal-content">
            <div className="consult-intro-text">
              Tell us about your project requirements to help us prepare for our discussion.
            </div>

            <div className="consult-step-group">
              <label className="consult-group-label">1. Select Service Required</label>
              <div className="consult-pills-grid">
                {services.map((svc, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`consult-pill-btn ${selectedService === svc ? 'active-pill' : ''}`}
                    onClick={() => setSelectedService(svc)}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            <div className="consult-step-group">
              <label className="consult-group-label">2. Target Timeline</label>
              <div className="consult-pills-grid">
                {timelines.map((tm, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`consult-pill-btn ${projectTimeline === tm ? 'active-pill' : ''}`}
                    onClick={() => setProjectTimeline(tm)}
                  >
                    {tm}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Contact strip */}
            <div className="consult-direct-strip">
              <div className="direct-strip-title">Prefer to call or email directly?</div>
              <div className="direct-strip-links">
                <a href="tel:+918237140776" className="direct-strip-link">
                  <Phone size={14} />
                  <span>+91 8237140776</span>
                </a>
                <a href="mailto:omnetatech@gmail.com" className="direct-strip-link">
                  <Mail size={14} />
                  <span>omnetatech@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="consult-modal-actions">
              <button 
                type="button" 
                className="btn-primary-blue w-full"
                onClick={() => setStep(2)}
              >
                <span>Continue to Contact Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <form onSubmit={handleFormSubmit} className="consult-modal-content">
            <div className="consult-selection-summary">
              Selected: <strong>{selectedService}</strong> • Timeline: <strong>{projectTimeline}</strong>
            </div>

            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                marginBottom: '16px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #F87171',
                borderRadius: '6px',
                color: '#991B1B',
                fontSize: '0.85rem'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="form-two-cols">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Full name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Organization</label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Business name"
                  className="form-input"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-two-cols">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Details / Goals (Optional)</label>
              <textarea 
                name="notes"
                rows="3"
                placeholder="Briefly describe your requirements or any specific questions you have..."
                className="form-textarea"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="consult-modal-actions-split">
              <button 
                type="button" 
                className="btn-secondary-outline"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn-primary-blue"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Confirm Consultation Request'}</span>
                <Send size={15} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="consult-modal-content consult-success-wrap animate-fade-in">
            <CheckCircle2 size={54} className="consult-success-icon" />
            <h4 className="success-heading">Consultation Request Received</h4>
            <p className="success-desc">
              Thank you, <strong>{formData.name}</strong>. Our engineering team has received your request for <strong>{selectedService}</strong>. We will get in touch with you shortly at <strong>{formData.email}</strong>.
            </p>
            <div className="direct-assistance-note">
              For immediate questions, call us directly at <a href="tel:+918237140776" className="text-link">+91 8237140776</a>.
            </div>
            <button className="btn-primary-blue mt-4" onClick={handleResetAndClose}>
              Return to Website
            </button>
          </div>
        )}

      </div>

      <style>{`
        .consult-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 31, 58, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 2200;
        }

        .consult-modal-body {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          max-width: 640px;
          width: 100%;
          border: 1px solid var(--color-border);
          overflow: hidden;
          animation: fadeIn 0.25s ease-out;
        }

        .consult-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--color-border);
        }

        .consult-modal-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-top: 4px;
        }

        .consult-close-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .consult-close-btn:hover {
          color: var(--color-primary-navy);
        }

        .consult-modal-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .consult-intro-text {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
        }

        .consult-step-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .consult-group-label {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--color-primary-navy);
        }

        .consult-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .consult-pill-btn {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-primary-navy);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .consult-pill-btn:hover {
          border-color: var(--color-primary-blue);
          color: var(--color-primary-blue);
        }

        .active-pill {
          background: var(--color-light-blue) !important;
          border-color: var(--color-primary-blue) !important;
          color: var(--color-primary-blue) !important;
          font-weight: 600 !important;
        }

        /* Direct Strip */
        .consult-direct-strip {
          background: #F8FAFD;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
        }

        .direct-strip-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }

        .direct-strip-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .direct-strip-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          text-decoration: none;
        }

        .direct-strip-link:hover {
          text-decoration: underline;
        }

        .consult-selection-summary {
          background: var(--color-light-blue);
          border: 1px solid rgba(23, 105, 224, 0.2);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          color: var(--color-primary-navy);
        }

        .form-two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-primary-navy);
        }

        .form-input,
        .form-textarea {
          padding: 10px 14px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.88rem;
          color: var(--color-text);
          outline: none;
        }

        .form-input:focus,
        .form-textarea:focus {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
        }

        .form-textarea {
          resize: vertical;
        }

        .consult-modal-actions {
          margin-top: 8px;
        }

        .consult-modal-actions-split {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .w-full {
          width: 100%;
        }

        .consult-success-wrap {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 24px;
        }

        .consult-success-icon {
          color: var(--color-success);
          margin-bottom: 16px;
        }

        .success-heading {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .success-desc {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 480px;
          margin-bottom: 16px;
        }

        .direct-assistance-note {
          font-size: 0.84rem;
          color: var(--color-text-secondary);
        }

        .text-link {
          color: var(--color-primary-blue);
          font-weight: 600;
          text-decoration: underline;
        }

        .mt-4 {
          margin-top: 20px;
        }

        @media (max-width: 600px) {
          .form-two-cols {
            grid-template-columns: 1fr;
          }
          .consult-modal-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
