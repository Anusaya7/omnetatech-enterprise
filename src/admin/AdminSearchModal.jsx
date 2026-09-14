import { useState, useEffect, useRef } from 'react';
import { Search, X, Mail, Briefcase, Layers, Building2, FileText, Users, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function AdminSearchModal({ onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    let active = true;
    const timer = setTimeout(() => {
      setIsLoading(true);
      api.globalSearch(trimmed)
        .then((data) => {
          if (active) setResults(data);
        })
        .catch((err) => {
          console.error('Search error:', err);
        })
        .finally(() => {
          if (active) setIsLoading(false);
        });
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setResults(null);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults(null);
    setIsLoading(false);
  };

  const hasResults = results && (
    (results.enquiries?.length || 0) +
    (results.services?.length || 0) +
    (results.solutions?.length || 0) +
    (results.industries?.length || 0) +
    (results.insights?.length || 0) +
    (results.careers?.length || 0) > 0
  );

  return (
    <div className="admin-search-overlay" onClick={onClose}>
      <div className="admin-search-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search across all inquiries, services, articles, jobs..." 
            className="search-main-input"
            value={query}
            onChange={handleQueryChange}
          />
          {query && (
            <button className="clear-btn" onClick={handleClear}>
              <X size={16} />
            </button>
          )}
          <button className="close-btn" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="search-modal-results">
          {isLoading && (
            <div className="search-state-msg">Searching records...</div>
          )}

          {!isLoading && !query.trim() && (
            <div className="search-state-msg text-muted">
              Type keywords to search enquiries by name, company, email, or explore CMS content.
            </div>
          )}

          {!isLoading && query.trim() && !hasResults && (
            <div className="search-state-msg">
              No results found for "<strong>{query}</strong>".
            </div>
          )}

          {!isLoading && hasResults && (
            <div className="results-groups-list">
              
              {/* Enquiries */}
              {results.enquiries?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <Mail size={14} />
                    <span>Contact Enquiries ({results.enquiries.length})</span>
                  </div>
                  {results.enquiries.map((enq) => (
                    <div 
                      key={enq.id} 
                      className="result-row"
                      onClick={() => onNavigate('enquiries', '/admin/contact-enquiries')}
                    >
                      <div className="row-main">
                        <span className="row-title">{enq.fullName}</span>
                        <span className="row-sub">{enq.email} • {enq.service} • Status: {enq.status}</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              {results.services?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <Briefcase size={14} />
                    <span>Services ({results.services.length})</span>
                  </div>
                  {results.services.map((svc) => (
                    <div 
                      key={svc.id} 
                      className="result-row"
                      onClick={() => onNavigate('services', '/admin/services')}
                    >
                      <div className="row-main">
                        <span className="row-title">{svc.title}</span>
                        <span className="row-sub">{svc.category} • {svc.status}</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

              {/* Solutions */}
              {results.solutions?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <Layers size={14} />
                    <span>Solutions ({results.solutions.length})</span>
                  </div>
                  {results.solutions.map((sol) => (
                    <div 
                      key={sol.id} 
                      className="result-row"
                      onClick={() => onNavigate('solutions', '/admin/solutions')}
                    >
                      <div className="row-main">
                        <span className="row-title">{sol.title}</span>
                        <span className="row-sub">{sol.tagline || sol.problem}</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

              {/* Industries */}
              {results.industries?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <Building2 size={14} />
                    <span>Industries ({results.industries.length})</span>
                  </div>
                  {results.industries.map((ind) => (
                    <div 
                      key={ind.id} 
                      className="result-row"
                      onClick={() => onNavigate('industries', '/admin/industries')}
                    >
                      <div className="row-main">
                        <span className="row-title">{ind.title}</span>
                        <span className="row-sub">{ind.desc?.slice(0, 70)}...</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

              {/* Insights */}
              {results.insights?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <FileText size={14} />
                    <span>Insights & Articles ({results.insights.length})</span>
                  </div>
                  {results.insights.map((ins) => (
                    <div 
                      key={ins.id} 
                      className="result-row"
                      onClick={() => onNavigate('insights', '/admin/insights')}
                    >
                      <div className="row-main">
                        <span className="row-title">{ins.title}</span>
                        <span className="row-sub">{ins.category} • {ins.date}</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

              {/* Careers */}
              {results.careers?.length > 0 && (
                <div className="results-group">
                  <div className="group-heading">
                    <Users size={14} />
                    <span>Careers & Roles ({results.careers.length})</span>
                  </div>
                  {results.careers.map((job) => (
                    <div 
                      key={job.id} 
                      className="result-row"
                      onClick={() => onNavigate('careers', '/admin/careers')}
                    >
                      <div className="row-main">
                        <span className="row-title">{job.title}</span>
                        <span className="row-sub">{job.department} • {job.location}</span>
                      </div>
                      <ArrowRight size={14} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

      </div>

      <style>{`
        .search-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(11, 31, 58, 0.65);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
        }

        .search-modal-card {
          width: 100%;
          max-width: 640px;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 70vh;
        }

        .search-input-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid #E2E8F0;
        }
        .search-icon {
          color: #64748B;
        }
        .search-main-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          color: #0F172A;
        }
        .search-main-input::placeholder {
          color: #94A3B8;
        }
        .clear-btn {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }
        .close-btn {
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748B;
          padding: 2px 6px;
          cursor: pointer;
        }

        .search-modal-results {
          padding: 16px 20px;
          overflow-y: auto;
          flex: 1;
        }

        .search-state-msg {
          text-align: center;
          padding: 36px 0;
          font-size: 0.9rem;
          color: #64748B;
        }

        .results-groups-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .group-heading {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .result-row:hover {
          background: #F8FAFC;
        }
        .result-row:hover .row-arrow {
          color: #1769E0;
          transform: translateX(2px);
        }

        .row-main {
          display: flex;
          flex-direction: column;
        }
        .row-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0F172A;
        }
        .row-sub {
          font-size: 0.78rem;
          color: #64748B;
        }
        .row-arrow {
          color: #94A3B8;
          transition: all 0.15s ease;
        }
      `}</style>
    </div>
  );
}
