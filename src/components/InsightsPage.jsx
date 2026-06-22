import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Download, CheckCircle2, Loader2, X } from 'lucide-react';

export default function InsightsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedWhitepaper, setSelectedWhitepaper] = useState(null);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const posts = [
    {
      id: 1,
      type: 'whitepaper',
      category: 'AI Research',
      title: 'Fine-Tuning Private LLMs: Security Protocols for Financial Datasets',
      date: 'May 12, 2026',
      readTime: '18 Min Read',
      desc: 'An architectural breakdown of deploying agentic AI systems inside secure banking networks. Covers RAG metadata stripping and HIPAA/SOC 2 alignment.',
      author: 'Dr. Aaron Patel, CTO',
      downloadUrl: '#temp-pdf-1'
    },
    {
      id: 2,
      type: 'guide',
      category: 'Infrastructure',
      title: 'Zero-Downtime Multi-Cloud Kubernetes Orchestration',
      date: 'June 02, 2026',
      readTime: '12 Min Read',
      desc: 'A step-by-step technical guide for cross-region data failover using Terraform and GitOps pipeline synchronization. Includes configuration benchmarks.',
      author: 'Elena Rostova, CEO',
      downloadUrl: '#temp-pdf-2'
    },
    {
      id: 3,
      type: 'report',
      category: 'Security',
      title: 'The Zero-Trust Framework: Corporate Security Roadmap for 2026',
      date: 'June 18, 2026',
      readTime: '24 Min Read',
      desc: 'An analyst report detailing emerging endpoint threat vectors, Active Directory vulnerabilities, and ZTNA perimeter protection architectures.',
      author: 'Claire Moreau, Head of Security',
      downloadUrl: '#temp-pdf-3'
    }
  ];

  const handleDownloadClick = (wp) => {
    setSelectedWhitepaper(wp);
    setDownloadSuccess(false);
    setDownloadEmail('');
  };

  const handleDownloadSubmit = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
    }, 1500);
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(p => p.type === filter || p.category.toLowerCase().includes(filter));

  return (
    <div className="insights-page-wrapper">
      <div className="grid-overlay"></div>
      
      {/* Hero Banner */}
      <div className="insights-hero container">
        <div className="badge">Insights & Research</div>
        <h1 className="insights-hero-title">
          Enterprise Technology <br />
          <span className="text-gradient">Intelligence</span>
        </h1>
        <p className="insights-hero-sub">
          Explore research reports, architectural guides, and whitepapers written by OmNetaTech's solutions architects and research engineers. Stay informed on secure digital strategies.
        </p>
      </div>

      {/* Publications Grid */}
      <section className="publications-section container">
        <div className="publications-header">
          <h2 className="pub-title">Research Library</h2>
          
          <div className="pub-tabs">
            <button className={`pub-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Insights</button>
            <button className={`pub-btn ${filter === 'whitepaper' ? 'active' : ''}`} onClick={() => setFilter('whitepaper')}>Whitepapers</button>
            <button className={`pub-btn ${filter === 'guide' ? 'active' : ''}`} onClick={() => setFilter('guide')}>Technical Guides</button>
            <button className={`pub-btn ${filter === 'report' ? 'active' : ''}`} onClick={() => setFilter('report')}>Analyst Reports</button>
          </div>
        </div>

        <div className="pub-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="pub-card shadow-md">
              <div className="pub-card-top">
                <span className="pub-badge-cat">{post.category}</span>
                <div className="pub-meta">
                  <span className="pub-meta-item"><Calendar size={12} /> {post.date}</span>
                  <span className="pub-meta-item"><Clock size={12} /> {post.readTime}</span>
                </div>
              </div>

              <h3 className="pub-card-title">{post.title}</h3>
              <p className="pub-card-desc">{post.desc}</p>
              
              <div className="pub-card-footer">
                <div className="pub-author">{post.author}</div>
                {post.type === 'whitepaper' || post.type === 'report' ? (
                  <button className="btn-pub-download" onClick={() => handleDownloadClick(post)}>
                    <span>Download PDF</span>
                    <Download size={14} />
                  </button>
                ) : (
                  <a href="#contact" className="btn-pub-read">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Whitepaper Download Modal */}
      {selectedWhitepaper && (
        <div className="modal-backdrop" onClick={() => setSelectedWhitepaper(null)}>
          <div className="modal-content shadow-premium" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-badge">Request Document Access</div>
              <h3 className="modal-title">Download Report</h3>
              <button className="btn-close-modal" onClick={() => setSelectedWhitepaper(null)}>
                <X size={20} />
              </button>
            </div>

            {!downloadSuccess ? (
              <form className="modal-step-body" onSubmit={handleDownloadSubmit}>
                <p className="wp-prompt-text">
                  Please enter your enterprise email to receive the download package for: <br />
                  <strong className="text-cyan">"{selectedWhitepaper.title}"</strong>
                </p>

                <div className="form-field full-width" style={{ marginTop: '20px' }}>
                  <label className="field-label">Corporate Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input-text" 
                    placeholder="E.g. e.vance@company.com"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                  />
                </div>

                <div className="form-actions-row" style={{ marginTop: '24px' }}>
                  <button type="button" className="btn-back-step" onClick={() => setSelectedWhitepaper(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-form" disabled={isDownloading}>
                    {isDownloading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Document...</span>
                      </>
                    ) : (
                      <>
                        <span>Get PDF Document</span>
                        <Download size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-step-body success-body">
                <CheckCircle2 size={64} className="success-icon-svg" />
                <h4 className="success-heading">Document Secured</h4>
                <p className="success-desc">
                  We have dispatched the document link for <strong>"{selectedWhitepaper.title}"</strong> to <strong>{downloadEmail}</strong>. Please check your inbox within the next 2 minutes.
                </p>
                <button className="btn-success-close" onClick={() => setSelectedWhitepaper(null)}>
                  Return to Insights
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .insights-page-wrapper {
          position: relative;
          background-color: var(--color-navy-dark);
          color: var(--color-white-pure);
          padding-top: 120px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        .insights-hero {
          text-align: center;
          max-width: 800px;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .insights-hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-top: 16px;
          margin-bottom: 24px;
        }

        .insights-hero-sub {
          font-size: 1.15rem;
          color: var(--color-gray-medium);
          line-height: 1.6;
        }

        /* Publications Section */
        .publications-section {
          margin-bottom: 60px;
        }

        .publications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 24px;
          margin-bottom: 40px;
        }

        .pub-title {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .pub-tabs {
          display: flex;
          gap: 10px;
        }

        .pub-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-gray-dark);
          padding: 8px 16px;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .pub-btn:hover, .pub-btn.active {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.08);
        }

        /* Pub Grid */
        .pub-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .pub-card {
          background: rgba(13, 34, 60, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-md);
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .pub-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 191, 255, 0.2);
          background: rgba(13, 34, 60, 0.45);
        }

        .pub-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .pub-badge-cat {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-cyan);
          background: rgba(0, 191, 255, 0.1);
          padding: 2px 8px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .pub-meta {
          display: flex;
          gap: 12px;
          font-size: 0.7rem;
          color: var(--color-gray-dark);
        }

        .pub-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pub-card-title {
          font-family: var(--font-title);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-white-pure);
          line-height: 1.4;
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .pub-card-desc {
          font-size: 0.85rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .pub-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: auto;
        }

        .pub-author {
          font-size: 0.8rem;
          color: var(--color-gray-dark);
          font-weight: 500;
        }

        .btn-pub-download {
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.2);
          color: var(--color-cyan);
          font-family: var(--font-primary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .btn-pub-download:hover {
          background: var(--color-cyan);
          color: var(--color-navy-dark);
        }

        .btn-pub-read {
          color: var(--color-white-pure);
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-pub-read:hover {
          color: var(--color-cyan);
        }

        .wp-prompt-text {
          font-size: 0.95rem;
          color: var(--color-gray-medium);
          line-height: 1.5;
        }

        @media (max-width: 991px) {
          .publications-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .pub-tabs {
            flex-wrap: wrap;
          }
          .pub-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pub-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
