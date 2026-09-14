import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, Mail, Bell, Globe, Briefcase, 
  Layers, Building2, FolderKanban, FileText, Users, 
  Settings, LogOut, ExternalLink, Search, Menu, X,
  CheckCircle, ChevronDown
} from 'lucide-react';
import { api, authStorage } from '../services/api';
import AdminSearchModal from './AdminSearchModal';

export default function AdminLayout({ activeRoute, onNavigate, onLogout, children }) {
  const [user] = useState(() => authStorage.getUser() || { name: 'OmNetaTech Admin', email: 'admin@omnetatech.com' });
  const [unreadCount, setUnreadCount] = useState(0);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchBadgeCounts = useCallback(() => {
    api.getDashboard().then(statsRes => {
      if (statsRes?.stats) {
        setUnreadCount(statsRes.stats.unreadNotifications || 0);
        setNewEnquiryCount(statsRes.stats.newEnquiries || 0);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    fetchBadgeCounts();
    const interval = setInterval(fetchBadgeCounts, 10000); // Polling every 10s for real-time alerts
    return () => clearInterval(interval);
  }, [fetchBadgeCounts]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { 
      id: 'enquiries', 
      label: 'Contact Enquiries', 
      icon: Mail, 
      path: '/admin/contact-enquiries',
      badge: newEnquiryCount > 0 ? newEnquiryCount : null,
      badgeColor: '#EF4444'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      path: '/admin/notifications',
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: '#3B82F6'
    },
    { id: 'website', label: 'Website Content', icon: Globe, path: '/admin/website' },
    { id: 'services', label: 'Services CMS', icon: Briefcase, path: '/admin/services' },
    { id: 'solutions', label: 'Solutions CMS', icon: Layers, path: '/admin/solutions' },
    { id: 'industries', label: 'Industries CMS', icon: Building2, path: '/admin/industries' },
    { id: 'portfolio', label: 'Portfolio CMS', icon: FolderKanban, path: '/admin/portfolio' },
    { id: 'insights', label: 'Insights & Blog', icon: FileText, path: '/admin/insights' },
    { id: 'careers', label: 'Careers & Jobs', icon: Users, path: '/admin/careers' },
    { id: 'settings', label: 'Settings & Security', icon: Settings, path: '/admin/settings' }
  ];

  const handleNav = (item) => {
    setIsMobileMenuOpen(false);
    onNavigate(item.id, item.path);
  };

  const handleOpenPublicWebsite = () => {
    onNavigate('public', '/');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="admin-root">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast shadow-lg animate-fade-in">
          <CheckCircle size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Search Modal */}
      {isSearchOpen && (
        <AdminSearchModal 
          onClose={() => setIsSearchOpen(false)} 
          onNavigate={(route, path) => {
            setIsSearchOpen(false);
            onNavigate(route, path);
          }}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand-box">
          <div className="sidebar-brand-title">
            <span className="brand-dot"></span>
            OmNetaTech CMS
          </div>
          <span className="brand-sub">Enterprise Administration</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-section-label">MAIN NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item)}
              >
                <div className="nav-item-left">
                  <Icon size={18} className="nav-item-icon" />
                  <span className="nav-item-label">{item.label}</span>
                </div>
                {item.badge && (
                  <span 
                    className="nav-item-badge" 
                    style={{ backgroundColor: item.badgeColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button 
            type="button" 
            className="sidebar-public-btn"
            onClick={handleOpenPublicWebsite}
          >
            <ExternalLink size={15} />
            <span>View Public Site</span>
          </button>
          
          <div className="sidebar-system-status">
            <span className="pulse-dot"></span>
            <span>Database: Persistent JSON</span>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="admin-viewport">
        
        {/* Top Navigation Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button 
              className="topbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button 
              type="button" 
              className="topbar-search-trigger"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={16} />
              <span>Search inquiries, services, articles...</span>
              <kbd className="search-kbd">Ctrl+K</kbd>
            </button>
          </div>

          <div className="topbar-right">
            {/* Notifications Shortcut */}
            <button 
              type="button"
              className="topbar-icon-btn"
              onClick={() => onNavigate('notifications', '/admin/notifications')}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="topbar-unread-badge">{unreadCount}</span>
              )}
            </button>

            {/* View Public Site Quick Link */}
            <button 
              type="button"
              className="topbar-site-link"
              onClick={handleOpenPublicWebsite}
            >
              <span>Public Website</span>
              <ExternalLink size={14} />
            </button>

            {/* User Profile & Logout */}
            <div className="topbar-user-wrap">
              <button 
                type="button" 
                className="topbar-user-btn"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="user-text-info">
                  <div className="user-name">{user.name || 'Admin'}</div>
                  <div className="user-role">Administrator</div>
                </div>
                <ChevronDown size={14} />
              </button>

              {isProfileDropdownOpen && (
                <div className="user-dropdown-menu shadow-lg animate-fade-in">
                  <div className="dropdown-user-header">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item" 
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onNavigate('settings', '/admin/settings');
                    }}
                  >
                    <Settings size={15} />
                    <span>Account Settings</span>
                  </button>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="admin-main-container">
          {typeof children === 'function' ? children({ showToast, refreshBadges: fetchBadgeCounts }) : children}
        </main>
      </div>

      <style>{`
        .admin-root {
          display: flex;
          min-height: 100vh;
          background-color: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #0F172A;
        }

        /* Toast */
        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0B1F3A;
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
        }
        .toast-icon {
          color: #10B981;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 260px;
          min-width: 260px;
          background-color: #0B1F3A;
          color: #F1F5F9;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #1E293B;
          z-index: 50;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-brand-box {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sidebar-brand-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.01em;
        }
        .brand-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #1769E0;
          box-shadow: 0 0 10px #1769E0;
        }
        .brand-sub {
          display: block;
          font-size: 0.75rem;
          color: #94A3B8;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-nav-section-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #64748B;
          padding: 8px 12px 6px;
          letter-spacing: 0.08em;
        }
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 6px;
          color: #CBD5E1;
          background: transparent;
          border: none;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
        }
        .sidebar-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
        }
        .sidebar-nav-item.active {
          background-color: #1769E0;
          color: #FFFFFF;
          font-weight: 600;
        }
        .nav-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-item-icon {
          opacity: 0.85;
        }
        .sidebar-nav-item.active .nav-item-icon {
          opacity: 1;
        }
        .nav-item-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #FFFFFF;
          padding: 2px 7px;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sidebar-public-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .sidebar-public-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
        }
        .sidebar-system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.74rem;
          color: #94A3B8;
          padding-left: 4px;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        /* Viewport */
        .admin-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100vh;
          overflow-y: auto;
        }

        /* Topbar */
        .admin-topbar {
          background: #FFFFFF;
          height: 64px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .topbar-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
        }
        .topbar-search-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 8px 14px;
          color: #64748B;
          font-size: 0.85rem;
          cursor: pointer;
          width: 320px;
          transition: border-color 0.15s ease;
        }
        .topbar-search-trigger:hover {
          border-color: #CBD5E1;
        }
        .search-kbd {
          margin-left: auto;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 0.7rem;
          color: #64748B;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .topbar-icon-btn {
          position: relative;
          background: transparent;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .topbar-icon-btn:hover {
          background: #F8FAFC;
          color: #0F172A;
        }
        .topbar-unread-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #EF4444;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          border-radius: 10px;
          padding: 1px 5px;
          min-width: 16px;
          text-align: center;
        }
        .topbar-site-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 7px 12px;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
        }
        .topbar-site-link:hover {
          background: #F8FAFC;
          color: #1769E0;
          border-color: #CBD5E1;
        }

        .topbar-user-wrap {
          position: relative;
        }
        .topbar-user-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #1769E0;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-text-info {
          text-align: left;
        }
        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.2;
        }
        .user-role {
          font-size: 0.72rem;
          color: #64748B;
        }

        .user-dropdown-menu {
          position: absolute;
          top: 48px;
          right: 0;
          width: 220px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 8px 0;
          z-index: 100;
        }
        .dropdown-user-header {
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
        }
        .dropdown-user-header strong {
          font-size: 0.88rem;
          color: #0F172A;
        }
        .dropdown-user-header span {
          font-size: 0.76rem;
          color: #64748B;
        }
        .dropdown-divider {
          height: 1px;
          background: #E2E8F0;
          margin: 6px 0;
        }
        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          background: none;
          border: none;
          font-size: 0.84rem;
          color: #334155;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }
        .dropdown-item:hover {
          background: #F1F5F9;
        }
        .dropdown-item.text-danger {
          color: #DC2626;
        }

        .admin-main-container {
          flex: 1;
          padding: 28px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed;
            left: -260px;
            top: 0;
            bottom: 0;
            transition: left 0.25s ease;
          }
          .admin-sidebar.mobile-open {
            left: 0;
          }
          .topbar-mobile-toggle {
            display: block;
          }
          .topbar-search-trigger {
            width: 200px;
          }
          .topbar-site-link span, .user-text-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
