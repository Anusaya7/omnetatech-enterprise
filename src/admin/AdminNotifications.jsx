import { useState, useEffect } from 'react';
import { 
  Bell, Check, CheckCheck, Mail, ArrowRight, 
  RefreshCw, Clock 
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminNotifications({ onNavigate, showToast, refreshBadges }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const list = await api.getNotifications();
      setNotifications(Array.isArray(list) ? list : []);
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getNotifications()
      .then((list) => {
        if (active) {
          setNotifications(Array.isArray(list) ? list : []);
          if (refreshBadges) refreshBadges();
        }
      })
      .catch((err) => {
        console.error('Failed to load notifications:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshBadges]);

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      showToast?.('All notifications marked as read');
      if (refreshBadges) refreshBadges();
    } catch (err) {
      console.error('Error marking all read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notifs-root">
      
      {/* Header */}
      <div className="notifs-header-row">
        <div>
          <h1 className="page-title">Notification Center</h1>
          <p className="page-sub">
            Real-time notifications triggered by website events, client inquiries, and lead arrivals.
          </p>
        </div>

        <div className="header-actions">
          {unreadCount > 0 && (
            <button 
              className="btn-mark-all" 
              onClick={handleMarkAllRead}
            >
              <CheckCheck size={16} />
              <span>Mark All as Read ({unreadCount})</span>
            </button>
          )}
          <button 
            className="refresh-btn" 
            onClick={fetchNotifications}
            disabled={isLoading}
          >
            <RefreshCw size={15} className={isLoading ? 'spin-icon' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifs-container shadow-sm">
        {isLoading && notifications.length === 0 ? (
          <div className="notifs-empty">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading notifications...</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="notifs-empty">
            <Bell size={36} className="empty-icon" />
            <h3>No Notifications</h3>
            <p>New inquiries submitted on the public website will trigger real-time notifications here.</p>
          </div>
        ) : (
          <div className="notifs-list">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`notif-card ${!notif.isRead ? 'unread' : ''}`}
              >
                <div className="notif-card-icon">
                  <Mail size={18} />
                </div>

                <div className="notif-card-body">
                  <div className="notif-title-row">
                    <h3 className="notif-title">{notif.title}</h3>
                    {!notif.isRead && (
                      <span className="notif-unread-badge">New</span>
                    )}
                    <span className="notif-timestamp">
                      <Clock size={12} />
                      <span>{new Date(notif.createdAt).toLocaleString('en-IN')}</span>
                    </span>
                  </div>

                  <p className="notif-msg">{notif.message}</p>

                  {/* Customer details pill if enquiry */}
                  {(notif.customerName || notif.email) && (
                    <div className="notif-customer-strip">
                      {notif.customerName && <span><strong>Client:</strong> {notif.customerName}</span>}
                      {notif.company && <span> • <strong>Company:</strong> {notif.company}</span>}
                      {notif.service && <span> • <strong>Service:</strong> {notif.service}</span>}
                      {notif.phone && <span> • <strong>Phone:</strong> {notif.phone}</span>}
                    </div>
                  )}

                  <div className="notif-actions-row">
                    <button 
                      className="notif-inspect-btn"
                      onClick={() => onNavigate('enquiries', '/admin/contact-enquiries')}
                    >
                      <span>View in Enquiries</span>
                      <ArrowRight size={13} />
                    </button>

                    {!notif.isRead && (
                      <button 
                        className="notif-dismiss-btn"
                        onClick={() => handleMarkRead(notif.id)}
                      >
                        <Check size={14} />
                        <span>Mark as Read</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .notifs-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .notifs-header-row {
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

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-mark-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1769E0;
          color: #FFFFFF;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-mark-all:hover {
          background: #1255B8;
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

        .notifs-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }
        .notifs-empty {
          padding: 60px 24px;
          text-align: center;
          color: #64748B;
        }
        .empty-icon {
          color: #CBD5E1;
          margin-bottom: 12px;
        }
        .notifs-empty h3 {
          font-size: 1.1rem;
          color: #1E293B;
          margin-bottom: 6px;
        }

        .notifs-list {
          display: flex;
          flex-direction: column;
        }
        .notif-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid #F1F5F9;
          transition: background 0.15s ease;
        }
        .notif-card:last-child {
          border-bottom: none;
        }
        .notif-card.unread {
          background: #F0F9FF;
        }
        .notif-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #EFF6FF;
          color: #1769E0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .notif-card.unread .notif-card-icon {
          background: #1769E0;
          color: #FFFFFF;
        }

        .notif-card-body {
          flex: 1;
        }
        .notif-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .notif-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
        }
        .notif-unread-badge {
          background: #EF4444;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
        }
        .notif-timestamp {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .notif-msg {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.45;
          margin-bottom: 8px;
        }

        .notif-customer-strip {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.78rem;
          color: #334155;
          margin-bottom: 12px;
        }

        .notif-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .notif-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: #1769E0;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }
        .notif-inspect-btn:hover {
          text-decoration: underline;
        }
        .notif-dismiss-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }
        .notif-dismiss-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }
      `}</style>
    </div>
  );
}
