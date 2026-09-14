import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ isOpen, type, onClose }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="legal-modal-backdrop" onClick={onClose}>
      <div className="legal-modal-body shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <div className="legal-header-left">
            <ShieldCheck size={22} className="legal-shield-icon" />
            <h3 className="legal-modal-title">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button className="legal-close-btn" onClick={onClose} aria-label="Close legal modal">
            <X size={20} />
          </button>
        </div>

        <div className="legal-modal-scroll">
          {isPrivacy ? (
            <div className="legal-text-flow">
              <p className="legal-updated">Last Updated: September 2026</p>
              
              <h4>1. Introduction</h4>
              <p>
                OmNetaTech ("we", "our", or "us") respects your privacy and is committed to protecting the personal data of visitors and clients who access our website and technology consulting services in India and worldwide.
              </p>

              <h4>2. Information We Collect</h4>
              <p>
                When you contact us through our website or request a project consultation, we collect information you voluntarily provide, including:
              </p>
              <ul>
                <li>Full name and corporate organization</li>
                <li>Email address and telephone number</li>
                <li>Project parameters, requirements, and technical specifications</li>
                <li>Candidate details submitted for career inquiries</li>
              </ul>

              <h4>3. How We Use Your Information</h4>
              <p>
                We use your information solely to:
              </p>
              <ul>
                <li>Respond to your technical and business inquiries</li>
                <li>Prepare accurate project scoping documents and commercial estimates</li>
                <li>Provide ongoing software development and maintenance services</li>
                <li>Evaluate candidates for career opportunities at OmNetaTech</li>
              </ul>

              <h4>4. Data Protection & Confidentiality</h4>
              <p>
                We enforce strict data confidentiality practices. We do not sell, rent, or trade client information to third parties. Any project briefs, business logic, or technical data shared with OmNetaTech are treated as strictly confidential under customary non-disclosure principles.
              </p>

              <h4>5. Contact Us Regarding Privacy</h4>
              <p>
                If you have questions regarding this Privacy Policy or wish to update your contact details, please contact us at <strong>omnetatech@gmail.com</strong> or call <strong>+91 8237140776</strong>.
              </p>
            </div>
          ) : (
            <div className="legal-text-flow">
              <p className="legal-updated">Last Updated: September 2026</p>

              <h4>1. Service Terms</h4>
              <p>
                By accessing the OmNetaTech website or engaging our technology services, you agree to these standard business terms. Specific software development projects are governed by individual master service agreements and statements of work (SOW).
              </p>

              <h4>2. Intellectual Property & Code Ownership</h4>
              <p>
                Unless otherwise specified in a formal project contract, clients retain full ownership of custom software codebases, designs, and digital assets developed and delivered by OmNetaTech upon completion of agreed milestone payments.
              </p>

              <h4>3. Project Estimates & Scoping</h4>
              <p>
                Initial timeline and sprint estimates provided via consultations or online tools are preliminary assessments designed for planning purposes. Final technical scope and timelines are confirmed in formal project specifications.
              </p>

              <h4>4. Governing Law</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>

              <h4>5. Inquiries</h4>
              <p>
                For questions regarding terms of service, reach out to <strong>omnetatech@gmail.com</strong>.
              </p>
            </div>
          )}
        </div>

        <div className="legal-modal-footer">
          <button className="btn-primary-blue" onClick={onClose}>
            Close Document
          </button>
        </div>
      </div>

      <style>{`
        .legal-modal-backdrop {
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

        .legal-modal-body {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          max-width: 680px;
          width: 100%;
          border: 1px solid var(--color-border);
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: fadeIn 0.25s ease-out;
        }

        .legal-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--color-border);
        }

        .legal-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legal-shield-icon {
          color: var(--color-primary-blue);
        }

        .legal-modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-primary-navy);
        }

        .legal-close-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .legal-modal-scroll {
          padding: 28px;
          overflow-y: auto;
        }

        .legal-text-flow {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .legal-updated {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }

        .legal-text-flow h4 {
          font-size: 1.05rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-top: 10px;
        }

        .legal-text-flow p {
          font-size: 0.88rem;
          color: var(--color-text);
          line-height: 1.65;
        }

        .legal-text-flow ul {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .legal-text-flow li {
          font-size: 0.86rem;
          color: var(--color-text);
          line-height: 1.55;
        }

        .legal-modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 16px 28px;
          background: #F8FAFC;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
}
