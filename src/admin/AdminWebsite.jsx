import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminWebsite({ showToast }) {
  const { refreshData } = useCms();
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    api.getWebsiteContent()
      .then((res) => {
        if (active) {
          setContent(res);
        }
      })
      .catch((err) => {
        console.error('Failed to load website content:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleFieldChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const handleSaveSection = async (section) => {
    setIsSaving(true);
    try {
      const sectionPayload = content[section] || {};
      await api.updateWebsiteContent(section, sectionPayload);
      showToast?.(`${section.toUpperCase()} content updated and published!`);
      // Trigger public CMS refresh
      await refreshData();
    } catch (err) {
      console.error('Error saving website content:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !content) {
    return (
      <div className="web-loading-state">
        <RefreshCw size={24} className="spin-icon" />
        <span>Loading website content schema...</span>
      </div>
    );
  }

  return (
    <div className="website-cms-root">
      
      {/* Header */}
      <div className="cms-header-row">
        <div>
          <h1 className="page-title">Website Content & Copy CMS</h1>
          <p className="page-sub">
            Manage headlines, business statements, and verified contact details published on the public website.
          </p>
        </div>

        <div className="header-meta-note">
          <span className="live-dot"></span>
          <span>Changes are immediately live on the public site</span>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="cms-tabs-bar shadow-sm">
        {[
          { id: 'hero', label: 'Hero Section' },
          { id: 'about', label: 'About Company' },
          { id: 'contact', label: 'Verified Contact Info' },
          { id: 'whyChoose', label: 'Why OmNetaTech' },
          { id: 'techFocus', label: 'Technical Standard' },
          { id: 'footer', label: 'Footer & Legal' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`cms-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="cms-editor-panel shadow-sm">
        
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>Homepage Hero Banner</h3>
              <p>The primary headline and value proposition visible to first-time visitors.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-span">
                <label className="form-label">Main Headline</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.headline || ''}
                  onChange={(e) => handleFieldChange('hero', 'headline', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Highlight Word (Colored Blue)</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.highlight || ''}
                  onChange={(e) => handleFieldChange('hero', 'highlight', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Top Badge Text</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.badgeText || ''}
                  onChange={(e) => handleFieldChange('hero', 'badgeText', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Subheading / Description</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.hero?.subheading || ''}
                  onChange={(e) => handleFieldChange('hero', 'subheading', e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Primary CTA Button Label</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.primaryCta || ''}
                  onChange={(e) => handleFieldChange('hero', 'primaryCta', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Secondary CTA Button Label</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.secondaryCta || ''}
                  onChange={(e) => handleFieldChange('hero', 'secondaryCta', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Trust Statement Note</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.hero?.trustStatement || ''}
                  onChange={(e) => handleFieldChange('hero', 'trustStatement', e.target.value)}
                />
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('hero')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save Hero Section'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeTab === 'about' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>About Company Section & Identity</h3>
              <p>Verified information about OmNetaTech's foundation, vision and mission.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Badge Label</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.about?.badge || ''}
                  onChange={(e) => handleFieldChange('about', 'badge', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Section Headline</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.about?.headline || ''}
                  onChange={(e) => handleFieldChange('about', 'headline', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Lead Paragraph</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.about?.leadText || ''}
                  onChange={(e) => handleFieldChange('about', 'leadText', e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Vision Statement Title</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.about?.visionTitle || ''}
                  onChange={(e) => handleFieldChange('about', 'visionTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mission Statement Title</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.about?.missionTitle || ''}
                  onChange={(e) => handleFieldChange('about', 'missionTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Vision Description</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.about?.visionDesc || ''}
                  onChange={(e) => handleFieldChange('about', 'visionDesc', e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Mission Description</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.about?.missionDesc || ''}
                  onChange={(e) => handleFieldChange('about', 'missionDesc', e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('about')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save About Section'}</span>
              </button>
            </div>
          </div>
        )}

        {/* CONTACT INFO */}
        {activeTab === 'contact' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>Verified Official Contact Channels</h3>
              <p>Contact details displayed across header, contact section, modal and footer.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Official Phone / WhatsApp Number</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.contact?.phone || '+91 8237140776'}
                  onChange={(e) => handleFieldChange('contact', 'phone', e.target.value)}
                />
                <span className="field-hint">Default verified: +91 8237140776</span>
              </div>

              <div className="form-group">
                <label className="form-label">Official Email Address</label>
                <input 
                  type="email" 
                  className="cms-input"
                  value={content.contact?.email || 'omnetatech@gmail.com'}
                  onChange={(e) => handleFieldChange('contact', 'email', e.target.value)}
                />
                <span className="field-hint">Default verified: omnetatech@gmail.com</span>
              </div>

              <div className="form-group">
                <label className="form-label">Operating Country / Headquarters</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.contact?.country || 'India'}
                  onChange={(e) => handleFieldChange('contact', 'country', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Support & Business Hours</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.contact?.supportHours || 'Available Mon – Sat, 9:30 AM – 6:30 PM IST'}
                  onChange={(e) => handleFieldChange('contact', 'supportHours', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Contact Section Subtitle</label>
                <textarea 
                  rows="2" 
                  className="cms-textarea"
                  value={content.contact?.subheading || ''}
                  onChange={(e) => handleFieldChange('contact', 'subheading', e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('contact')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save Contact Info'}</span>
              </button>
            </div>
          </div>
        )}

        {/* WHY CHOOSE */}
        {activeTab === 'whyChoose' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>Why Choose OmNetaTech Banner</h3>
              <p>Key value drivers and commitments to clients.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Badge Label</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.whyChoose?.badge || ''}
                  onChange={(e) => handleFieldChange('whyChoose', 'badge', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.whyChoose?.title || ''}
                  onChange={(e) => handleFieldChange('whyChoose', 'title', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Subtitle / Description</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.whyChoose?.subtitle || ''}
                  onChange={(e) => handleFieldChange('whyChoose', 'subtitle', e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('whyChoose')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save Why Choose'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TECHNICAL FOCUS */}
        {activeTab === 'techFocus' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>Technical Standard & Engineering Quality</h3>
              <p>Communication of technology standards and realistic engineering capabilities.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Badge</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.techFocus?.badge || ''}
                  onChange={(e) => handleFieldChange('techFocus', 'badge', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.techFocus?.title || ''}
                  onChange={(e) => handleFieldChange('techFocus', 'title', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Subtitle</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.techFocus?.subtitle || ''}
                  onChange={(e) => handleFieldChange('techFocus', 'subtitle', e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('techFocus')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save Technical Standard'}</span>
              </button>
            </div>
          </div>
        )}

        {/* FOOTER & LEGAL */}
        {activeTab === 'footer' && (
          <div className="editor-section-content">
            <div className="section-title-row">
              <h3>Footer & Legal Information</h3>
              <p>Copyright and legal descriptions shown across the site footer.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-span">
                <label className="form-label">Company One-Liner Description</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.footer?.description || ''}
                  onChange={(e) => handleFieldChange('footer', 'description', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Copyright Notice</label>
                <input 
                  type="text" 
                  className="cms-input"
                  value={content.footer?.copyright || ''}
                  onChange={(e) => handleFieldChange('footer', 'copyright', e.target.value)}
                />
              </div>

              <div className="form-group full-span">
                <label className="form-label">Privacy Policy Summary</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.footer?.privacyPolicy || ''}
                  onChange={(e) => handleFieldChange('footer', 'privacyPolicy', e.target.value)}
                ></textarea>
              </div>

              <div className="form-group full-span">
                <label className="form-label">Terms & Conditions Summary</label>
                <textarea 
                  rows="3" 
                  className="cms-textarea"
                  value={content.footer?.termsConditions || ''}
                  onChange={(e) => handleFieldChange('footer', 'termsConditions', e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="panel-save-footer">
              <button 
                type="button" 
                className="btn-save"
                onClick={() => handleSaveSection('footer')}
                disabled={isSaving}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving Changes...' : 'Save Footer & Legal'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .website-cms-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cms-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-title {
          font-size: 1.55rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .page-sub {
          font-size: 0.88rem;
          color: #64748B;
        }
        .header-meta-note {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #1769E0;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .cms-tabs-bar {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
        }
        .cms-tab-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 500;
          color: #475569;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .cms-tab-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }
        .cms-tab-btn.active {
          background: #0B1F3A;
          color: #FFFFFF;
          font-weight: 600;
        }

        .cms-editor-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 28px;
        }

        .section-title-row {
          margin-bottom: 24px;
          border-bottom: 1px solid #F1F5F9;
          padding-bottom: 14px;
        }
        .section-title-row h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }
        .section-title-row p {
          font-size: 0.84rem;
          color: #64748B;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group.full-span {
          grid-column: 1 / -1;
        }
        .form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1E293B;
        }
        .cms-input {
          padding: 9px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.88rem;
          color: #0F172A;
          outline: none;
        }
        .cms-input:focus, .cms-textarea:focus {
          border-color: #1769E0;
          box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.12);
        }
        .cms-textarea {
          padding: 10px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.88rem;
          color: #0F172A;
          outline: none;
          line-height: 1.45;
        }
        .field-hint {
          font-size: 0.74rem;
          color: #64748B;
        }

        .panel-save-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          justify-content: flex-end;
        }
        .btn-save {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1769E0;
          color: #FFFFFF;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-save:hover:not(:disabled) {
          background: #1255B8;
        }
        .btn-save:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .web-loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 350px;
          color: #64748B;
        }
      `}</style>
    </div>
  );
}
