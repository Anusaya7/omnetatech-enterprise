import { useState } from 'react';
import { 
  Code, Smartphone, Palette, Cloud, Send, 
  CheckCircle2, MapPin, X, AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function CareersPage() {
  const { careers: dynamicCareers } = useCms();

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeForm, setResumeForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: 'Full-Stack Web Development',
    linkedinOrPortfolio: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const defaultFocusAreas = [
    {
      title: 'Full-Stack Web Development',
      icon: Code,
      desc: 'Building responsive web platforms, modern frontend applications, and clean backend API services using React, Node.js, and modern ecosystems.'
    },
    {
      title: 'Mobile App Development',
      icon: Smartphone,
      desc: 'Crafting performant cross-platform and native mobile applications for Android and iOS using Flutter or React Native.'
    },
    {
      title: 'UI/UX & Interface Design',
      icon: Palette,
      desc: 'Designing intuitive user experiences, wireframes, high-fidelity mockups, and modular design systems using Figma.'
    },
    {
      title: 'Backend & Cloud Engineering',
      icon: Cloud,
      desc: 'Architecting relational and NoSQL databases, RESTful web services, automated deployment pipelines, and cloud hosting setups.'
    }
  ];

  const focusAreas = dynamicCareers && dynamicCareers.length > 0 
    ? dynamicCareers.map(c => ({
        id: c.id,
        title: c.title,
        icon: c.title.toLowerCase().includes('mobile') ? Smartphone : c.title.toLowerCase().includes('design') ? Palette : c.title.toLowerCase().includes('cloud') ? Cloud : Code,
        desc: c.description,
        location: c.location || 'India (Remote / Hybrid)',
        type: c.type || 'Full-Time',
        requirements: c.requirements
      }))
    : defaultFocusAreas;

  const cultureValues = [
    {
      title: 'Clean Engineering Focus',
      desc: 'We value code readability, automated testing, and thoughtful software architecture over rushed shortcuts.'
    },
    {
      title: 'Direct Ownership',
      desc: 'Engineers and designers have a meaningful voice in project decisions and direct impact on real business outcomes.'
    },
    {
      title: 'Continuous Learning',
      desc: 'Work with modern frameworks, solve diverse engineering challenges, and expand your technical skill set.'
    },
    {
      title: 'Respectful Collaboration',
      desc: 'A collaborative, transparent work culture with healthy communication and respect for work-life balance.'
    }
  ];

  const handleFormChange = (e) => {
    setResumeForm({ ...resumeForm, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmitResume = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.submitCareerApplication({
        fullName: resumeForm.fullName,
        email: resumeForm.email,
        phone: resumeForm.phone,
        role: resumeForm.expertise,
        experience: 'Online Application',
        portfolioUrl: resumeForm.linkedinOrPortfolio,
        notes: resumeForm.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Career application submission error:', err);
      setErrorMessage(err.message || 'Submission failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsResumeModalOpen(false);
    setSubmitted(false);
    setResumeForm({
      fullName: '',
      email: '',
      phone: '',
      expertise: 'Full-Stack Web Development',
      linkedinOrPortfolio: '',
      message: ''
    });
  };

  return (
    <div className="careers-root">
      
      {/* Hero */}
      <section className="careers-hero-section section-white">
        <div className="container careers-hero-inner">
          <div className="badge">Join Our Team</div>
          <h1 className="careers-hero-title">Career Opportunities</h1>
          <p className="careers-hero-lead">
            We're always interested in connecting with talented developers, designers and technology professionals.
          </p>
          <div className="careers-cta-row">
            <button 
              className="btn-primary-blue"
              onClick={() => setIsResumeModalOpen(true)}
            >
              <span>Send Your Resume</span>
              <Send size={16} />
            </button>
            <a href="mailto:omnetatech@gmail.com" className="btn-secondary-outline">
              <span>Email omnetatech@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Talent Areas */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="badge">Areas of Interest</div>
            <h2 className="section-title">Roles & Technical Domains</h2>
            <p className="section-subtitle">
              Whether you are an experienced software engineer, mobile developer, or UI/UX designer based in India, we would love to hear from you.
            </p>
          </div>

          <div className="focus-areas-grid">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div key={idx} className="focus-area-card shadow-sm">
                  <div className="focus-icon-box">
                    <Icon size={22} />
                  </div>
                  <h3 className="focus-area-title">{area.title}</h3>
                  <p className="focus-area-desc">{area.desc}</p>
                  <div className="focus-location-pill">
                    <MapPin size={13} />
                    <span>India (Remote / Hybrid)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Work With OmNetaTech */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="badge">Our Culture</div>
            <h2 className="section-title">Why Build Your Career at OmNetaTech?</h2>
            <p className="section-subtitle">
              We provide an environment where engineers and designers do meaningful work, learn modern methodologies, and build lasting software.
            </p>
          </div>

          <div className="culture-values-grid">
            {cultureValues.map((v, i) => (
              <div key={i} className="culture-card shadow-sm">
                <div className="culture-num">0{i + 1}</div>
                <h3 className="culture-title">{v.title}</h3>
                <p className="culture-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="resume-modal-backdrop" onClick={handleCloseModal}>
          <div className="resume-modal-body shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div>
                <div className="badge">Candidate Contact</div>
                <h3 className="modal-title">Send Your Resume</h3>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmitResume} className="modal-form-content">
                <p className="modal-intro">
                  Share your contact details and background. You can also email your resume directly to <a href="mailto:omnetatech@gmail.com" className="text-link">omnetatech@gmail.com</a>.
                </p>

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
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Your full name"
                      className="form-input"
                      value={resumeForm.fullName}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="name@example.com"
                      className="form-input"
                      value={resumeForm.email}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-two-cols">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={resumeForm.phone}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Expertise *</label>
                    <select 
                      name="expertise"
                      className="form-select"
                      value={resumeForm.expertise}
                      onChange={handleFormChange}
                    >
                      <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                      <option value="Frontend / React Development">Frontend / React Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                      <option value="Backend & Cloud Engineering">Backend & Cloud Engineering</option>
                      <option value="QA & Testing">QA & Testing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn Profile or Portfolio Link *</label>
                  <input 
                    type="url" 
                    name="linkedinOrPortfolio"
                    required
                    placeholder="https://linkedin.com/in/username or portfolio link"
                    className="form-input"
                    value={resumeForm.linkedinOrPortfolio}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Cover Note</label>
                  <textarea 
                    name="message"
                    rows="3"
                    placeholder="Briefly tell us about your experience and the kind of work you enjoy doing..."
                    className="form-textarea"
                    value={resumeForm.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>

                <div className="modal-actions-bar">
                  <button type="button" className="btn-secondary-outline" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-blue" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Details'}</span>
                    <Send size={15} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-success-content animate-fade-in">
                <CheckCircle2 size={52} className="success-icon" />
                <h4 className="success-title">Thank You, {resumeForm.fullName}!</h4>
                <p className="success-desc">
                  Your details have been received. You may also forward an updated PDF copy of your CV directly to <a href="mailto:omnetatech@gmail.com" className="text-link">omnetatech@gmail.com</a>. We will be in touch when suitable opportunities match your background.
                </p>
                <button className="btn-primary-blue" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .careers-root {
          background-color: var(--color-bg);
        }

        .careers-hero-section {
          padding: 80px 0 60px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .careers-hero-inner {
          text-align: center;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .careers-hero-title {
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          color: var(--color-primary-navy);
          font-weight: 800;
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .careers-hero-lead {
          font-size: clamp(1.05rem, 1.25vw, 1.15rem);
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin-bottom: 30px;
        }

        .careers-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Focus Areas Grid */
        .focus-areas-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .focus-area-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-fast);
        }

        .focus-area-card:hover {
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .focus-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .focus-area-title {
          font-size: 1.15rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .focus-area-desc {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
          flex-grow: 1;
        }

        .focus-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--color-primary-navy);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        /* Culture Values */
        .culture-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .culture-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
        }

        .culture-num {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-primary-blue);
          margin-bottom: 12px;
        }

        .culture-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 8px;
        }

        .culture-desc {
          font-size: 0.86rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Modal */
        .resume-modal-backdrop {
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
          z-index: 2100;
        }

        .resume-modal-body {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          max-width: 620px;
          width: 100%;
          border: 1px solid var(--color-border);
          overflow: hidden;
          animation: fadeIn 0.25s ease-out;
        }

        .resume-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          margin-top: 4px;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .modal-form-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-intro {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
          margin-bottom: 8px;
        }

        .text-link {
          color: var(--color-primary-blue);
          font-weight: 600;
          text-decoration: underline;
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
        .form-select,
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
        .form-select:focus,
        .form-textarea:focus {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
        }

        .form-textarea {
          resize: vertical;
        }

        .modal-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 10px;
        }

        .modal-success-content {
          padding: 44px 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon {
          color: var(--color-success);
          margin-bottom: 16px;
        }

        .success-title {
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
          margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
          .focus-areas-grid,
          .culture-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .focus-areas-grid,
          .culture-values-grid {
            grid-template-columns: 1fr;
          }
          .form-two-cols {
            grid-template-columns: 1fr;
          }
          .modal-form-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
