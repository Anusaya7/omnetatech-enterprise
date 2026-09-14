import { useState, useEffect } from 'react';
import { 
  Layers, Plus, Edit, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminSolutions({ showToast }) {
  const { refreshData } = useCms();
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    tagline: '',
    problem: '',
    solution: '',
    benefit: '',
    icon: 'Layers',
    status: 'Published',
    displayOrder: 1
  });

  const fetchSolutions = async () => {
    setIsLoading(true);
    try {
      const list = await api.getSolutions();
      setSolutions(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load solutions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getSolutions()
      .then((list) => {
        if (active) {
          setSolutions(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load solutions:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingSolution(null);
    setFormData({
      title: '',
      slug: '',
      tagline: '',
      problem: '',
      solution: '',
      benefit: '',
      icon: 'Layers',
      status: 'Published',
      displayOrder: solutions.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sol) => {
    setEditingSolution(sol);
    setFormData({
      title: sol.title || '',
      slug: sol.slug || '',
      tagline: sol.tagline || '',
      problem: sol.problem || '',
      solution: sol.solution || '',
      benefit: sol.benefit || '',
      icon: sol.icon || 'Layers',
      status: sol.status || 'Published',
      displayOrder: sol.displayOrder || 1
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      displayOrder: parseInt(formData.displayOrder || 1, 10)
    };

    try {
      if (editingSolution) {
        await api.updateSolution(editingSolution.id, payload);
        showToast?.('Solution updated successfully');
      } else {
        await api.createSolution(payload);
        showToast?.('New solution created successfully');
      }
      setIsModalOpen(false);
      await fetchSolutions();
      await refreshData();
    } catch (err) {
      console.error('Error saving solution:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSolution(id);
      setDeleteConfirmId(null);
      showToast?.('Solution deleted');
      await fetchSolutions();
      await refreshData();
    } catch (err) {
      console.error('Error deleting solution:', err);
    }
  };

  return (
    <div className="cms-page-root">
      
      {/* Header */}
      <div className="cms-page-header">
        <div>
          <h1 className="page-title">Solutions CMS</h1>
          <p className="page-sub">
            Manage business problem-to-solution mappings and expected commercial outcomes.
          </p>
        </div>
        <button className="btn-add-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Solution</span>
        </button>
      </div>

      {/* Solutions Table */}
      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading solutions...</span>
          </div>
        ) : solutions.length === 0 ? (
          <div className="empty-state">
            <Layers size={36} className="empty-icon" />
            <h3>No Solutions Found</h3>
            <p>Click "Add New Solution" to add an offering.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Title & Tagline</th>
                  <th>Problem Addressed</th>
                  <th>Delivered Benefit</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((sol) => (
                  <tr key={sol.id}>
                    <td>
                      <span className="order-pill">{sol.displayOrder}</span>
                    </td>
                    <td>
                      <div className="sol-title-col">
                        <strong>{sol.title}</strong>
                        <span className="tagline-text">{sol.tagline}</span>
                      </div>
                    </td>
                    <td>
                      <span className="clamp-text">{sol.problem}</span>
                    </td>
                    <td>
                      <span className="clamp-text text-emerald">{sol.benefit}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${sol.status === 'Published' ? 'published' : 'draft'}`}>
                        {sol.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEdit(sol)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteConfirmId(sol.id)}>
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

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-card mini shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <AlertCircle size={24} className="text-danger" />
              <h3>Delete Solution?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to delete this solution? It will be removed from the public website immediately.
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-heading">
                {editingSolution ? `Edit Solution: ${editingSolution.title}` : 'Add New Solution'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Solution Title *</label>
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

                  <div className="form-group full-span">
                    <label className="form-label">Solution Tagline / Value Pitch</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon Name</label>
                    <select 
                      className="form-select"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    >
                      <option value="Globe">Globe</option>
                      <option value="Database">Database</option>
                      <option value="Cpu">Cpu</option>
                      <option value="Layers">Layers</option>
                      <option value="ShoppingCart">ShoppingCart</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Bot">Bot</option>
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
                    <label className="form-label">The Problem (What bottleneck exists?)</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">The Solution (What does OmNetaTech build?)</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Business Benefit (Commercial ROI)</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.benefit}
                      onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-blue" disabled={isSaving}>
                  <span>{isSaving ? 'Saving...' : editingSolution ? 'Update Solution' : 'Create Solution'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <style>{`
        .cms-page-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .cms-page-header {
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
        .btn-add-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1769E0;
          color: #FFFFFF;
          border: none;
          padding: 9px 16px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-add-primary:hover {
          background: #1255B8;
        }

        .table-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .cms-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .cms-table th {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          padding: 12px 16px;
          border-bottom: 1px solid #E2E8F0;
          background: #F8FAFC;
        }
        .cms-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #F1F5F9;
          font-size: 0.86rem;
          vertical-align: middle;
        }

        .order-pill {
          display: inline-block;
          background: #F1F5F9;
          color: #475569;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .sol-title-col {
          display: flex;
          flex-direction: column;
        }
        .tagline-text {
          font-size: 0.76rem;
          color: #64748B;
        }
        .clamp-text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.82rem;
          line-height: 1.4;
          max-width: 280px;
        }
        .text-emerald {
          color: #059669;
        }

        .status-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .pill-published { background: #D1FAE5; color: #059669; }
        .pill-draft { background: #F1F5F9; color: #64748B; }

        .actions-cell {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }
        .btn-edit:hover {
          background: #F1F5F9;
        }
        .btn-delete {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          padding: 4px 6px;
          color: #94A3B8;
          cursor: pointer;
        }
        .btn-delete:hover {
          background: #FEE2E2;
          color: #DC2626;
          border-color: #F87171;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(11, 31, 58, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .modal-card {
          background: #FFFFFF;
          border-radius: 12px;
          max-width: 640px;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .modal-card.mini {
          max-width: 420px;
          padding: 24px;
        }
        .delete-modal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .delete-modal-desc {
          font-size: 0.88rem;
          color: #64748B;
          margin-bottom: 20px;
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #94A3B8;
          cursor: pointer;
        }
        .modal-body {
          padding: 24px;
          overflow-y: auto;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group.full-span {
          grid-column: 1 / -1;
        }
        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1E293B;
        }
        .cms-input, .form-select, .cms-textarea {
          padding: 8px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 0.88rem;
          color: #0F172A;
          outline: none;
        }
        .cms-input:focus, .form-select:focus, .cms-textarea:focus {
          border-color: #1769E0;
          box-shadow: 0 0 0 3px rgba(23, 105, 224, 0.12);
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #E2E8F0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: #F8FAFC;
        }
        .btn-danger {
          background: #DC2626;
          color: #FFFFFF;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
        }
        .text-danger { color: #DC2626; }
      `}</style>
    </div>
  );
}
