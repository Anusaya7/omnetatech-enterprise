import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Shield, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function ContactSection() {
  const { content } = useCms();
  const contactInfo = content?.contact || {};

  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: 'Software Development',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [createdEnquiryId, setCreatedEnquiryId] = useState(null);

  const servicesList = [
    'Software Development',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud & DevOps',
    'Automation & AI',
    'IT Consulting',
    'Other'
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.submitContact(form);
      if (res.success) {
        setCreatedEnquiryId(res.enquiryId);
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.message || 'An error occurred while submitting. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setCreatedEnquiryId(null);
    setForm({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      service: 'Software Development',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact-root section section-navy">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="badge contact-badge">Get in Touch</div>
          <h2 className="section-title contact-title">Let's Build Something Great Together</h2>
          <p className="section-subtitle contact-subtitle">
            Have a project, business requirement or technology challenge? Talk to the OmNetaTech team.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="contact-main-grid">
          
          {/* Left Column: Direct Contact Information */}
          <div className="contact-info-panel shadow-sm">
            <h3 className="panel-heading">Direct Contact Information</h3>
            <p className="panel-sub">
              Reach out directly to our engineering and consulting team for project inquiries, technical evaluations, or partnership discussions.
            </p>

            <div className="contact-methods-list">
              {/* Phone */}
              <a href={`tel:${contactInfo.phone || '+918237140776'}`} className="contact-method-card">
                <div className="method-icon-box">
                  <Phone size={20} />
                </div>
                <div className="method-details">
                  <div className="method-label">Call or WhatsApp</div>
                  <div className="method-value">{contactInfo.phone || '+91 8237140776'}</div>
                  <div className="method-note">{contactInfo.supportHours || 'Available Mon – Sat, 9:30 AM – 6:30 PM IST'}</div>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${contactInfo.email || 'omnetatech@gmail.com'}`} className="contact-method-card">
                <div className="method-icon-box">
                  <Mail size={20} />
                </div>
                <div className="method-details">
                  <div className="method-label">Official Email</div>
                  <div className="method-value">{contactInfo.email || 'omnetatech@gmail.com'}</div>
                  <div className="method-note">For project briefs, RFP inquiries & resumes</div>
                </div>
              </a>

              {/* Location */}
              <div className="contact-method-card static-method">
                <div className="method-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="method-details">
                  <div className="method-label">Headquarters Location</div>
                  <div className="method-value">{contactInfo.country || 'India'}</div>
                  <div className="method-note">Serving clients across India & global regions</div>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="contact-trust-points">
              <div className="trust-point-row">
                <Clock size={16} className="trust-icon" />
                <span>Quick Response: We respond to enquiries within 1 business day</span>
              </div>
              <div className="trust-point-row">
                <Shield size={16} className="trust-icon" />
                <span>NDA & Confidentiality: Your project ideas and data remain strictly confidential</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Generation Form */}
          <div className="contact-form-panel shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="contact-form-inner">
                <h3 className="form-heading">Send Us an Enquiry</h3>
                <p className="form-sub">Fill out the form below and our team will get in touch with you shortly.</p>

                {errorMessage && (
                  <div className="form-error-alert" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    marginBottom: '20px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #F87171',
                    borderRadius: '8px',
                    color: '#991B1B',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-inputs-grid">
                  
                  {/* Full Name */}
                  <div className="form-control-group">
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input 
                      id="fullName"
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Your full name"
                      className="form-input"
                      value={form.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Company Name */}
                  <div className="form-control-group">
                    <label className="form-label" htmlFor="companyName">Company Name</label>
                    <input 
                      id="companyName"
                      type="text" 
                      name="companyName"
                      placeholder="Your business or organization"
                      className="form-input"
                      value={form.companyName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="form-control-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email"
                      required
                      placeholder="name@example.com"
                      className="form-input"
                      value={form.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-control-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input 
                      id="phone"
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={form.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Service Required Dropdown */}
                  <div className="form-control-group full-span">
                    <label className="form-label" htmlFor="service">Service Required *</label>
                    <select 
                      id="service"
                      name="service"
                      required
                      className="form-select"
                      value={form.service}
                      onChange={handleInputChange}
                    >
                      {servicesList.map((svc, i) => (
                        <option key={i} value={svc}>{svc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="form-control-group full-span">
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows="4"
                      placeholder="Tell us about your project requirements, target timeline, or technology challenge..."
                      className="form-textarea"
                      value={form.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                </div>

                <button 
                  type="submit" 
                  className="btn-primary-blue form-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="contact-success-view animate-fade-in">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={54} />
                </div>
                <h3 className="success-title">Enquiry Received</h3>
                <p className="success-message">
                  Thank you! Your enquiry has been received. Our team will get in touch with you soon.
                </p>
                <div className="success-meta-box">
                  {createdEnquiryId && (
                    <div style={{ color: 'var(--color-primary-blue)', fontWeight: 600, paddingBottom: '6px', borderBottom: '1px solid var(--color-border)', marginBottom: '8px' }}>
                      <strong>Reference ID:</strong> {createdEnquiryId}
                    </div>
                  )}
                  <div><strong>Name:</strong> {form.fullName}</div>
                  <div><strong>Service:</strong> {form.service}</div>
                  <div><strong>Email:</strong> {form.email}</div>
                  {form.phone && <div><strong>Phone:</strong> {form.phone}</div>}
                </div>
                <button className="btn-secondary-outline" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .contact-root {
          background-color: #0B1F3A;
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(23, 105, 224, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(47, 128, 237, 0.14) 0%, transparent 45%),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        .contact-badge {
          background: rgba(23, 105, 224, 0.25);
          color: #93C5FD;
          border: 1px solid rgba(147, 197, 253, 0.3);
        }

        .contact-title {
          color: #FFFFFF !important;
        }

        .contact-subtitle {
          color: #CBD5E1 !important;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 36px;
        }

        /* Left Info Panel */
        .contact-info-panel {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 36px;
          display: flex;
          flex-direction: column;
        }

        .panel-heading {
          font-size: 1.45rem;
          color: #FFFFFF;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .panel-sub {
          font-size: 0.88rem;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .contact-methods-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .contact-method-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .contact-method-card:not(.static-method):hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: #60A5FA;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }

        .method-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(23, 105, 224, 0.25);
          color: #60A5FA;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-label {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #94A3B8;
        }

        .method-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-top: 2px;
          margin-bottom: 2px;
        }

        .method-note {
          font-size: 0.78rem;
          color: #CBD5E1;
        }

        .contact-trust-points {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .trust-point-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: #E2E8F0;
          font-weight: 500;
        }

        .trust-icon {
          color: #60A5FA;
          flex-shrink: 0;
        }

        /* Right Form Panel: Clean White Elevated Card */
        .contact-form-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.45);
        }

        .form-heading {
          font-size: 1.45rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .form-sub {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }

        .form-inputs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }

        .form-control-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-control-group.full-span {
          grid-column: span 2;
        }

        .form-label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-primary-navy);
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          min-height: 46px;
          padding: 12px 14px;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.9rem;
          color: var(--color-text);
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          background: #FFFFFF;
          border-color: var(--color-primary-blue);
          box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.15);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 0.96rem;
          border-radius: var(--radius-sm);
        }

        /* Success View */
        .contact-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon-wrap {
          color: var(--color-success);
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-bottom: 10px;
        }

        .success-message {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 24px;
        }

        .success-meta-box {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 16px;
          text-align: left;
          font-size: 0.85rem;
          color: var(--color-text);
          line-height: 1.8;
          width: 100%;
          max-width: 400px;
          margin-bottom: 24px;
        }

        @media (max-width: 960px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .form-inputs-grid {
            grid-template-columns: 1fr;
          }
          .form-control-group.full-span {
            grid-column: span 1;
          }
          .contact-form-panel {
            padding: 24px;
          }
          .contact-info-panel {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
