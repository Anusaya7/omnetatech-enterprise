import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const PREFERRED_TIMES = ['Morning', 'Afternoon', 'Evening', 'Any Time'];

const EMPTY_FORM = {
  fullName: '',
  mobile: '',
  email: '',
  companyName: '',
  preferredTime: 'Any Time',
  message: ''
};

function isValidMobile(value) {
  const raw = String(value || '').trim();
  if (!raw || raw.length > 20) return false;
  if (!/^[0-9+\s()-]+$/.test(raw)) return false;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  if (/^[6-9]\d{9}$/.test(digits)) return true;
  const intl = raw.replace(/\D/g, '');
  return raw.startsWith('+') && intl.length >= 8 && intl.length <= 15;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function validateForm(form) {
  const errors = {};
  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your name.';
  } else if (form.fullName.trim().length > 100) {
    errors.fullName = 'Please enter your name.';
  }
  if (!isValidMobile(form.mobile)) {
    errors.mobile = 'Please enter a valid mobile number.';
  }
  if (form.email.trim() && !isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (form.email.trim().length > 120) {
    errors.email = 'Please enter a valid email address.';
  }
  if (form.companyName.trim().length > 120) {
    errors.companyName = 'Please keep the company name under 120 characters.';
  }
  if (!PREFERRED_TIMES.includes(form.preferredTime)) {
    errors.preferredTime = 'Please select a valid callback time.';
  }
  if (form.message.trim().length > 2000) {
    errors.message = 'Please keep your message under 2000 characters.';
  }
  return errors;
}

export default function CallbackRequestModal({ isOpen, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const requestKeyRef = useRef('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
    setServerError('');
    setSubmitted(false);
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return undefined;

    requestKeyRef.current = crypto.randomUUID();
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 30);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const items = [...focusable].filter((node) => !node.disabled);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    setServerError('');
    try {
      const response = await api.submitCallbackRequest({
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        companyName: form.companyName.trim(),
        preferredTime: form.preferredTime,
        message: form.message.trim(),
        clientRequestId: requestKeyRef.current
      });
      if (!response?.success) {
        setServerError(response?.error || 'We could not submit your request. Please try again.');
        return;
      }
      setForm(EMPTY_FORM);
      setSubmitted(true);
    } catch (error) {
      setServerError(error.message || 'We could not submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="callback-backdrop" onClick={handleClose}>
      <div
        className="callback-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="callback-header">
          <div>
            <div className="badge">OmNetaTech</div>
            <h2 id={titleId} className="callback-title">Request a Callback</h2>
          </div>
          <button type="button" className="callback-close" onClick={handleClose} aria-label="Close callback form">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="callback-body callback-success" role="status">
            <CheckCircle2 size={48} className="callback-success-icon" />
            <h3>Callback Request Submitted Successfully!</h3>
            <p>Thank you for contacting OmNetaTech. Our team will get back to you shortly.</p>
            <button type="button" className="btn-primary-blue callback-submit" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="callback-body" onSubmit={handleSubmit} noValidate>
            <p className="callback-intro">
              Share your details and the OmNetaTech team will call you back.
            </p>

            {serverError && (
              <div className="callback-alert" role="alert">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            <div className="callback-grid">
              <div className="callback-field">
                <label htmlFor="callback-name">Full Name *</label>
                <input
                  id="callback-name"
                  ref={firstFieldRef}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={form.fullName}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'callback-name-error' : undefined}
                />
                {errors.fullName && <p id="callback-name-error" className="callback-error">{errors.fullName}</p>}
              </div>

              <div className="callback-field">
                <label htmlFor="callback-mobile">Mobile Number *</label>
                <input
                  id="callback-mobile"
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={20}
                  value={form.mobile}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? 'callback-mobile-error' : undefined}
                />
                {errors.mobile && <p id="callback-mobile-error" className="callback-error">{errors.mobile}</p>}
              </div>

              <div className="callback-field">
                <label htmlFor="callback-email">Email Address</label>
                <input
                  id="callback-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  value={form.email}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'callback-email-error' : undefined}
                />
                {errors.email && <p id="callback-email-error" className="callback-error">{errors.email}</p>}
              </div>

              <div className="callback-field">
                <label htmlFor="callback-company">Company Name</label>
                <input
                  id="callback-company"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  value={form.companyName}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.companyName)}
                  aria-describedby={errors.companyName ? 'callback-company-error' : undefined}
                />
                {errors.companyName && <p id="callback-company-error" className="callback-error">{errors.companyName}</p>}
              </div>
            </div>

            <fieldset className="callback-times">
              <legend>Preferred Callback Time</legend>
              <div className="callback-time-options">
                {PREFERRED_TIMES.map((time) => (
                  <label key={time} className={`callback-time ${form.preferredTime === time ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="preferredTime"
                      value={time}
                      checked={form.preferredTime === time}
                      onChange={updateField}
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
              {errors.preferredTime && <p className="callback-error">{errors.preferredTime}</p>}
            </fieldset>

            <div className="callback-field">
              <label htmlFor="callback-message">Message / Requirement</label>
              <textarea
                id="callback-message"
                name="message"
                rows={4}
                maxLength={2000}
                value={form.message}
                onChange={updateField}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'callback-message-error' : undefined}
              />
              {errors.message && <p id="callback-message-error" className="callback-error">{errors.message}</p>}
            </div>

            <button type="submit" className="btn-primary-blue callback-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request Callback'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .callback-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2400;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(11, 31, 58, 0.55);
          backdrop-filter: blur(4px);
        }

        .callback-dialog {
          width: min(640px, 100%);
          max-height: min(92dvh, 860px);
          overflow: auto;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          animation: callbackIn 0.2s ease-out;
        }

        .callback-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 24px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .callback-title {
          margin: 4px 0 0;
          color: var(--color-primary-navy);
          font-size: 1.4rem;
          font-weight: 800;
        }

        .callback-close {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          background: #fff;
          color: var(--color-primary-navy);
          cursor: pointer;
          flex-shrink: 0;
        }

        .callback-close:hover,
        .callback-close:focus-visible {
          border-color: var(--color-primary-blue);
          color: var(--color-primary-blue);
        }

        .callback-body {
          padding: 22px 24px 26px;
        }

        .callback-intro {
          margin: 0 0 16px;
          color: var(--color-text-secondary);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .callback-alert {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 14px;
          padding: 10px 12px;
          border: 1px solid #F87171;
          border-radius: 8px;
          background: #FEF2F2;
          color: #991B1B;
          font-size: 0.86rem;
        }

        .callback-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .callback-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .callback-field label,
        .callback-times legend {
          font-size: 0.82rem;
          font-weight: 650;
          color: var(--color-primary-navy);
        }

        .callback-field input,
        .callback-field textarea {
          width: 100%;
          border: 1px solid var(--color-border-dark);
          border-radius: 8px;
          padding: 11px 12px;
          font: inherit;
          color: var(--color-text);
          background: #fff;
        }

        .callback-field input:focus,
        .callback-field textarea:focus {
          outline: 2px solid rgba(23, 105, 224, 0.25);
          border-color: var(--color-primary-blue);
        }

        .callback-error {
          margin: 0;
          color: #B91C1C;
          font-size: 0.78rem;
        }

        .callback-times {
          border: 0;
          margin: 0 0 14px;
          padding: 0;
        }

        .callback-time-options {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 8px;
        }

        .callback-time {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          border: 1px solid var(--color-border-dark);
          border-radius: 8px;
          background: #fff;
          color: var(--color-text);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }

        .callback-time input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .callback-time.is-selected {
          border-color: var(--color-primary-blue);
          background: var(--color-light-blue);
          color: var(--color-primary-navy);
        }

        .callback-submit {
          width: 100%;
          margin-top: 4px;
          justify-content: center;
        }

        .callback-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .callback-success {
          text-align: center;
          padding-top: 36px;
          padding-bottom: 36px;
        }

        .callback-success-icon {
          color: var(--color-success);
          margin-bottom: 12px;
        }

        .callback-success h3 {
          margin: 0 0 8px;
          color: var(--color-primary-navy);
          font-size: 1.25rem;
        }

        .callback-success p {
          margin: 0 auto 20px;
          max-width: 420px;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        @keyframes callbackIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          .callback-backdrop {
            padding: 12px;
            align-items: flex-end;
          }

          .callback-dialog {
            max-height: calc(100dvh - 24px);
          }

          .callback-grid,
          .callback-time-options {
            grid-template-columns: 1fr 1fr;
          }

          .callback-header,
          .callback-body {
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        @media (max-width: 480px) {
          .callback-grid,
          .callback-time-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
