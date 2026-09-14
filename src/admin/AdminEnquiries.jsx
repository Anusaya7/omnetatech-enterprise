import { useState, useEffect } from 'react';
import { 
  Mail, Phone, Search, 
  Eye, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminEnquiries({ showToast, refreshBadges }) {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusVal, setStatusVal] = useState('New');
  const [noteText, setNoteText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchEnquiries = async (filterToFetch = filter) => {
    setIsLoading(true);
    try {
      const data = await api.getEnquiries(filterToFetch);
      setEnquiries(Array.isArray(data) ? data : []);
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getEnquiries(filter)
      .then((data) => {
        if (active) {
          setEnquiries(Array.isArray(data) ? data : []);
          if (refreshBadges) refreshBadges();
        }
      })
      .catch((err) => {
        console.error('Failed to load enquiries:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filter, refreshBadges]);

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setStatusVal(enq.status || 'New');
    setNoteText(enq.adminNote || '');

    // Mark as read automatically when opened
    if (!enq.isRead) {
      api.updateEnquiry(enq.id, { isRead: true }).then(() => {
        setEnquiries(prev => prev.map(item => item.id === enq.id ? { ...item, isRead: true } : item));
        if (refreshBadges) refreshBadges();
      });
    }
  };

  const handleSaveEnquiry = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      const updated = await api.updateEnquiry(selectedEnquiry.id, {
        status: statusVal,
        adminNote: noteText,
        isRead: true
      });
      setSelectedEnquiry(updated);
      setEnquiries(prev => prev.map(item => item.id === updated.id ? updated : item));
      showToast?.('Enquiry updated successfully');
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Error updating enquiry:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await api.deleteEnquiry(id);
      setEnquiries(prev => prev.filter(item => item.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
      setDeleteConfirmId(null);
      showToast?.('Enquiry deleted successfully');
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  // Filter & Search
  const filteredList = enquiries.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (item.fullName || '').toLowerCase().includes(q) ||
      (item.companyName || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.phone || '').toLowerCase().includes(q) ||
      (item.service || '').toLowerCase().includes(q) ||
      (item.message || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="enquiries-root">
      
      {/* Header */}
      <div className="enquiries-header-row">
        <div>
          <h1 className="page-title">Contact Enquiries & Client Leads</h1>
          <p className="page-sub">
            Track, inspect, follow up, and manage prospective client requirements received from the website.
          </p>
        </div>
        <button 
          className="refresh-btn" 
          onClick={() => fetchEnquiries(filter)}
          disabled={isLoading}
        >
          <RefreshCw size={15} className={isLoading ? 'spin-icon' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="controls-bar shadow-sm">
        <div className="filter-tabs-group">
          {['All', 'New', 'Contacted', 'In Progress', 'Closed', 'Unread'].map(tab => (
            <button
              key={tab}
              type="button"
              className={`filter-tab-btn ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by client name, email, service..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="table-panel shadow-sm">
        {isLoading && enquiries.length === 0 ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading inquiries...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="empty-state">
            <Mail size={36} className="empty-icon" />
            <h3>No Enquiries Found</h3>
            <p>
              {searchQuery 
                ? `No enquiries match "${searchQuery}". Try clearing the search.`
                : `There are currently no enquiries under the "${filter}" filter.`}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Client / Organization</th>
                  <th>Service Required</th>
                  <th>Contact Info</th>
                  <th>Status</th>
                  <th>Date Received</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((enq) => (
                  <tr key={enq.id} className={!enq.isRead ? 'unread-row' : ''}>
                    <td>
                      <div className="client-cell">
                        <strong>{enq.fullName}</strong>
                        {enq.companyName ? (
                          <span className="client-company">{enq.companyName}</span>
                        ) : (
                          <span className="client-company text-muted">Individual / Not specified</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="service-badge">{enq.service}</span>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <a href={`mailto:${enq.email}`} className="contact-link">
                          <Mail size={12} />
                          <span>{enq.email}</span>
                        </a>
                        <a href={`tel:${enq.phone}`} className="contact-link">
                          <Phone size={12} />
                          <span>{enq.phone}</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill pill-${(enq.status || 'new').toLowerCase().replace(' ', '-')}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td>
                      <span className="date-text">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions-cell">
                        <button 
                          className="btn-action-view"
                          onClick={() => handleOpenDetail(enq)}
                          title="View Full Details"
                        >
                          <Eye size={15} />
                          <span>Inspect</span>
                        </button>
                        <button 
                          className="btn-action-delete"
                          onClick={() => setDeleteConfirmId(enq.id)}
                          title="Delete Enquiry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-card mini shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <AlertCircle size={24} className="text-danger" />
              <h3>Delete Contact Enquiry?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to delete this enquiry record? This action will permanently remove it from the database.
            </p>
            <div className="modal-footer">
              <button className="btn-secondary-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div>
                <span className="badge">Enquiry Details</span>
                <h2 className="modal-heading">{selectedEnquiry.fullName}</h2>
                <div className="modal-subheading">
                  {selectedEnquiry.companyName && <span>{selectedEnquiry.companyName} • </span>}
                  <span>Received on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedEnquiry(null)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              
              {/* Quick Contact & Action Buttons */}
              <div className="modal-quick-actions">
                <a 
                  href={`tel:${selectedEnquiry.phone}`} 
                  className="quick-action-btn"
                >
                  <Phone size={16} />
                  <span>Call {selectedEnquiry.phone}</span>
                </a>
                <a 
                  href={`mailto:${selectedEnquiry.email}?subject=OmNetaTech - Follow up regarding your inquiry`} 
                  className="quick-action-btn"
                >
                  <Mail size={16} />
                  <span>Email {selectedEnquiry.email}</span>
                </a>
              </div>

              {/* Information Grid */}
              <div className="info-grid">
                <div className="info-item">
                  <label className="info-label">Full Name</label>
                  <div className="info-value font-semibold">{selectedEnquiry.fullName}</div>
                </div>
                <div className="info-item">
                  <label className="info-label">Company / Organization</label>
                  <div className="info-value">{selectedEnquiry.companyName || 'Not specified'}</div>
                </div>
                <div className="info-item">
                  <label className="info-label">Email Address</label>
                  <div className="info-value">{selectedEnquiry.email}</div>
                </div>
                <div className="info-item">
                  <label className="info-label">Phone Number</label>
                  <div className="info-value">{selectedEnquiry.phone}</div>
                </div>
                <div className="info-item full-span">
                  <label className="info-label">Service Inquired</label>
                  <div className="info-value service-highlight">{selectedEnquiry.service}</div>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="info-label">Client Message & Requirements</label>
                <div className="message-quote-box">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update */}
              <div className="form-group">
                <label className="info-label">Update Enquiry Status</label>
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

              {/* Internal Notes */}
              <div className="form-group">
                <label className="info-label">Internal Follow-Up Notes</label>
                <textarea 
                  rows="3"
                  className="form-textarea"
                  placeholder="Record summary of conversation, client timeline, or next steps..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
              </div>

            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-danger-outline"
                onClick={() => setDeleteConfirmId(selectedEnquiry.id)}
              >
                <Trash2 size={15} />
                <span>Delete Enquiry</span>
              </button>
              <button 
                type="button" 
                className="btn-primary-blue"
                onClick={handleSaveEnquiry}
                disabled={isUpdating}
              >
                <span>{isUpdating ? 'Updating...' : 'Save & Close'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .enquiries-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .enquiries-header-row {
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
        .refresh-btn {
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
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Controls */
        .controls-bar {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .filter-tabs-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-tab-btn {
          background: #F1F5F9;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .filter-tab-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }
        .filter-tab-btn.active {
          background: #0B1F3A;
          color: #FFFFFF;
          font-weight: 600;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          width: 300px;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          color: #94A3B8;
        }
        .search-input {
          width: 100%;
          padding: 7px 28px 7px 32px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.84rem;
          outline: none;
        }
        .clear-search-btn {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          font-size: 1.1rem;
          color: #94A3B8;
          cursor: pointer;
        }

        /* Table */
        .table-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }
        .loading-state, .empty-state {
          padding: 60px 24px;
          text-align: center;
          color: #64748B;
        }
        .empty-icon {
          color: #CBD5E1;
          margin-bottom: 12px;
        }
        .empty-state h3 {
          font-size: 1.1rem;
          color: #1E293B;
          margin-bottom: 6px;
        }

        .table-responsive {
          overflow-x: auto;
        }
        .enquiries-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .enquiries-table th {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          padding: 12px 16px;
          border-bottom: 1px solid #E2E8F0;
          background: #F8FAFC;
        }
        .enquiries-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #F1F5F9;
          font-size: 0.88rem;
          vertical-align: middle;
        }
        .unread-row td {
          background: #F0F9FF;
          font-weight: 600;
        }

        .client-cell {
          display: flex;
          flex-direction: column;
        }
        .client-company {
          font-size: 0.76rem;
          color: #64748B;
        }
        .service-badge {
          display: inline-block;
          background: #F1F5F9;
          color: #1E293B;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 500;
        }
        .contact-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #1769E0;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .contact-link:hover {
          text-decoration: underline;
        }

        .status-pill {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .pill-new { background: #EFF6FF; color: #1D4ED8; }
        .pill-contacted { background: #FEF3C7; color: #D97706; }
        .pill-in-progress { background: #EEF2FF; color: #4F46E5; }
        .pill-closed { background: #F1F5F9; color: #64748B; }

        .date-text {
          font-size: 0.8rem;
          color: #64748B;
        }

        .table-actions-cell {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-view {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }
        .btn-action-view:hover {
          background: #1769E0;
          color: #FFFFFF;
          border-color: #1769E0;
        }
        .btn-action-delete {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 5px;
          padding: 5px 8px;
          color: #94A3B8;
          cursor: pointer;
        }
        .btn-action-delete:hover {
          background: #FEE2E2;
          border-color: #F87171;
          color: #DC2626;
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
        .modal-card {
          background: #FFFFFF;
          border-radius: 12px;
          max-width: 640px;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .modal-card.mini {
          max-width: 440px;
          padding: 24px;
        }
        .delete-modal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .delete-modal-header h3 {
          font-size: 1.15rem;
          color: #0F172A;
        }
        .delete-modal-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 20px;
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .modal-heading {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0F172A;
          margin: 4px 0 2px;
        }
        .modal-subheading {
          font-size: 0.8rem;
          color: #64748B;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #94A3B8;
          cursor: pointer;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .modal-quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .quick-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #1769E0;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          text-decoration: none;
        }
        .quick-action-btn:hover {
          background: #DBEAFE;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          background: #F8FAFC;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }
        .info-item {
          display: flex;
          flex-direction: column;
        }
        .info-item.full-span {
          grid-column: 1 / -1;
        }
        .info-label {
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .info-value {
          font-size: 0.88rem;
          color: #0F172A;
        }
        .service-highlight {
          color: #1769E0;
          font-weight: 600;
        }

        .message-quote-box {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 14px;
          font-size: 0.88rem;
          color: #1E293B;
          white-space: pre-wrap;
          line-height: 1.5;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #F8FAFC;
        }
        .btn-danger-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid #F87171;
          color: #DC2626;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-danger {
          background: #DC2626;
          color: #FFFFFF;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
        }
        .text-danger {
          color: #DC2626;
        }
      `}</style>
    </div>
  );
}
