import { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, BookOpen } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function InsightsPage({ openConsultationModal }) {
  const { insights: dynamicInsights } = useCms();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readArticle, setReadArticle] = useState(null);

  const categories = [
    'All',
    'Technology',
    'Software Development',
    'AI & Automation',
    'Cloud',
    'Web Development',
    'Business Technology'
  ];

  const defaultArticles = [
    {
      id: 1,
      category: 'Software Development',
      title: 'Key Considerations When Building Custom Web Applications for Growing Businesses',
      date: 'August 2026',
      readTime: '6 min read',
      author: 'OmNetaTech Engineering Team',
      summary: 'Why off-the-shelf software often creates operational bottlenecks, and how custom software architectures help companies scale their workflows efficiently.',
      content: [
        'As organizations grow, their operational processes invariably diverge from generic software templates. While standard SaaS tools are excellent for early-stage validation, expanding companies soon encounter data silos, manual reconciliation steps, and subscription overhead.',
        'Custom web applications allow businesses to design databases and user interfaces directly around their actual operations. When architected cleanly, custom software provides proprietary data ownership, eliminates recurring seat licensing fees, and adapts smoothly as operational needs change.',
        'When planning a custom web application, teams should prioritize clean database schema design, modular API endpoints, and a component-driven frontend architecture to ensure long-term maintainability.'
      ]
    },
    {
      id: 2,
      category: 'AI & Automation',
      title: 'Practical Automation: Streamlining Operations Without Overcomplicating Tools',
      date: 'July 2026',
      readTime: '5 min read',
      author: 'OmNetaTech Engineering Team',
      summary: 'How small to mid-sized organizations can implement workflow automation and intelligent document tools to reduce daily manual tasks.',
      content: [
        'Automation does not need to mean complex machine learning models or expensive enterprise software suites. Most business efficiency gains come from automating high-frequency, repetitive tasks.',
        'Examples include automatically parsing incoming customer inquiries into internal trackers, triggering instant WhatsApp or email alerts to the sales team, and generating formatted PDF invoices automatically upon payment confirmation.',
        'By focusing on high-ROI automation bottlenecks first, organizations can free up valuable employee time and reduce clerical errors without incurring high implementation overhead.'
      ]
    },
    {
      id: 3,
      category: 'Web Development',
      title: 'Why Mobile Responsiveness and Fast Loading Speed Matter for Digital Success',
      date: 'July 2026',
      readTime: '4 min read',
      author: 'OmNetaTech Engineering Team',
      summary: 'Exploring why responsive design, web performance optimization, and clean typography directly impact client trust and inquiry conversions.',
      content: [
        'In the modern digital landscape, over 70% of initial business website visits in India happen on mobile devices. A website that is slow to load or suffers from broken touch layouts creates an immediate impression of technical neglect.',
        'Optimizing images, eliminating unnecessary third-party scripts, and enforcing clean semantic HTML ensures fast load times even on mobile connections.',
        'A fast, responsive website establishes technical credibility within seconds, reassuring prospective clients and significantly increasing the likelihood of an inquiry.'
      ]
    },
    {
      id: 4,
      category: 'Cloud',
      title: 'Cloud Deployment Fundamentals: Choosing Dependable Hosting for Web Applications',
      date: 'June 2026',
      readTime: '5 min read',
      author: 'OmNetaTech Engineering Team',
      summary: 'A guide to cloud hosting selection, automated backups, and server monitoring tailored for business applications.',
      content: [
        'Selecting the right cloud hosting architecture is crucial for maintaining application uptime and data security without paying for idle server capacity.',
        'Key cloud fundamentals include setting up automated database backups, configuring SSL certificates properly, implementing automated deployment pipelines (CI/CD), and monitoring server CPU and memory usage proactively.',
        'A dependable hosting setup ensures your business applications remain available to clients 24/7 with zero unexpected downtime.'
      ]
    }
  ];

  const articles = dynamicInsights && dynamicInsights.length > 0
    ? dynamicInsights.map(a => ({
        id: a.id,
        category: a.category || 'Technology',
        title: a.title,
        date: a.date || 'Recent',
        readTime: a.readTime || '5 min read',
        author: a.author || 'OmNetaTech Engineering Team',
        summary: a.summary || '',
        content: Array.isArray(a.content) ? a.content : [a.content || '']
      }))
    : defaultArticles;

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="insights-root">
      
      {/* Hero */}
      <section className="insights-hero-section section-white">
        <div className="container insights-hero-inner">
          <div className="badge">Knowledge & Perspectives</div>
          <h1 className="insights-hero-title">Insights & Technology Perspectives</h1>
          <p className="insights-hero-lead">
            Pragmatic articles and engineering guides from the OmNetaTech team on software development, web technology, automation, and modern digital architectures.
          </p>
        </div>
      </section>

      {/* Main Content & Categories */}
      <section className="section section-light">
        <div className="container">
          
          {/* Category Filter Pills */}
          <div className="category-filter-bar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`category-pill-btn ${selectedCategory === cat ? 'active-cat-btn' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="articles-grid">
              {filteredArticles.map((art) => (
                <article key={art.id} className="article-card shadow-sm">
                  <div className="article-card-top">
                    <span className="article-category-tag">{art.category}</span>
                    <div className="article-meta-group">
                      <span className="meta-item"><Calendar size={12} /> {art.date}</span>
                      <span className="meta-item"><Clock size={12} /> {art.readTime}</span>
                    </div>
                  </div>

                  <h2 className="article-title">{art.title}</h2>
                  <p className="article-summary">{art.summary}</p>

                  <div className="article-card-footer">
                    <span className="article-author">{art.author}</span>
                    <button 
                      className="article-read-btn"
                      onClick={() => setReadArticle(art)}
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-insights-box shadow-sm">
              <BookOpen size={36} className="empty-icon" />
              <h3 className="empty-title">Insights coming soon for this category</h3>
              <p className="empty-desc">
                Our engineering team regularly publishes technical breakdowns. Check back soon or browse other categories.
              </p>
              <button className="btn-secondary-outline" onClick={() => setSelectedCategory('All')}>
                View All Insights
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Article Reader Modal */}
      {readArticle && (
        <div className="article-modal-backdrop" onClick={() => setReadArticle(null)}>
          <div className="article-modal-body shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="article-modal-header">
              <span className="article-category-tag">{readArticle.category}</span>
              <button className="modal-close-btn" onClick={() => setReadArticle(null)} aria-label="Close article">
                <X size={20} />
              </button>
            </div>

            <div className="article-modal-content">
              <h2 className="modal-article-title">{readArticle.title}</h2>
              <div className="modal-article-meta">
                <span>By {readArticle.author}</span>
                <span>•</span>
                <span>{readArticle.date}</span>
                <span>•</span>
                <span>{readArticle.readTime}</span>
              </div>

              <div className="article-paragraphs">
                {readArticle.content.map((p, idx) => (
                  <p key={idx} className="article-body-p">{p}</p>
                ))}
              </div>

              <div className="article-modal-cta">
                <div>
                  <div className="modal-cta-heading">Need assistance implementing this in your business?</div>
                  <div className="modal-cta-sub">Talk with our engineering team for a free technical consultation.</div>
                </div>
                <button 
                  className="btn-primary-blue"
                  onClick={() => {
                    setReadArticle(null);
                    if (openConsultationModal) openConsultationModal();
                  }}
                >
                  Consult OmNetaTech
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .insights-root {
          background-color: var(--color-bg);
        }

        .insights-hero-section {
          padding: 80px 0 60px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .insights-hero-inner {
          text-align: center;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .insights-hero-title {
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          color: var(--color-primary-navy);
          font-weight: 800;
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .insights-hero-lead {
          font-size: clamp(1.05rem, 1.25vw, 1.15rem);
          color: var(--color-text-secondary);
          line-height: 1.65;
        }

        /* Filter Pills */
        .category-filter-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 48px;
        }

        .category-pill-btn {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .category-pill-btn:hover {
          color: var(--color-primary-navy);
          border-color: #CBD5E1;
        }

        .active-cat-btn {
          background-color: var(--color-primary-blue) !important;
          color: var(--color-white) !important;
          border-color: var(--color-primary-blue) !important;
          box-shadow: 0 2px 8px rgba(23, 105, 224, 0.2);
        }

        /* Articles Grid */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .article-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-fast);
        }

        .article-card:hover {
          border-color: var(--color-primary-blue);
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }

        .article-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .article-category-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          background: var(--color-light-blue);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .article-meta-group {
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .article-title {
          font-size: 1.3rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.35;
        }

        .article-summary {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .article-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border);
          padding-top: 16px;
          margin-top: auto;
        }

        .article-author {
          font-size: 0.8rem;
          color: var(--color-primary-navy);
          font-weight: 600;
        }

        .article-read-btn {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-primary-blue);
          cursor: pointer;
        }

        .article-read-btn:hover {
          text-decoration: underline;
        }

        /* Empty State */
        .empty-insights-box {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 540px;
          margin: 0 auto;
        }

        .empty-icon {
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 1.3rem;
          color: var(--color-primary-navy);
          font-weight: 700;
          margin-bottom: 8px;
        }

        .empty-desc {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          line-height: 1.6;
        }

        /* Modal */
        .article-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 31, 58, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 2100;
        }

        .article-modal-body {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          max-width: 720px;
          width: 100%;
          border: 1px solid var(--color-border);
          max-height: 88vh;
          overflow-y: auto;
          animation: fadeIn 0.25s ease-out;
        }

        .article-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px;
          border-bottom: 1px solid var(--color-border);
        }

        .article-modal-content {
          padding: 32px 28px;
        }

        .modal-article-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--color-primary-navy);
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .modal-article-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--color-text-secondary);
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .article-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .article-body-p {
          font-size: 0.95rem;
          color: var(--color-text);
          line-height: 1.7;
        }

        .article-modal-cta {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .modal-cta-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-primary-navy);
          margin-bottom: 4px;
        }

        .modal-cta-sub {
          font-size: 0.82rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 840px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
