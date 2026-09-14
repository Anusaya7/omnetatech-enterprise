import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('admin@omnetatech.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        onLoginSuccess(res);
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@omnetatech.com');
    setPassword('Admin@OmNetaTech2026!');
  };

  return (
    <div className="login-root">
      
      {/* Back button */}
      <button 
        type="button" 
        className="login-back-btn" 
        onClick={onBackToSite}
      >
        <ArrowLeft size={16} />
        <span>Return to Public Website</span>
      </button>

      <div className="login-card shadow-2xl animate-fade-in">
        
        {/* Header Branding */}
        <div className="login-header">
          <div className="brand-badge-pill">
            <ShieldCheck size={16} />
            <span>Secure Admin Portal</span>
          </div>
          <h1 className="login-brand-title">OmNetaTech</h1>
          <p className="login-sub">
            Authorized administrator access to manage website content, service inquiries, and customer leads.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="login-error-box">
            <AlertCircle size={18} className="error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Administrator Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                id="admin-email"
                type="email" 
                required
                placeholder="admin@omnetatech.com" 
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label className="form-label" htmlFor="admin-password">Password</label>
              <button 
                type="button" 
                className="fill-demo-link" 
                onClick={handleFillDemo}
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                id="admin-password"
                type={showPassword ? 'text' : 'password'} 
                required
                placeholder="••••••••••••" 
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn" 
            disabled={isLoading}
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security & Evaluation Note */}
        <div className="login-footer-hint">
          <div className="hint-pill">
            <strong>Default Evaluation Credentials:</strong>
            <code>admin@omnetatech.com</code> / <code>Admin@OmNetaTech2026!</code>
          </div>
          <p className="security-text">
            Protected with server-side PBKDF2 cryptography & bearer session tokens. Unauthorized attempts are logged.
          </p>
        </div>

      </div>

      <style>{`
        .login-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #0B1F3A 0%, #0F2D54 50%, #0B1F3A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-back-btn {
          position: absolute;
          top: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E2E8F0;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .login-back-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          border-radius: 12px;
          padding: 40px 36px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.35);
        }

        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .brand-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EFF6FF;
          color: #1769E0;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .login-brand-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0B1F3A;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .login-sub {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.45;
        }

        .login-error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: #FEF2F2;
          border: 1px solid #F87171;
          border-radius: 6px;
          color: #991B1B;
          font-size: 0.84rem;
          margin-bottom: 20px;
        }
        .error-icon {
          flex-shrink: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1E293B;
        }
        .fill-demo-link {
          background: none;
          border: none;
          color: #1769E0;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
          pointer-events: none;
        }
        .login-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #0F172A;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .login-input:focus {
          border-color: #1769E0;
          box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.15);
        }
        .eye-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }

        .login-submit-btn {
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #1769E0;
          color: #FFFFFF;
          border: none;
          padding: 12px 20px;
          border-radius: 6px;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .login-submit-btn:hover:not(:disabled) {
          background: #1255B8;
        }
        .login-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer-hint {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
          text-align: center;
        }
        .hint-pill {
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.76rem;
          color: #475569;
          margin-bottom: 10px;
        }
        .hint-pill code {
          background: #E2E8F0;
          padding: 2px 4px;
          border-radius: 3px;
          color: #0F172A;
        }
        .security-text {
          font-size: 0.72rem;
          color: #94A3B8;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
