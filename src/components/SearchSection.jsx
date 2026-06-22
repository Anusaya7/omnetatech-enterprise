import { useState } from 'react';
import { Search, ChevronDown, Check, ArrowRight } from 'lucide-react';

export default function SearchSection({ onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const industries = [
    'All Industries',
    'Banking',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Education',
    'Logistics',
    'Technology'
  ];

  // Simulated Knowledge Base for search matching
  const searchDatabase = [
    { title: 'Generative AI & LLM Integration', cat: 'Services', desc: 'Secure agent workflows and custom business model training.', ind: ['Banking', 'Healthcare', 'Retail', 'Technology'] },
    { title: 'Cloud Infrastructure Modernization', cat: 'Services', desc: 'AWS/Azure/GCP multi-cloud orchestration and container migration.', ind: ['Banking', 'Retail', 'Logistics', 'Technology'] },
    { title: 'HIPAA & ISO Cybersecurity Audits', cat: 'Services', desc: 'Threat hunting, vulnerability scans, and continuous compliance reporting.', ind: ['Healthcare', 'Banking', 'Technology'] },
    { title: 'Predictive Manufacturing Logistics', cat: 'Solutions', desc: 'IoT sensors and predictive maintenance scheduling.', ind: ['Manufacturing', 'Logistics'] },
    { title: 'AI Customer Operations Engine', cat: 'Solutions', desc: 'Custom conversational support agents integrated with ERP systems.', ind: ['Retail', 'Education', 'Banking'] },
    { title: 'Automated Financial Reconciliation', cat: 'Solutions', desc: 'RPA automation for accounts payable and transaction auditing.', ind: ['Banking', 'Technology'] },
    { title: 'Decentralized Supply Chain Ledgers', cat: 'Solutions', desc: 'Secure ledger integration for real-time tracking.', ind: ['Logistics', 'Manufacturing'] },
    { title: 'AI Adaptive Learning Platform', cat: 'Solutions', desc: 'Interactive portals with personalized course paths.', ind: ['Education'] }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    setHasSearched(true);
    
    // Filter database
    const results = searchDatabase.filter(item => {
      const matchQuery = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cat.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchInd = selectedIndustry === 'All Industries' || item.ind.includes(selectedIndustry);
      
      return matchQuery && matchInd;
    });

    setSearchResults(results);
    
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedIndustry, results);
    }
  };

  const selectIndustryOption = (ind) => {
    setSelectedIndustry(ind);
    setIsDropdownOpen(false);
  };

  return (
    <div className="search-section container">
      <div className="search-card-wrapper shadow-premium">
        <form className="search-form" onSubmit={handleSearch}>
          
          {/* Input field */}
          <div className="search-input-group">
            <Search className="search-icon-input" size={20} />
            <input 
              type="text" 
              placeholder="Search Services, Industries, Solutions..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Industry dropdown selection */}
          <div className="search-dropdown-group">
            <button 
              type="button" 
              className="dropdown-trigger-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedIndustry}</span>
              <ChevronDown size={16} className={`chevron-down-search ${isDropdownOpen ? 'open' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <ul className="dropdown-options-list">
                {industries.map((ind, idx) => (
                  <li 
                    key={idx} 
                    className={`dropdown-option-item ${selectedIndustry === ind ? 'active-option' : ''}`}
                    onClick={() => selectIndustryOption(ind)}
                  >
                    <span>{ind}</span>
                    {selectedIndustry === ind && <Check size={14} className="check-icon-search" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action button */}
          <button type="submit" className="search-action-btn">
            Explore Solutions
          </button>
        </form>

        {/* Live Search Results Overlay */}
        {hasSearched && (
          <div className="search-results-overlay">
            <div className="results-header">
              <span className="results-count">{searchResults.length} Solutions Found</span>
              <button className="btn-close-results" onClick={() => setHasSearched(false)}>Clear</button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((res, idx) => (
                  <div key={idx} className="result-item-card">
                    <div className="result-badge-cat">{res.cat}</div>
                    <h4 className="result-title-h4">{res.title}</h4>
                    <p className="result-desc-p">{res.desc}</p>
                    <div className="result-footer-row">
                      <div className="result-tags">
                        {res.ind.map((i, k) => <span key={k} className="result-tag-span">#{i}</span>)}
                      </div>
                      <a href="#contact" className="result-learn-more" onClick={() => setHasSearched(false)}>
                        Enquire <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-view">
                No direct solutions found matching your search. Contact our experts to customize a solution.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .search-section {
          position: relative;
          z-index: 20;
          margin-top: -40px;
          padding: 0 24px;
        }

        .search-card-wrapper {
          background: rgba(13, 34, 60, 0.95);
          border: 1px solid rgba(0, 191, 255, 0.25);
          border-radius: var(--border-radius-md);
          padding: 8px;
          position: relative;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .search-form {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          background: rgba(7, 20, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px 18px;
          border-radius: var(--border-radius-sm);
        }

        .search-icon-input {
          color: var(--color-cyan);
        }

        .search-input {
          background: none;
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-size: 0.95rem;
          width: 100%;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--color-gray-dark);
        }

        /* Dropdown custom styling */
        .search-dropdown-group {
          position: relative;
          min-width: 180px;
        }

        .dropdown-trigger-btn {
          width: 100%;
          background: rgba(7, 20, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--color-white-pure);
          padding: 14px 18px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .chevron-down-search {
          color: var(--color-gray-dark);
          transition: var(--transition-fast);
        }

        .chevron-down-search.open {
          transform: rotate(180deg);
          color: var(--color-cyan);
        }

        .dropdown-options-list {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: var(--color-navy-light);
          border: 1px solid rgba(0, 191, 255, 0.15);
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-lg);
          list-style: none;
          max-height: 240px;
          overflow-y: auto;
          z-index: 30;
          padding: 6px 0;
        }

        .dropdown-option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--color-gray-medium);
          transition: var(--transition-fast);
        }

        .dropdown-option-item:hover, .dropdown-option-item.active-option {
          background: rgba(15, 82, 186, 0.2);
          color: var(--color-cyan);
        }

        .check-icon-search {
          color: var(--color-cyan);
        }

        /* Search Submit Button */
        .search-action-btn {
          background: linear-gradient(135deg, var(--color-royal) 0%, var(--color-purple) 100%);
          border: none;
          color: var(--color-white-pure);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
          white-space: nowrap;
        }

        .search-action-btn:hover {
          background: linear-gradient(135deg, var(--color-purple) 0%, var(--color-cyan) 100%);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
        }

        /* Results Area overlay */
        .search-results-overlay {
          background: rgba(7, 20, 38, 0.98);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
          padding: 20px;
          margin-top: 8px;
          max-height: 400px;
          overflow-y: auto;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .results-count {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-cyan);
          text-transform: uppercase;
        }

        .btn-close-results {
          background: none;
          border: none;
          color: var(--color-gray-dark);
          font-size: 0.8rem;
          cursor: pointer;
        }
        .btn-close-results:hover {
          color: var(--color-white-pure);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .result-item-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .result-badge-cat {
          align-self: flex-start;
          background: rgba(0, 191, 255, 0.1);
          color: var(--color-cyan);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 2px 8px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .result-title-h4 {
          font-family: var(--font-title);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-white-pure);
        }

        .result-desc-p {
          font-size: 0.8rem;
          color: var(--color-gray-medium);
          line-height: 1.4;
        }

        .result-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 8px;
          font-size: 0.75rem;
        }

        .result-tags {
          display: flex;
          gap: 6px;
          color: var(--color-gray-dark);
        }

        .result-learn-more {
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }
        .result-learn-more:hover {
          text-decoration: underline;
        }

        .no-results-view {
          text-align: center;
          padding: 30px 0;
          color: var(--color-gray-dark);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }
          .search-dropdown-group {
            width: 100%;
          }
          .search-action-btn {
            width: 100%;
            padding: 14px;
          }
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
