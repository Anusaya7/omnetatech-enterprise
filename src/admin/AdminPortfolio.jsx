import { useState, useEffect } from 'react';
import { 
  FolderKanban, Plus, Edit, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminPortfolio({ showToast }) {
  const { refreshData } = useCms();
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    tag: 'web',
    badge: 'Sample Project',
    category: 'Custom Web Application',
    icon: 'Code',
    status: 'Published',
    displayOrder: 1,
    summary: '',
    challenge: '',
    approach: '',
    deliverablesText: ''
  });

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const list = await api.getPortfolio();
      setPortfolio(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getPortfolio()
      .then((list) => {
        if (active) {
          setPortfolio(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load portfolio:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      tag: 'web',
      badge: 'Sample Project',
      category: 'Custom Web Application',
      icon: 'Code',
      status: 'Published',
      displayOrder: portfolio.length + 1,
      summary: '',
      challenge: '',
      approach: '',
      deliverablesText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      tag: proj.tag || 'web',
      badge: proj.badge || 'Sample Project',
      category: proj.category || 'Custom Web Application',
      icon: proj.icon || 'Code',
      status: proj.status || 'Published',
      displayOrder: proj.displayOrder || 1,
      summary: proj.summary || '',
      challenge: proj.challenge || '',
      approach: proj.approach || '',
      deliverablesText: Array.isArray(proj.deliverables) ? proj.deliverables.join('\n') : ''
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
      deliverables: formData.deliverablesText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await api.updatePortfolio(editingProject.id, payload);
        showToast?.('Project updated successfully');
      } else {
        await api.createPortfolio(payload);
        showToast?.('New project added to portfolio');
      }
      setIsModalOpen(false);
      await fetchPortfolio();
      await refreshData();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deletePortfolio(id);
      setDeleteConfirmId(null);
      showToast?.('Project removed from portfolio');
      await fetchPortfolio();
      await refreshData();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="cms-page-root">
      <div className="cms-page-header">
        <div>
          <h1 className="page-title">Portfolio CMS (Selected Work)</h1>
          <p className="page-sub">
            Manage case studies, sample projects, and technical architectures showcased on the public site.
          </p>
        </div>
        <button className="btn-add-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading portfolio projects...</span>
          </div>
        ) : portfolio.length === 0 ? (
          <div className="empty-state">
            <FolderKanban size={36} className="empty-icon" />
            <h3>No Portfolio Projects Found</h3>
            <p>Click "Add New Project" to add a sample project or case study.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Project Title & Badge</th>
                  <th>Domain Tag</th>
                  <th>Summary</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((proj) => (
                  <tr key={proj.id}>
                    <td>
                      <span className="order-pill">{proj.displayOrder}</span>
                    </td>
                    <td>
                      <div className="title-cell">
                        <div className="title-row">
                          <strong>{proj.title}</strong>
                          <span className="badge-pill">{proj.badge}</span>
                        </div>
                        <span className="cat-sub">{proj.category}</span>
                      </div>
                    </td>
                    <td>
                      <span className="tag-pill">{proj.tag}</span>
                    </td>
                    <td>
                      <span className="summary-clamp">{proj.summary}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${proj.status === 'Published' ? 'published' : 'draft'}`}>
                        {proj.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEdit(proj)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteConfirmId(proj.id)}>
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
              <h3>Delete Project?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to remove this project from the portfolio?
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
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Project Title *</label>
                    <input 
                      type="text" 
                      required 
                      className="cms-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
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
                    <label className="form-label">Filter Tag</label>
                    <select 
                      className="form-select"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    >
                      <option value="web">Web Applications (web)</option>
                      <option value="mobile">Mobile Apps (mobile)</option>
                      <option value="ecommerce">E-commerce (ecommerce)</option>
                      <option value="automation">Automation (automation)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Card Badge Label</label>
                    <select 
                      className="form-select"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    >
                      <option value="Sample Project">Sample Project</option>
                      <option value="Selected Solution">Selected Solution</option>
                      <option value="Featured Platform">Featured Platform</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category Subtitle</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon</label>
                    <select 
                      className="form-select"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    >
                      <option value="Database">Database</option>
                      <option value="ShoppingBag">ShoppingBag</option>
                      <option value="Code">Code</option>
                      <option value="Smartphone">Smartphone</option>
                      <option value="Cpu">Cpu</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Display Order</label>
                    <input 
                      type="number" 
                      min="1"
                      className="cms-input"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
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
                    <label className="form-label">One-Paragraph Summary</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">The Operational Challenge</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Engineering Approach & Strategy</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.approach}
                      onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Key Deliverables (One item per line)</label>
                    <textarea 
                      rows="4"
                      className="cms-textarea font-mono"
                      placeholder="Secure role-based dashboard&#10;Automated billing and invoice generation&#10;Client milestone tracking"
                      value={formData.deliverablesText}
                      onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-blue" disabled={isSaving}>
                  <span>{isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}</span>
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
        .title-row { display: flex; align-items: center; gap: 8px; }
        .badge-pill { font-size: 0.7rem; font-weight: 600; background: #F1F5F9; color: #475569; padding: 1px 6px; border-radius: 4px; }
        .cat-sub { font-size: 0.76rem; color: #64748B; }
        .tag-pill { background: #EFF6FF; color: #1769E0; font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .summary-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.82rem; line-height: 1.4; max-width: 320px; }

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
        .modal-card { background: #FFFFFF; border-radius: 12px; max-width: 640px; width: 100%; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; }
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
        .font-mono { font-family: monospace; font-size: 0.82rem; }

        .modal-footer { padding: 16px 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; gap: 12px; background: #F8FAFC; }
        .btn-danger { background: #DC2626; color: #FFFFFF; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.84rem; font-weight: 600; cursor: pointer; }
        .text-danger { color: #DC2626; }
      `}</style>
    </div>
  );
}
