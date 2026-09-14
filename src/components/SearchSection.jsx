import { useState } from 'react';
import { Search, ChevronDown, Check, ArrowRight, X } from 'lucide-react';

export default function SearchSection({ onNavigate, openConsultationModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    'All',
    'Services',
    'Solutions',
    'Industries',
    'Insights'
  ];

  // Verified, genuine OmNetaTech content database
  const searchableDatabase = [
    // Services
    { title: 'Software Development', type: 'Services', section: 'services', desc: 'Custom web applications, business software, API development, backend systems and database architectures.' },
    { title: 'Web Development', type: 'Services', section: 'services', desc: 'Responsive business websites, corporate portals, e-commerce solutions, and website maintenance.' },
    { title: 'Mobile App Development', type: 'Services', section: 'services', desc: 'Android applications, iOS applications, cross-platform apps using Flutter/React Native, and API integration.' },
    { title: 'UI/UX Design', type: 'Services', section: 'services', desc: 'Website UI, mobile app interfaces, user experience wireframing, design systems, and component libraries.' },
    { title: 'Cloud & DevOps', type: 'Services', section: 'services', desc: 'Cloud deployment, application hosting, automated CI/CD pipelines, server configuration, and performance optimization.' },
    { title: 'Automation & AI', type: 'Services', section: 'services', desc: 'Business process automation, practical AI features, workflow automation, third-party API connectivity, and custom tools.' },
    { title: 'IT Consulting', type: 'Services', section: 'services', desc: 'Technology consulting, architecture planning, product development strategy, code audits, and digital transformation roadmaps.' },

    // Solutions
    { title: 'Business Website Solutions', type: 'Solutions', section: 'solutions', desc: 'High-performing, responsive websites built to generate client inquiries and establish digital authority.' },
    { title: 'Custom Software Solutions', type: 'Solutions', section: 'solutions', desc: 'Tailored software systems engineered to replace clunky spreadsheets and automate operations.' },
    { title: 'Automation Solutions', type: 'Solutions', section: 'solutions', desc: 'Streamlining repetitive tasks, syncing data between business tools, and accelerating turnaround times.' },
    { title: 'Digital Product Development', type: 'Solutions', section: 'solutions', desc: 'End-to-end MVP building, structured product prototyping, and reliable cloud deployments for startups.' },
    { title: 'E-commerce Solutions', type: 'Solutions', section: 'solutions', desc: 'Custom digital storefronts, product catalogs, Indian payment gateway integrations, and order dispatch tools.' },
    { title: 'Cloud & Infrastructure Solutions', type: 'Solutions', section: 'solutions', desc: 'Secure cloud hosting, automated backups, and server monitoring to guarantee application availability.' },
    { title: 'AI-Powered Business Solutions', type: 'Solutions', section: 'solutions', desc: 'Practical implementations of document parsing, smart internal search, and conversational business assistants.' },

    // Industries
    { title: 'Healthcare Solutions', type: 'Industries', section: 'industries', desc: 'Technology solutions for clinics, health practices, and diagnostic centers: patient booking and digital inquiry portals.' },
    { title: 'Education & LMS Solutions', type: 'Industries', section: 'industries', desc: 'Learning platforms, course enrollment workflows, student portals, and educational resource hubs.' },
    { title: 'Finance & Banking Solutions', type: 'Industries', section: 'industries', desc: 'Client onboarding workflows, billing integrations, financial calculators, and secure account portals.' },
    { title: 'Retail & E-commerce Solutions', type: 'Industries', section: 'industries', desc: 'Online storefronts, catalog management tools, and reliable checkout payment processing.' },
    { title: 'Manufacturing Solutions', type: 'Industries', section: 'industries', desc: 'Internal operational trackers, production scheduling dashboards, and distributor coordination portals.' },
    { title: 'Real Estate Solutions', type: 'Industries', section: 'industries', desc: 'Property listings, interactive floor plans, virtual tours, and automated property inquiry capture.' },
    { title: 'Logistics Solutions', type: 'Industries', section: 'industries', desc: 'Consignment tracking portals, customer booking systems, and automated dispatch status alerts.' },
    { title: 'Startups & SMEs Solutions', type: 'Industries', section: 'industries', desc: 'Agile MVP development, scalable web architectures, and rapid time-to-market software delivery.' },

    // Insights
    { title: 'Key Considerations When Building Custom Web Applications', type: 'Insights', tab: 'insights', desc: 'Why custom software architecture helps growing businesses scale operational workflows efficiently.' },
    { title: 'Practical Automation: Streamlining Internal Operations', type: 'Insights', tab: 'insights', desc: 'How to implement workflow automation to reduce repetitive clerical overhead without overcomplicating tools.' },
    { title: 'Why Mobile Responsiveness Matters for Digital Success', type: 'Insights', tab: 'insights', desc: 'Exploring how mobile optimization and clean typography directly impact client trust and inquiry conversions.' },
    { title: 'Cloud Deployment Fundamentals for Web Applications', type: 'Insights', tab: 'insights', desc: 'A guide to cloud hosting selection, automated backups, and server monitoring tailored for business software.' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    setHasSearched(true);

    const query = searchQuery.trim().toLowerCase();
    const results = searchableDatabase.filter(item => {
      const matchesQuery = query === '' || 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      const matchesCat = selectedCategory === 'All' || item.type === selectedCategory;

      return matchesQuery && matchesCat;
    });

    setSearchResults(results);
  };

  const handleResultClick = (item) => {
    setHasSearched(false);
    if (item.tab && onNavigate) {
      onNavigate(item.tab);
    } else if (item.section) {
      if (onNavigate) {
        onNavigate('home', item.section);
      } else {
        const el = document.getElementById(item.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="search-section-wrap container">
      <div className="search-box-card shadow-md">
        <form className="search-form-row" onSubmit={handleSearch}>
          
          {/* Input */}
          <div className="search-field-left">
            <Search size={18} className="search-icon-svg" />
            <input 
              type="text" 
              placeholder="Search services, solutions, industries, or technical insights..."
              className="search-text-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (hasSearched) setHasSearched(false);
              }}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="btn-clear-query"
                onClick={() => {
                  setSearchQuery('');
                  setHasSearched(false);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="search-category-dropdown">
            <button 
              type="button" 
              className="category-dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>
              <ChevronDown size={14} className={`chevron-down ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            {isDropdownOpen && (
              <ul className="category-options-menu shadow-lg">
                {categories.map((cat, idx) => (
                  <li 
                    key={idx}
                    className={`category-option-item ${selectedCategory === cat ? 'active-cat' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span>{cat === 'All' ? 'All Categories' : cat}</span>
                    {selectedCategory === cat && <Check size={14} className="check-icon" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary-blue search-submit-btn">
            Find Solutions
          </button>
        </form>

        {/* Search Results Overlay */}
        {hasSearched && (
          <div className="live-search-results animate-fade-in">
            <div className="results-status-bar">
              <span className="results-count-text">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </span>
              <button className="close-results-btn" onClick={() => setHasSearched(false)}>
                Close Results
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="results-grid-cards">
                {searchResults.map((res, i) => (
                  <div 
                    key={i} 
                    className="search-result-card shadow-sm"
                    onClick={() => handleResultClick(res)}
                  >
                    <div className="result-card-top">
                      <span className="result-type-badge">{res.type}</span>
                      <ArrowRight size={14} className="result-arrow-icon" />
                    </div>
                    <h4 className="result-title">{res.title}</h4>
                    <p className="result-desc">{res.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-no-results">
                <p>No exact results found for "{searchQuery}".</p>
                <button 
                  className="btn-primary-blue mt-3"
                  onClick={() => {
                    setHasSearched(false);
                    if (openConsultationModal) openConsultationModal();
                  }}
                >
                  Consult Our Team Directly
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .search-section-wrap {
          position: relative;
          z-index: 30;
          margin-top: -30px;
          margin-bottom: 40px;
        }

        .search-box-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 8px;
          position: relative;
        }

        .search-form-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-field-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 11px 16px;
          border-radius: var(--radius-sm);
        }

        .search-icon-svg {
          color: var(--color-primary-blue);
          flex-shrink: 0;
        }

        .search-text-input {
          width: 100%;
          background: none;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.9rem;
          color: var(--color-primary-navy);
        }

        .search-text-input::placeholder {
          color: var(--color-text-secondary);
        }

        .btn-clear-query {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        /* Dropdown */
        .search-category-dropdown {
          position: relative;
          min-width: 170px;
        }

        .category-dropdown-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-primary-navy);
          cursor: pointer;
        }

        .chevron-down {
          color: var(--color-text-secondary);
          transition: transform var(--transition-fast);
        }

        .chevron-down.open {
          transform: rotate(180deg);
        }

        .category-options-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          list-style: none;
          padding: 6px 0;
          z-index: 50;
        }

        .category-option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          font-size: 0.84rem;
          color: var(--color-primary-navy);
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .category-option-item:hover, .category-option-item.active-cat {
          background: var(--color-light-blue);
          color: var(--color-primary-blue);
        }

        .check-icon {
          color: var(--color-primary-blue);
        }

        .search-submit-btn {
          padding: 12px 24px;
          font-size: 0.9rem;
        }

        /* Results */
        .live-search-results {
          margin-top: 14px;
          border-top: 1px solid var(--color-border);
          padding: 20px 8px 12px 8px;
        }

        .results-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .results-count-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-primary-blue);
          text-transform: uppercase;
        }

        .close-results-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.82rem;
          cursor: pointer;
          font-weight: 600;
        }

        .close-results-btn:hover {
          color: var(--color-primary-navy);
        }

        .results-grid-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .search-result-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 16px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .search-result-card:hover {
          background: var(--color-white);
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }

        .result-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .result-type-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--color-primary-blue);
          background: var(--color-light-blue);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .result-arrow-icon {
          color: var(--color-text-secondary);
        }

        .search-result-card:hover .result-arrow-icon {
          color: var(--color-primary-blue);
        }

        .result-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 6px;
        }

        .result-desc {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .search-no-results {
          text-align: center;
          padding: 30px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .mt-3 {
          margin-top: 12px;
        }

        @media (max-width: 900px) {
          .search-form-row {
            flex-direction: column;
            align-items: stretch;
          }
          .search-category-dropdown {
            width: 100%;
          }
          .results-grid-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
