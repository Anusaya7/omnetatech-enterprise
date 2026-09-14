import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Edit, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminInsights({ showToast }) {
  const { refreshData } = useCms();
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Software Development',
    author: 'OmNetaTech Engineering Team',
    date: 'September 2026',
    readTime: '5 min read',
    status: 'Published',
    displayOrder: 1,
    summary: '',
    contentText: ''
  });

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const list = await api.getInsights();
      setInsights(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getInsights()
      .then((list) => {
        if (active) {
          setInsights(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load insights:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Software Development',
      author: 'OmNetaTech Engineering Team',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: '5 min read',
      status: 'Published',
      displayOrder: insights.length + 1,
      summary: '',
      contentText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art) => {
    setEditingArticle(art);
    setFormData({
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Software Development',
      author: art.author || 'OmNetaTech Engineering Team',
      date: art.date || '',
      readTime: art.readTime || '5 min read',
      status: art.status || 'Published',
      displayOrder: art.displayOrder || 1,
      summary: art.summary || '',
      contentText: Array.isArray(art.content) ? art.content.join('\n\n') : (art.content || '')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      displayOrder: parseInt(formData.displayOrder || 1, 10),
      content: formData.contentText.split('\n\n').map(p => p.trim()).filter(Boolean)
    };

    try {
      if (editingArticle) {
        await api.updateInsight(editingArticle.id, payload);
        showToast?.('Article updated successfully');
      } else {
        await api.createInsight(payload);
        showToast?.('New article published successfully');
      }
      setIsModalOpen(false);
      await fetchInsights();
      await refreshData();
    } catch (err) {
      console.error('Error saving article:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteInsight(id);
      setDeleteConfirmId(null);
      showToast?.('Article deleted');
      await fetchInsights();
      await refreshData();
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  return (
    <div className="cms-page-root">
      <div className="cms-page-header">
        <div>
          <h1 className="page-title">Insights & Articles CMS</h1>
          <p className="page-sub">
            Publish engineering articles, practical guides, and technology insights.
          </p>
        </div>
        <button className="btn-add-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading articles...</span>
          </div>
        ) : insights.length === 0 ? (
          <div className="empty-state">
            <FileText size={36} className="empty-icon" />
            <h3>No Articles Published</h3>
            <p>Click "Write New Article" to draft an engineering perspective.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Article Title</th>
                  <th>Category</th>
                  <th>Published Date</th>
                  <th>Read Time</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {insights.map((art) => (
                  <tr key={art.id}>
                    <td>
                      <span className="order-pill">{art.displayOrder}</span>
                    </td>
                    <td>
                      <div className="title-cell">
                        <strong>{art.title}</strong>
                        <span className="summary-clamp">{art.summary}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cat-badge">{art.category}</span>
                    </td>
                    <td>
                      <span className="meta-sub">{art.date}</span>
                    </td>
                    <td>
                      <span className="meta-sub">{art.readTime}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${art.status === 'Published' ? 'published' : 'draft'}`}>
                        {art.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEdit(art)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteConfirmId(art.id)}>
                          <Trash2 size={14} />
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

      {deleteConfirmId && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-card mini shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <AlertCircle size={24} className="text-danger" />
              <h3>Delete Article?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to delete this article?
            </p>
            <div className="modal-footer">
              <button className="btn-secondary-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirmId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-heading">
                {editingArticle ? `Edit Article: ${editingArticle.title}` : 'Draft New Article'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-span">
                    <label className="form-label">Article Title *</label>
                    <input 
                      type="text" 
                      required 
                      className="cms-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">URL Slug</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Author Byline</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date String</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Read Time</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Article Summary (Shown on previews)</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Article Content (Separate paragraphs with blank lines)</label>
                    <textarea 
                      rows="6"
                      className="cms-textarea"
                      value={formData.contentText}
                      onChange={(e) => setFormData({ ...formData, contentText: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-blue" disabled={isSaving}>
                  <span>{isSaving ? 'Saving...' : editingArticle ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <style>{`
        .cms-page-root { display: flex; flex-direction: column; gap: 24px; }
        .cms-page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .page-title { font-size: 1.55rem; font-weight: 700; color: #0F172A; letter-spacing: -0.02em; margin-bottom: 4px; }
        .page-sub { font-size: 0.88rem; color: #64748B; }
        .btn-add-primary {
          display: inline-flex; align-items: center; gap: 8px; background: #1769E0; color: #FFFFFF;
          border: none; padding: 9px 16px; border-radius: 6px; font-size: 0.84rem; font-weight: 600; cursor: pointer;
        }
        .btn-add-primary:hover { background: #1255B8; }

        .table-panel { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden; }
        .table-responsive { overflow-x: auto; }
        .cms-table { width: 100%; border-collapse: collapse; text-align: left; }
        .cms-table th {
          font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: #64748B; padding: 12px 16px; border-bottom: 1px solid #E2E8F0; background: #F8FAFC;
        }
        .cms-table td { padding: 14px 16px; border-bottom: 1px solid #F1F5F9; font-size: 0.86rem; vertical-align: middle; }

        .order-pill { display: inline-block; background: #F1F5F9; color: #475569; font-size: 0.76rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
        .title-cell { display: flex; flex-direction: column; }
        .summary-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.78rem; color: #64748B; line-height: 1.35; max-width: 360px; margin-top: 3px; }
        .cat-badge { background: #EFF6FF; color: #1769E0; font-size: 0.76rem; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
        .meta-sub { font-size: 0.8rem; color: #64748B; }

        .status-pill { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; }
        .pill-published { background: #D1FAE5; color: #059669; }
        .pill-draft { background: #F1F5F9; color: #64748B; }

        .actions-cell { display: inline-flex; align-items: center; gap: 6px; }
        .btn-edit {
          display: inline-flex; align-items: center; gap: 4px; background: #FFFFFF; border: 1px solid #CBD5E1;
          border-radius: 4px; padding: 4px 8px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer;
        }
        .btn-edit:hover { background: #F1F5F9; }
        .btn-delete { background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px; padding: 4px 6px; color: #94A3B8; cursor: pointer; }
        .btn-delete:hover { background: #FEE2E2; color: #DC2626; border-color: #F87171; }

        /* Modal */
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(11, 31, 58, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px;
        }
        .modal-card { background: #FFFFFF; border-radius: 12px; max-width: 680px; width: 100%; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; }
        .modal-card.mini { max-width: 420px; padding: 24px; }
        .delete-modal-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .delete-modal-desc { font-size: 0.88rem; color: #64748B; margin-bottom: 20px; }

        .modal-header { padding: 20px 24px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; }
        .modal-heading { font-size: 1.25rem; font-weight: 700; color: #0F172A; }
        .modal-close-btn { background: none; border: none; font-size: 1.5rem; color: #94A3B8; cursor: pointer; }
        .modal-body { padding: 24px; overflow-y: auto; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full-span { grid-column: 1 / -1; }
        .form-label { font-size: 0.8rem; font-weight: 600; color: #1E293B; }
        .cms-input, .form-select, .cms-textarea {
          padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 0.88rem; color: #0F172A; outline: none;
        }
        .cms-input:focus, .form-select:focus, .cms-textarea:focus {
          border-color: #1769E0; box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.12);
        }

        .modal-footer { padding: 16px 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; gap: 12px; background: #F8FAFC; }
        .btn-danger { background: #DC2626; color: #FFFFFF; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.84rem; font-weight: 600; cursor: pointer; }
        .text-danger { color: #DC2626; }
      `}</style>
    </div>
  );
}
