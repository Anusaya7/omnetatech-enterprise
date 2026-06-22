import { useState } from 'react';
import { Briefcase, MapPin, Clock, Check, Send, CheckCircle2, Loader2, X } from 'lucide-react';

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [activeJobId, setActiveJobId] = useState(null);
  const [appliedJob, setAppliedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', linkedin: '', resume: null });

  const jobs = [
    {
      id: 1,
      title: 'Lead AI Research Engineer',
      dept: 'engineering',
      location: 'Singapore (Hybrid)',
      type: 'Full-Time',
      experience: '6+ Years',
      salary: '₹35L - ₹50L P.A.',
      summary: 'Lead developer sprints focused on multi-agent cognitive loops, private LLM fine-tuning, and scalable RAG indexing databases.',
      requirements: [
        'Strong background in PyTorch, HuggingFace tools, and LangChain/LlamaIndex frameworks.',
        'Experience deploying custom transformer models inside security-hardened container networks.',
        'MS or PhD in Computer Science, Machine Learning, or related field.'
      ]
    },
    {
      id: 2,
      title: 'Senior DevSecOps Orchestrator',
      dept: 'security',
      location: 'Seattle, USA (Hybrid)',
      type: 'Full-Time',
      experience: '5+ Years',
      salary: '₹28L - ₹40L P.A.',
      summary: 'Design and deploy automated security verification networks and infrastructure-as-code scripts for multi-cloud deployments.',
      requirements: [
        'Deep command of Terraform, Docker, Kubernetes, and GitLab CI/CD systems.',
        'Experience aligning cloud deployments with ISO 27001, SOC 2, or HIPAA compliance metrics.',
        'Active certification in AWS Security or Certified Kubernetes Administrator (CKA).'
      ]
    },
    {
      id: 3,
      title: 'Enterprise Solutions Architect',
      dept: 'solutions',
      location: 'London, UK (Hybrid)',
      type: 'Full-Time',
      experience: '7+ Years',
      salary: '₹40L - ₹60L P.A.',
      summary: 'Direct client-facing consulting, mapping complex corporate software structures, and drafting technical architecture outlines.',
      requirements: [
        'Proven track record leading massive migration or API unification schedules for enterprise clients.',
        'Strong architecture design credentials (AWS Certified Solutions Architect Professional or equivalent).',
        'Exceptional stakeholder presentation and technical writing capabilities.'
      ]
    }
  ];

  const handleApplyClick = (job) => {
    setAppliedJob(job);
    setSubmitSuccess(false);
  };

  const handleFormChange = (e) => {
    setAppForm({ ...appForm, [e.target.name]: e.target.value });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const filteredJobs = selectedDept === 'all' 
    ? jobs 
    : jobs.filter(j => j.dept === selectedDept);

  return (
    <div className="careers-page-wrapper">
      <div className="grid-overlay"></div>
      
      {/* Hero Recruitment Banner */}
      <div className="careers-hero container">
        <div className="badge">Careers at OmNetaTech</div>
        <h1 className="careers-hero-title">
          Build the Infrastructure of <br />
          <span className="text-gradient">Tomorrow</span>
        </h1>
        <p className="careers-hero-sub">
          We are seeking systems thinkers, security specialists, and machine learning researchers. Join a team dedicated to engineering high-availability corporate architectures and next-gen AI pipelines.
        </p>
      </div>

      {/* Open Openings Portal */}
      <section className="open-positions container">
        <div className="positions-header">
          <h2 className="pos-title">Open Positions</h2>
          
          {/* Department Filter buttons */}
          <div className="dept-tabs">
            <button className={`dept-btn ${selectedDept === 'all' ? 'active' : ''}`} onClick={() => setSelectedDept('all')}>All Roles</button>
            <button className={`dept-btn ${selectedDept === 'engineering' ? 'active' : ''}`} onClick={() => setSelectedDept('engineering')}>AI Engineering</button>
            <button className={`dept-btn ${selectedDept === 'security' ? 'active' : ''}`} onClick={() => setSelectedDept('security')}>Cybersecurity</button>
            <button className={`dept-btn ${selectedDept === 'solutions' ? 'active' : ''}`} onClick={() => setSelectedDept('solutions')}>Solutions & Architecture</button>
          </div>
        </div>

        {/* Jobs Card Grid */}
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card shadow-md">
              <div className="job-header">
                <div className="job-info-left">
                  <h3 className="job-title-h3">{job.title}</h3>
                  <div className="job-tags">
                    <span className="job-tag-item"><MapPin size={12} /> {job.location}</span>
                    <span className="job-tag-item"><Clock size={12} /> {job.type}</span>
                    <span className="job-tag-item"><Briefcase size={12} /> {job.experience}</span>
                  </div>
                </div>
                <div className="job-salary">{job.salary}</div>
              </div>

              <p className="job-summary-p">{job.summary}</p>

              {/* Show requirements if details opened */}
              {activeJobId === job.id && (
                <div className="job-requirements-drawer">
                  <h4 className="req-title">Core Candidate Parameters:</h4>
                  <ul className="req-list">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="req-item">
                        <Check size={14} className="req-check-icon" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="job-actions-row">
                <button 
                  className="btn-details-toggle"
                  onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                >
                  {activeJobId === job.id ? 'Hide Specifications' : 'View Specifications'}
                </button>
                <button className="btn-apply-job" onClick={() => handleApplyClick(job)}>
                  Apply Online
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs Application Modal Form */}
      {appliedJob && (
        <div className="modal-backdrop" onClick={() => setAppliedJob(null)}>
          <div className="modal-content shadow-premium" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-badge">Online Candidate Portal</div>
              <h3 className="modal-title">Application: {appliedJob.title}</h3>
              <button className="btn-close-modal" onClick={() => setAppliedJob(null)}>
                <X size={20} />
              </button>
            </div>

            {!submitSuccess ? (
              <form className="modal-step-body" onSubmit={handleApplySubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="form-input-text" 
                      placeholder="E.g. Elena Moreau"
                      value={appForm.name}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="form-input-text" 
                      placeholder="E.g. e.moreau@domain.com"
                      value={appForm.email}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Contact Phone *</label>
                    <input 
                      type="text" 
                      name="phone" 
                      required 
                      className="form-input-text" 
                      placeholder="+65 9123 4567"
                      value={appForm.phone}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">LinkedIn URL *</label>
                    <input 
                      type="url" 
                      name="linkedin" 
                      required 
                      className="form-input-text" 
                      placeholder="https://linkedin.com/in/username"
                      value={appForm.linkedin}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Resume Link / Portfolio *</label>
                    <input 
                      type="text" 
                      name="resume" 
                      required 
                      className="form-input-text" 
                      placeholder="E.g. Link to hosted PDF or Google Drive file"
                      value={appForm.resume || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-actions-row">
                  <button type="button" className="btn-back-step" onClick={() => setAppliedJob(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-form" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Uploading Files...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-step-body success-body">
                <CheckCircle2 size={64} className="success-icon-svg" />
                <h4 className="success-heading">Application Recieved</h4>
                <p className="success-desc">
                  Thank you, <strong>{appForm.name}</strong>. Your portfolio and candidacy file for <strong>{appliedJob.title}</strong> has been secured in our recruiters registry. Our HR team will reach out via <strong>{appForm.email}</strong> within 3 business days.
                </p>
                <button className="btn-success-close" onClick={() => setAppliedJob(null)}>
                  Close Portal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .careers-page-wrapper {
          position: relative;
          background-color: var(--color-navy-dark);
          color: var(--color-white-pure);
          padding-top: 120px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        .careers-hero {
          text-align: center;
          max-width: 800px;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .careers-hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-top: 16px;
          margin-bottom: 24px;
        }

        .careers-hero-sub {
          font-size: 1.15rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Positions Section */
        .open-positions {
          margin-bottom: 60px;
        }

        .positions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 24px;
          margin-bottom: 40px;
        }

        .pos-title {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .dept-tabs {
          display: flex;
          gap: 10px;
        }

        .dept-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-gray-dark);
          padding: 8px 16px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .dept-btn:hover, .dept-btn.active {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.08);
        }

        /* Jobs Listing cards */
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .job-card {
          background: rgba(13, 34, 60, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 32px;
          transition: all 0.3s ease;
        }

        .job-card:hover {
          border-color: rgba(0, 191, 255, 0.2);
          background: rgba(13, 34, 60, 0.45);
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .job-title-h3 {
          font-size: 1.35rem;
          color: var(--color-white-pure);
          font-weight: 700;
          margin-bottom: 8px;
        }

        .job-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .job-tag-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-dark);
        }

        .job-salary {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--color-cyan);
          font-size: 1rem;
        }

        .job-summary-p {
          font-size: 0.9rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        /* Requirements Drawer */
        .job-requirements-drawer {
          background: rgba(7, 20, 38, 0.4);
          border-radius: var(--border-radius-sm);
          padding: 20px;
          margin-bottom: 24px;
          border-left: 3px solid var(--color-cyan);
        }

        .req-title {
          font-family: var(--font-title);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-white-pure);
          margin-bottom: 12px;
        }

        .req-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .req-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
        }

        .req-check-icon {
          color: var(--color-cyan);
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* Actions row */
        .job-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-details-toggle {
          background: none;
          border: none;
          color: var(--color-gray-dark);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-details-toggle:hover {
          color: var(--color-white-pure);
        }

        .btn-apply-job {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.85rem;
          padding: 10px 24px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-apply-job:hover {
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .positions-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .dept-tabs {
            flex-wrap: wrap;
          }
          .job-header {
            flex-direction: column;
            gap: 12px;
          }
          .job-salary {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
