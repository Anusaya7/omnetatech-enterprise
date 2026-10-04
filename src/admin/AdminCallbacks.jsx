import { useEffect, useState } from 'react';
import { PhoneCall, Search, RefreshCw, X } from 'lucide-react';
import { api } from '../services/api';

const FILTERS = ['All', 'New', 'Contacted', 'Completed', 'Cancelled'];
const STATUSES = ['New', 'Contacted', 'Completed', 'Cancelled'];

function formatWhen(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminCallbacks({ showToast, refreshBadges }) {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [statusVal, setStatusVal] = useState('New');
  const [isUpdating, setIsUpdating] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    api.getCallbackRequests(filter)
      .then((data) => {
        if (!active) return;
        setRequests(Array.isArray(data) ? data : []);
        refreshBadges?.();
      })
      .catch((err) => {
        console.error('Failed to load callback requests:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filter, refreshBadges, reloadKey]);

  const filteredList = requests.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return [item.fullName, item.mobile, item.email, item.companyName, item.message, item.preferredTime]
      .some((value) => String(value || '').toLowerCase().includes(query));
  });

  const openRequest = (item) => {
    setSelected(item);
    setStatusVal(item.status || 'New');
  };

  const saveStatus = async () => {
    if (!selected) return;
    setIsUpdating(true);
    try {
      const updated = await api.updateCallbackRequest(selected.id, { status: statusVal });
      setSelected(updated);
      setRequests((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      showToast?.('Callback request updated');
      refreshBadges?.();
    } catch (err) {
      console.error('Failed to update callback request:', err);
      showToast?.(err.message || 'Could not update the callback request');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="callbacks-admin">
      <div className="callbacks-header">
        <div>
          <h1 className="page-title">Callback Requests</h1>
          <p className="page-sub">Visitor callback details are visible only inside the admin panel.</p>
        </div>
        <button type="button" className="refresh-btn" onClick={() => { setIsLoading(true); setReloadKey((current) => current + 1); }}>
          <RefreshCw size={15} className={isLoading ? 'spin-icon' : ''} />
          Refresh
        </button>
      </div>

      <div className="controls-bar">
        <div className="filter-tabs-group">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-tab-btn ${filter === item ? 'active' : ''}`}
              onClick={() => { setIsLoading(true); setFilter(item); }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search name, mobile, company"
            aria-label="Search callback requests"
          />
          {searchQuery && (
            <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="table-panel">
        {isLoading ? (
          <div className="loading-state">Loading callback requests...</div>
        ) : filteredList.length === 0 ? (
          <div className="empty-state">
            <PhoneCall size={28} className="empty-icon" />
            <h3>No callback requests</h3>
            <p>New requests submitted from the website will appear here.</p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Preferred Time</th>
                  <th>Submitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item) => (
                  <tr key={item.id} onClick={() => openRequest(item)} className={selected?.id === item.id ? 'is-selected' : ''}>
                    <td>{item.fullName}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email || '—'}</td>
                    <td>{item.companyName || '—'}</td>
                    <td>{item.preferredTime}</td>
                    <td>{formatWhen(item.createdAt)}</td>
                    <td><span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <section className="detail-card" aria-label="Callback request details">
          <div className="detail-head">
            <h2>{selected.fullName}</h2>
            <button type="button" className="refresh-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
          <dl>
            <div><dt>Mobile Number</dt><dd>{selected.mobile}</dd></div>
            <div><dt>Email</dt><dd>{selected.email || 'Not provided'}</dd></div>
            <div><dt>Company</dt><dd>{selected.companyName || 'Not provided'}</dd></div>
            <div><dt>Preferred Callback Time</dt><dd>{selected.preferredTime}</dd></div>
            <div><dt>Submitted Date/Time</dt><dd>{formatWhen(selected.createdAt)}</dd></div>
            <div><dt>Status</dt><dd>{selected.status}</dd></div>
          </dl>
          <div className="message-block">
            <h3>Message / Requirement</h3>
            <p>{selected.message || 'No message provided.'}</p>
          </div>
          <div className="status-row">
            <label htmlFor="callback-status">Update status</label>
            <select id="callback-status" value={statusVal} onChange={(event) => setStatusVal(event.target.value)}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button type="button" className="btn-primary-blue" onClick={saveStatus} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Status'}
            </button>
          </div>
        </section>
      )}

      <style>{`
        .callbacks-admin { display: flex; flex-direction: column; gap: 16px; }
        .callbacks-header, .detail-head, .status-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        .page-title { font-size: 1.55rem; font-weight: 700; color: #0F172A; margin: 0 0 4px; }
        .page-sub { margin: 0; color: #64748B; font-size: 0.88rem; }
        .refresh-btn, .filter-tab-btn, .clear-search-btn { cursor: pointer; }
        .refresh-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #CBD5E1; border-radius: 6px; padding: 8px 14px; font-size: 0.82rem; font-weight: 600; color: #334155; }
        .controls-bar { background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 18px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .filter-tabs-group { display: flex; gap: 6px; flex-wrap: wrap; }
        .filter-tab-btn { background: #F1F5F9; border: 1px solid transparent; border-radius: 6px; padding: 6px 14px; font-size: 0.82rem; color: #475569; }
        .filter-tab-btn.active { background: #0B1F3A; color: #fff; font-weight: 600; }
        .search-input-wrap { position: relative; width: min(320px, 100%); }
        .search-icon { position: absolute; left: 10px; top: 9px; color: #94A3B8; }
        .search-input { width: 100%; padding: 8px 32px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 0.84rem; }
        .clear-search-btn { position: absolute; right: 8px; top: 8px; border: 0; background: transparent; color: #64748B; }
        .table-panel, .detail-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 10px; }
        .loading-state, .empty-state { padding: 48px 20px; text-align: center; color: #64748B; }
        .empty-icon { color: #CBD5E1; }
        .table-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 760px; }
        th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #E2E8F0; font-size: 0.84rem; vertical-align: top; }
        th { color: #64748B; font-size: 0.75rem; letter-spacing: 0.04em; text-transform: uppercase; }
        tbody tr { cursor: pointer; }
        tbody tr:hover, tr.is-selected { background: #F8FAFC; }
        .status-pill { display: inline-flex; border-radius: 999px; padding: 3px 8px; font-size: 0.75rem; font-weight: 700; background: #E2E8F0; color: #334155; }
        .status-new { background: #DBEAFE; color: #1D4ED8; }
        .status-contacted { background: #FEF3C7; color: #92400E; }
        .status-completed { background: #DCFCE7; color: #166534; }
        .status-cancelled { background: #F1F5F9; color: #475569; }
        .detail-card { padding: 18px; }
        .detail-card h2, .message-block h3 { margin: 0; color: #0F172A; }
        dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 16px 0; }
        dt { color: #64748B; font-size: 0.75rem; margin-bottom: 3px; }
        dd { margin: 0; color: #0F172A; font-weight: 600; }
        .message-block { background: #F8FAFC; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
        .message-block p { margin: 8px 0 0; white-space: pre-wrap; color: #334155; }
        .status-row select { border: 1px solid #CBD5E1; border-radius: 6px; padding: 8px 10px; }
        .spin-icon { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 800px) {
          dl { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
