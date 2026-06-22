import { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeOffice, setActiveOffice] = useState('amer'); // 'amer' or 'apac' or 'emea'

  const offices = [
    {
      id: 'amer',
      name: 'Americas HQ',
      city: 'Seattle, USA',
      addr: '1201 Third Ave, Suite 3000',
      phone: '+1 (206) 555-0190',
      email: 'us.operations@omneta.com',
      mapPos: { top: '35%', left: '20%' }
    },
    {
      id: 'apac',
      name: 'APAC HQ',
      city: 'Singapore',
      addr: '10 Collyer Quay, Ocean Financial Centre',
      phone: '+65 6789 0120',
      email: 'apac.operations@omneta.com',
      mapPos: { top: '65%', left: '78%' }
    },
    {
      id: 'emea',
      name: 'Europe HQ',
      city: 'London, UK',
      addr: '30 St Mary Axe, The Gherkin',
      phone: '+44 (20) 7946 0958',
      email: 'eu.operations@omneta.com',
      mapPos: { top: '32%', left: '48%' }
    }
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setForm({ name: '', company: '', email: '', phone: '', msg: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        {/* Header */}
        <div className="contact-header">
          <div className="badge">Consultation Portal</div>
          <h2 className="contact-title">Initiate Your Transformation</h2>
          <p className="contact-sub">
            Ready to design your digital architecture? Complete the consultation form below, or reach out directly to one of our global headquarters.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="contact-grid">
          
          {/* Left Column: Form & Info */}
          <div className="contact-left-col">
            {!success ? (
              <form className="contact-form shadow-md" onSubmit={handleSubmit}>
                <h3 className="form-title-h3">Request Architecture Brief</h3>
                
                <div className="contact-form-grid">
                  <div className="form-field-wrapper">
                    <label className="contact-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="contact-text-input" 
                      placeholder="E.g. Elena Rostova"
                      value={form.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field-wrapper">
                    <label className="contact-label">Company Name *</label>
                    <input 
                      type="text" 
                      name="company" 
                      required 
                      className="contact-text-input" 
                      placeholder="E.g. Rostova Financials"
                      value={form.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field-wrapper">
                    <label className="contact-label">Corporate Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="contact-text-input" 
                      placeholder="E.g. e.rostova@rostova.com"
                      value={form.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field-wrapper">
                    <label className="contact-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      className="contact-text-input" 
                      placeholder="E.g. +1 (206) 555-0144"
                      value={form.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field-wrapper full-width">
                    <label className="contact-label">Message / Project Parameters *</label>
                    <textarea 
                      name="msg" 
                      required 
                      rows="4" 
                      className="contact-textarea" 
                      placeholder="Describe target databases, volume scales, current SLA challenges, and estimated start schedules..."
                      value={form.msg}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-contact-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting Files...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="contact-form shadow-md contact-success-body">
                <CheckCircle2 size={54} className="success-icon-svg" />
                <h3 className="form-title-h3" style={{ textAlign: 'center' }}>Request Transmitted</h3>
                <p className="contact-success-text">
                  Thank you. Your project brief has been logged inside our CRM database. A Solutions Architect representing your region will review your specifications and schedule a consultation within 4 hours.
                </p>
                <button className="btn-contact-reset" onClick={() => setSuccess(false)}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Global Locations & Interactive Map */}
          <div className="contact-right-col">
            
            {/* Interactive Office Map Simulation */}
            <div className="simulated-map shadow-md">
              {/* World Grid Lines */}
              <div className="grid-overlay"></div>
              
              {/* Pulsating Map Markers */}
              {offices.map((office) => (
                <div 
                  key={office.id} 
                  className={`simulated-map-marker ${activeOffice === office.id ? 'active-marker' : ''}`}
                  style={{ top: office.mapPos.top, left: office.mapPos.left }}
                  onMouseEnter={() => setActiveOffice(office.id)}
                >
                  {/* Tooltip on hover */}
                  <div className="simulated-map-label">
                    {office.city}
                  </div>
                </div>
              ))}

              {/* Map watermark world illustration */}
              <div className="world-map-bg" style={{ opacity: 0.1 }}></div>
            </div>

            {/* Office Directory details based on active id */}
            <div className="office-directory shadow-sm">
              <div className="directory-tabs">
                {offices.map(o => (
                  <button 
                    key={o.id}
                    className={`directory-tab-btn ${activeOffice === o.id ? 'active' : ''}`}
                    onClick={() => setActiveOffice(o.id)}
                  >
                    {o.name}
                  </button>
                ))}
              </div>

              <div className="active-office-details">
                <h4 className="active-office-title">{offices.find(o => o.id === activeOffice).city} Office</h4>
                <div className="active-office-info-item">
                  <MapPin size={16} className="office-icon" />
                  <span>{offices.find(o => o.id === activeOffice).addr}</span>
                </div>
                <div className="active-office-info-item">
                  <Phone size={16} className="office-icon" />
                  <span>{offices.find(o => o.id === activeOffice).phone}</span>
                </div>
                <div className="active-office-info-item">
                  <Mail size={16} className="office-icon" />
                  <span>{offices.find(o => o.id === activeOffice).email}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--color-white);
          color: #1E293B;
          padding: 100px 24px;
          position: relative;
        }

        .contact-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-navy-dark);
          margin-top: 16px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .contact-sub {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.6;
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
        }

        /* Contact Form Card */
        .contact-form {
          background: var(--color-white-pure);
          border: 1px solid rgba(7, 20, 38, 0.08);
          border-radius: var(--border-radius-lg);
          padding: 40px;
        }

        .form-title-h3 {
          font-family: var(--font-title);
          font-size: 1.5rem;
          color: var(--color-navy-dark);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        .form-field-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field-wrapper.full-width {
          grid-column: span 2;
        }

        .contact-label {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 600;
        }

        .contact-text-input {
          background: var(--color-gray-light);
          border: 1px solid var(--color-gray-medium);
          color: var(--color-navy-dark);
          padding: 12px 16px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          outline: none;
          transition: border var(--transition-fast);
        }

        .contact-text-input:focus, .contact-textarea:focus {
          border-color: var(--color-royal);
          background: var(--color-white-pure);
        }

        .contact-textarea {
          background: var(--color-gray-light);
          border: 1px solid var(--color-gray-medium);
          color: var(--color-navy-dark);
          padding: 12px 16px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          resize: none;
          outline: none;
          transition: border var(--transition-fast);
        }

        .btn-contact-submit {
          width: 100%;
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition-fast);
        }

        .btn-contact-submit:hover {
          box-shadow: 0 4px 15px rgba(109, 93, 252, 0.4);
          transform: translateY(-1px);
        }

        /* Success Page inside Card */
        .contact-success-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .success-icon-svg {
          color: #10B981;
          margin-bottom: 16px;
        }

        .contact-success-text {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .btn-contact-reset {
          background: none;
          border: 1px solid var(--color-royal);
          color: var(--color-royal);
          padding: 10px 20px;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
        }

        /* Right Column layout & Simulated Map */
        .contact-right-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .simulated-map {
          background-color: var(--color-navy-dark);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-lg);
          height: 320px;
          position: relative;
          overflow: hidden;
        }

        .simulated-map-marker {
          position: absolute;
          width: 14px;
          height: 14px;
          background: var(--color-cyan);
          border-radius: 50%;
          border: 2px solid var(--color-white-pure);
          box-shadow: 0 0 10px var(--color-cyan);
          cursor: pointer;
          z-index: 5;
        }

        .simulated-map-marker::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 1.5px solid var(--color-cyan);
          border-radius: 50%;
          animation: pulseGlow 2s infinite;
        }

        .simulated-map-label {
          position: absolute;
          background: var(--color-navy);
          color: var(--color-white-pure);
          padding: 4px 8px;
          border-radius: var(--border-radius-sm);
          font-size: 0.7rem;
          font-family: var(--font-mono);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -130%);
          pointer-events: none;
          white-space: nowrap;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .simulated-map-marker:hover .simulated-map-label {
          opacity: 1;
        }

        /* Directory panel */
        .office-directory {
          background: var(--color-gray-light);
          border: 1px solid var(--color-gray-medium);
          border-radius: var(--border-radius-md);
          padding: 24px;
        }

        .directory-tabs {
          display: flex;
          border-bottom: 1px solid var(--color-gray-medium);
          padding-bottom: 12px;
          margin-bottom: 16px;
          gap: 12px;
        }

        .directory-tab-btn {
          background: none;
          border: none;
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: var(--border-radius-sm);
        }

        .directory-tab-btn.active {
          color: var(--color-royal);
          background: rgba(15, 82, 186, 0.05);
        }

        .active-office-title {
          font-family: var(--font-title);
          font-size: 1.15rem;
          color: var(--color-navy-dark);
          margin-bottom: 12px;
          font-weight: 700;
        }

        .active-office-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 8px;
        }

        .office-icon {
          color: var(--color-royal);
          flex-shrink: 0;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
          }
          .form-field-wrapper.full-width {
            grid-column: span 1;
          }
          .contact-form {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
