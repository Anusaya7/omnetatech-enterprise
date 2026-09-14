import { useState, useEffect } from 'react';
import { 
  Mail, Bell, Briefcase, FileText, Users, 
  ArrowRight, Eye, RefreshCw, Check, ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard({ onNavigate, showToast, refreshBadges }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [statusVal, setStatusVal] = useState('New');
  const [isUpdatingEnquiry, setIsUpdatingEnquiry] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await api.getDashboard();
      setData(res);
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getDashboard()
      .then((res) => {
        if (active) {
          setData(res);
          if (refreshBadges) refreshBadges();
        }
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshBadges]);

  const handleOpenEnquiryModal = (enq) => {
    setSelectedEnquiry(enq);
    setStatusVal(enq.status || 'New');
    setNoteText(enq.adminNote || '');

    // If enquiry is not read, mark it read
    if (!enq.isRead) {
      api.updateEnquiry(enq.id, { isRead: true }).then(() => {
        fetchDashboardData();
      });
    }
  };

  const handleSaveEnquiry = async () => {
    if (!selectedEnquiry) return;
    setIsUpdatingEnquiry(true);
    try {
      const updated = await api.updateEnquiry(selectedEnquiry.id, {
        status: statusVal,
        adminNote: noteText,
        isRead: true
      });
      setSelectedEnquiry(updated);
      showToast?.('Enquiry updated successfully');
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update enquiry:', err);
    } finally {
      setIsUpdatingEnquiry(false);
    }
  };

  const handleMarkNotificationRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      fetchDashboardData();
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="dash-loading-state">
        <RefreshCw size={24} className="spin-icon" />
        <span>Loading dashboard insights...</span>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const recentNotifications = data?.recentNotifications || [];

  return (
    <div className="dash-root">
      
      {/* Page Title & Refresh */}
      <div className="dash-header-row">
        <div>
          <h1 className="dash-page-title">Executive Dashboard</h1>
          <p className="dash-page-sub">
            Real-time overview of OmNetaTech client inquiries, leads, and published technology services.
          </p>
        </div>
        <button 
          className="dash-refresh-btn" 
          onClick={fetchDashboardData}
          disabled={isLoading}
        >
          <RefreshCw size={15} className={isLoading ? 'spin-icon' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="dash-stats-grid">
        
        {/* Enquiries Card */}
        <div 
          className="stat-card stat-clickable" 
          onClick={() => onNavigate('enquiries', '/admin/contact-enquiries')}
        >
          <div className="stat-card-top">
            <div className="stat-icon-box bg-blue">
              <Mail size={20} />
            </div>
            {stats.newEnquiries > 0 && (
              <span className="stat-pill-badge bg-red">{stats.newEnquiries} New</span>
            )}
          </div>
          <div className="stat-val">{stats.totalEnquiries || 0}</div>
          <div className="stat-label">Total Inquiries Received</div>
          <div className="stat-footer-link">
            <span>Manage Enquiries</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Notifications Card */}
        <div 
          className="stat-card stat-clickable"
          onClick={() => onNavigate('notifications', '/admin/notifications')}
        >
          <div className="stat-card-top">
            <div className="stat-icon-box bg-amber">
              <Bell size={20} />
            </div>
            {stats.unreadNotifications > 0 && (
              <span className="stat-pill-badge bg-amber">{stats.unreadNotifications} Unread</span>
            )}
          </div>
          <div className="stat-val">{stats.unreadNotifications || 0}</div>
          <div className="stat-label">Unread Notifications</div>
          <div className="stat-footer-link">
            <span>View Notification Center</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Services Card */}
        <div 
          className="stat-card stat-clickable"
          onClick={() => onNavigate('services', '/admin/services')}
        >
          <div className="stat-card-top">
            <div className="stat-icon-box bg-indigo">
              <Briefcase size={20} />
            </div>
            <span className="stat-pill-badge bg-emerald">Live</span>
          </div>
          <div className="stat-val">{stats.activeServices || 0}</div>
          <div className="stat-label">Published Services</div>
          <div className="stat-footer-link">
            <span>Manage Services</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Published Articles Card */}
        <div 
          className="stat-card stat-clickable"
          onClick={() => onNavigate('insights', '/admin/insights')}
        >
          <div className="stat-card-top">
            <div className="stat-icon-box bg-purple">
              <FileText size={20} />
            </div>
            <span className="stat-pill-badge bg-blue">Public</span>
          </div>
          <div className="stat-val">{stats.publishedInsights || 0}</div>
          <div className="stat-label">Published Articles</div>
          <div className="stat-footer-link">
            <span>Manage Insights</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Active Careers */}
        <div 
          className="stat-card stat-clickable"
          onClick={() => onNavigate('careers', '/admin/careers')}
        >
          <div className="stat-card-top">
            <div className="stat-icon-box bg-teal">
              <Users size={20} />
            </div>
            <span className="stat-pill-badge bg-teal">Hiring</span>
          </div>
          <div className="stat-val">{stats.activeCareers || 0}</div>
          <div className="stat-label">Active Job Openings</div>
          <div className="stat-footer-link">
            <span>Manage Careers</span>
            <ArrowRight size={13} />
          </div>
        </div>

      </div>

      {/* Main Two Columns: Recent Enquiries & Notifications */}
      <div className="dash-columns-grid">
        
        {/* Left Column: Recent Enquiries */}
        <div className="dash-panel shadow-sm">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Latest Contact Inquiries</h2>
              <p className="panel-desc">Prospective clients and leads received through the website contact form.</p>
            </div>
            <button 
              className="panel-action-btn"
              onClick={() => onNavigate('enquiries', '/admin/contact-enquiries')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="panel-empty-state">
              <Mail size={32} className="empty-icon" />
              <h4>No Inquiries Received Yet</h4>
              <p>When prospective clients submit the contact form on your website, inquiries will appear here automatically.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Service Required</th>
                    <th>Status</th>
                    <th>Received</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className={!enq.isRead ? 'row-unread' : ''}>
                      <td>
                        <div className="td-client-name">
                          <strong>{enq.fullName}</strong>
                          {enq.companyName && <span className="td-client-company">{enq.companyName}</span>}
                        </div>
                      </td>
                      <td>
                        <span className="td-service-tag">{enq.service}</span>
                      </td>
                      <td>
                        <span className={`status-pill pill-${(enq.status || 'new').toLowerCase().replace(' ', '-')}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td>
                        <span className="td-date">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="table-action-btn"
                          onClick={() => handleOpenEnquiryModal(enq)}
                          title="View Details"
                        >
                          <Eye size={15} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Notifications & System Info */}
        <div className="dash-side-column">
          
          {/* Recent Notifications */}
          <div className="dash-panel shadow-sm">
            <div className="panel-header">
              <h2 className="panel-title">Notifications Feed</h2>
              <button 
                className="panel-action-btn"
                onClick={() => onNavigate('notifications', '/admin/notifications')}
              >
                <span>All Alerts</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {recentNotifications.length === 0 ? (
              <div className="panel-empty-state mini">
                <Bell size={24} className="empty-icon" />
                <p>No new alerts at this time.</p>
              </div>
            ) : (
              <div className="notifications-feed-list">
                {recentNotifications.map((notif) => (
                  <div key={notif.id} className={`notif-feed-item ${!notif.isRead ? 'unread' : ''}`}>
                    <div className="notif-feed-icon">
                      <Bell size={14} />
                    </div>
                    <div className="notif-feed-content">
                      <div className="notif-feed-title">{notif.title}</div>
                      <div className="notif-feed-msg">{notif.message}</div>
                      <div className="notif-feed-time">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {!notif.isRead && (
                      <button 
                        className="notif-read-check-btn" 
                        title="Mark as read"
                        onClick={() => handleMarkNotificationRead(notif.id)}
                      >
                        <Check size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick System Health Box */}
          <div className="dash-panel shadow-sm system-health-card">
            <div className="system-health-header">
              <ShieldCheck size={18} className="health-icon" />
              <span>Platform Health & Security</span>
            </div>
            <div className="health-items-list">
              <div className="health-row">
                <span>Database Storage:</span>
                <strong className="badge-active">Persistent JSON Storage</strong>
              </div>
              <div className="health-row">
                <span>Authentication:</span>
                <strong className="badge-active">PBKDF2 SHA-512 (100k iters)</strong>
              </div>
              <div className="health-row">
                <span>API Endpoints:</span>
                <strong className="badge-active">Active (REST)</strong>
              </div>
              <div className="health-row">
                <span>Verified Location:</span>
                <strong>India</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-dialog shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge">Enquiry Record</span>
                <h3 className="modal-title">{selectedEnquiry.fullName}</h3>
                {selectedEnquiry.companyName && (
                  <span className="modal-sub">{selectedEnquiry.companyName}</span>
                )}
              </div>
              <button className="modal-close-icon" onClick={() => setSelectedEnquiry(null)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              
              {/* Contact metadata strip */}
              <div className="modal-meta-grid">
                <div>
                  <label className="meta-label">Email Address</label>
                  <a href={`mailto:${selectedEnquiry.email}`} className="meta-link">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <label className="meta-label">Phone Number</label>
                  <a href={`tel:${selectedEnquiry.phone}`} className="meta-link">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <label className="meta-label">Service Inquired</label>
                  <span className="meta-text font-semibold">{selectedEnquiry.service}</span>
                </div>
                <div>
                  <label className="meta-label">Received Date</label>
                  <span className="meta-text">
                    {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="modal-section-group">
                <label className="meta-label">Project Message / Requirements</label>
                <div className="modal-message-box">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="modal-section-group">
                <label className="meta-label">Pipeline Status</label>
                <select 
                  className="form-select"
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Admin Internal Notes */}
              <div className="modal-section-group">
                <label className="meta-label">Internal Administrator Notes</label>
                <textarea 
                  rows="3"
                  className="form-textarea"
                  placeholder="Record follow-up notes, phone call summaries, or action items..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
              </div>

            </div>

            <div className="modal-footer">
              <a 
                href={`mailto:${selectedEnquiry.email}?subject=OmNetaTech - Follow up regarding your inquiry`}
                className="btn-secondary-outline"
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>
              <button 
                type="button" 
                className="btn-primary-blue"
                onClick={handleSaveEnquiry}
                disabled={isUpdatingEnquiry}
              >
                <span>{isUpdatingEnquiry ? 'Saving...' : 'Save & Update Status'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dash-root {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .dash-loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 400px;
          color: #64748B;
          font-size: 0.95rem;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .dash-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .dash-page-title {
          font-size: 1.55rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .dash-page-sub {
          font-size: 0.88rem;
          color: #64748B;
        }
        .dash-refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .dash-refresh-btn:hover {
          background: #F8FAFC;
          border-color: #94A3B8;
        }

        /* KPI Stats */
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 18px;
        }
        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stat-clickable {
          cursor: pointer;
        }
        .stat-clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
          border-color: #CBD5E1;
        }
        .stat-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .stat-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-blue { background: #EFF6FF; color: #1D4ED8; }
        .bg-amber { background: #FEF3C7; color: #D97706; }
        .bg-indigo { background: #EEF2FF; color: #4338CA; }
        .bg-purple { background: #F3E8FF; color: #7E22CE; }
        .bg-teal { background: #CCFBF1; color: #0F766E; }
        .bg-red { background: #FEE2E2; color: #DC2626; }
        .bg-emerald { background: #D1FAE5; color: #059669; }

        .stat-pill-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
        }
        .stat-val {
          font-size: 1.85rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.82rem;
          color: #64748B;
          font-weight: 500;
          margin-bottom: 14px;
        }
        .stat-footer-link {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.76rem;
          font-weight: 600;
          color: #1769E0;
          border-top: 1px solid #F1F5F9;
          padding-top: 10px;
        }

        /* Two columns */
        .dash-columns-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
        }

        .dash-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 22px 24px;
        }
        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          border-bottom: 1px solid #F1F5F9;
          padding-bottom: 14px;
        }
        .panel-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 3px;
        }
        .panel-desc {
          font-size: 0.82rem;
          color: #64748B;
        }
        .panel-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #1769E0;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }
        .panel-action-btn:hover {
          text-decoration: underline;
        }

        .panel-empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #64748B;
        }
        .panel-empty-state.mini {
          padding: 24px;
        }
        .empty-icon {
          color: #CBD5E1;
          margin-bottom: 12px;
        }
        .panel-empty-state h4 {
          color: #1E293B;
          font-size: 1rem;
          margin-bottom: 6px;
        }
        .panel-empty-state p {
          font-size: 0.84rem;
          max-width: 360px;
          margin: 0 auto;
        }

        /* Table */
        .table-responsive {
          overflow-x: auto;
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .dash-table th {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          padding: 10px 12px;
          border-bottom: 1px solid #E2E8F0;
        }
        .dash-table td {
          padding: 12px;
          border-bottom: 1px solid #F1F5F9;
          font-size: 0.86rem;
          vertical-align: middle;
        }
        .row-unread td {
          background-color: #F0F9FF;
          font-weight: 600;
        }
        .td-client-name {
          display: flex;
          flex-direction: column;
        }
        .td-client-company {
          font-size: 0.75rem;
          color: #64748B;
        }
        .td-service-tag {
          display: inline-block;
          background: #F1F5F9;
          color: #334155;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.78rem;
        }
        .status-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: capitalize;
        }
        .pill-new { background: #EFF6FF; color: #1D4ED8; }
        .pill-contacted { background: #FEF3C7; color: #D97706; }
        .pill-in-progress { background: #EEF2FF; color: #4F46E5; }
        .pill-closed { background: #F1F5F9; color: #64748B; }

        .td-date {
          font-size: 0.78rem;
          color: #64748B;
        }
        .table-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }
        .table-action-btn:hover {
          background: #1769E0;
          color: #FFFFFF;
          border-color: #1769E0;
        }

        /* Notifications Feed */
        .dash-side-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .notifications-feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .notif-feed-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
        }
        .notif-feed-item.unread {
          background: #EFF6FF;
          border-color: #BFDBFE;
        }
        .notif-feed-icon {
          color: #1769E0;
          margin-top: 2px;
        }
        .notif-feed-content {
          flex: 1;
        }
        .notif-feed-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 2px;
        }
        .notif-feed-msg {
          font-size: 0.76rem;
          color: #475569;
          line-height: 1.35;
        }
        .notif-feed-time {
          font-size: 0.7rem;
          color: #94A3B8;
          margin-top: 4px;
        }
        .notif-read-check-btn {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10B981;
          cursor: pointer;
        }

        /* Health Card */
        .system-health-card {
          background: #0B1F3A;
          color: #F8FAFC;
          border-color: #1E293B;
        }
        .system-health-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 14px;
          color: #FFFFFF;
        }
        .health-icon {
          color: #10B981;
        }
        .health-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.78rem;
        }
        .health-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
        }
        .badge-active {
          color: #6EE7B7;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(11, 31, 58, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .modal-dialog {
          background: #FFFFFF;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 4px 0 2px;
        }
        .modal-sub {
          font-size: 0.82rem;
          color: #64748B;
        }
        .modal-close-icon {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #94A3B8;
          cursor: pointer;
          line-height: 1;
        }
        .modal-body {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .modal-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          background: #F8FAFC;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }
        .meta-label {
          display: block;
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .meta-link {
          font-size: 0.88rem;
          color: #1769E0;
          font-weight: 500;
          text-decoration: none;
        }
        .meta-link:hover {
          text-decoration: underline;
        }
        .meta-text {
          font-size: 0.88rem;
          color: #0F172A;
        }
        .modal-message-box {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 12px 14px;
          font-size: 0.88rem;
          color: #1E293B;
          white-space: pre-wrap;
          line-height: 1.5;
        }
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #E2E8F0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: #F8FAFC;
        }

        @media (max-width: 900px) {
          .dash-columns-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
