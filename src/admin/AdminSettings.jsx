import { useState } from 'react';
import { 
  Lock, Key, ShieldCheck, Save, 
  AlertCircle, CheckCircle2, Phone, Mail, MapPin, Eye, EyeOff 
} from 'lucide-react';
import { api, authStorage } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminSettings({ showToast }) {
  const { content, refreshData } = useCms();

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  // Contact settings state
  const contact = content?.contact || {};
  const [phone, setPhone] = useState(contact.phone || '+91 8237140776');
  const [email, setEmail] = useState(contact.email || 'omnetatech@gmail.com');
  const [country, setCountry] = useState(contact.country || 'India');
  const [supportHours, setSupportHours] = useState(contact.supportHours || 'Available Mon – Sat, 9:30 AM – 6:30 PM IST');
  const [isSavingContact, setIsSavingContact] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await api.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordSuccess('Password successfully updated and securely hashed with PBKDF2!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (res.token) {
          authStorage.setToken(res.token);
        }
        showToast?.('Admin password updated successfully');
      } else {
        setPasswordError(res.error || 'Failed to update password.');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setPasswordError(err.message || 'Failed to update password. Verify current password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSavingContact(true);
    try {
      await api.updateWebsiteContent('contact', {
        ...contact,
        phone,
        email,
        country,
        supportHours
      });
      await refreshData();
      showToast?.('Company contact details updated across website');
    } catch (err) {
      console.error('Error saving contact settings:', err);
    } finally {
      setIsSavingContact(false);
    }
  };

  return (
    <div className="settings-root">
      
      {/* Header */}
      <div className="settings-header">
        <h1 className="page-title">Settings & Security</h1>
        <p className="page-sub">
          Manage administrator authentication, server-side encryption keys, and verified Indian corporate information.
        </p>
      </div>

      <div className="settings-grid">
        
        {/* Left Column: Password Change & Security */}
        <div className="settings-panel shadow-sm">
          <div className="panel-header-block">
            <div className="panel-icon-box bg-blue">
              <Key size={18} />
            </div>
            <div>
              <h2 className="panel-title">Change Admin Password</h2>
              <p className="panel-sub">Update password with PBKDF2-SHA512 100k iteration hashing.</p>
            </div>
          </div>

          {passwordError && (
            <div className="alert-box error">
              <AlertCircle size={16} />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="alert-box success">
              <CheckCircle2 size={16} />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="settings-form">
            <div className="form-group">
              <label className="form-label">Current Password *</label>
              <div className="input-eye-wrap">
                <input 
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  className="cms-input"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="eye-btn" 
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">New Password (Min. 8 characters) *</label>
              <div className="input-eye-wrap">
                <input 
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  className="cms-input"
                  placeholder="Enter secure new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="eye-btn" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input 
                type="password"
                required
                className="cms-input"
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary-blue"
              disabled={isChangingPassword}
            >
              <Lock size={15} />
              <span>{isChangingPassword ? 'Encrypting & Saving...' : 'Update Password'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Verified Company Contact Details */}
        <div className="settings-panel shadow-sm">
          <div className="panel-header-block">
            <div className="panel-icon-box bg-indigo">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="panel-title">Verified Corporate Contact Channels</h2>
              <p className="panel-sub">Official communication coordinates displayed to prospective clients.</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="settings-form">
            <div className="form-group">
              <label className="form-label">Official Phone / WhatsApp *</label>
              <div className="input-icon-wrap">
                <Phone size={15} className="input-field-icon" />
                <input 
                  type="text" 
                  required
                  className="cms-input with-left-icon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <span className="field-note">Verified primary contact: +91 8237140776</span>
            </div>

            <div className="form-group">
              <label className="form-label">Official Inquiries Email *</label>
              <div className="input-icon-wrap">
                <Mail size={15} className="input-field-icon" />
                <input 
                  type="email" 
                  required
                  className="cms-input with-left-icon"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="field-note">Verified official address: omnetatech@gmail.com</span>
            </div>

            <div className="form-group">
              <label className="form-label">Company Location / Headquarters</label>
              <div className="input-icon-wrap">
                <MapPin size={15} className="input-field-icon" />
                <input 
                  type="text" 
                  required
                  className="cms-input with-left-icon"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Working / Support Hours</label>
              <input 
                type="text" 
                required
                className="cms-input"
                value={supportHours}
                onChange={(e) => setSupportHours(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary-blue"
              disabled={isSavingContact}
            >
              <Save size={15} />
              <span>{isSavingContact ? 'Saving...' : 'Save Contact Channels'}</span>
            </button>
          </form>
        </div>

      </div>

      <style>{`
        .settings-root { display: flex; flex-direction: column; gap: 24px; }
        .settings-header { margin-bottom: 4px; }
        .page-title { font-size: 1.55rem; font-weight: 700; color: #0F172A; letter-spacing: -0.02em; margin-bottom: 4px; }
        .page-sub { font-size: 0.88rem; color: #64748B; }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .settings-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 24px 28px;
        }

        .panel-header-block {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
        }
        .panel-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bg-blue { background: #EFF6FF; color: #1769E0; }
        .bg-indigo { background: #EEF2FF; color: #4338CA; }

        .panel-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 2px;
        }
        .panel-sub {
          font-size: 0.8rem;
          color: #64748B;
        }

        .alert-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.84rem;
          margin-bottom: 16px;
        }
        .alert-box.error {
          background: #FEF2F2;
          border: 1px solid #F87171;
          color: #991B1B;
        }
        .alert-box.success {
          background: #ECFDF5;
          border: 1px solid #6EE7B7;
          color: #065F46;
        }

        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1E293B;
        }
        .field-note {
          font-size: 0.72rem;
          color: #64748B;
        }

        .input-eye-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .eye-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }

        .input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-field-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
          pointer-events: none;
        }
        .with-left-icon {
          padding-left: 36px !important;
        }

        .cms-input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.88rem;
          color: #0F172A;
          outline: none;
        }
        .cms-input:focus {
          border-color: #1769E0;
          box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.12);
        }

        @media (max-width: 900px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
