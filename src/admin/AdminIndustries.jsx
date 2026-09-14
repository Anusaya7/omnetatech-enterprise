import { useState, useEffect } from 'react';
import { 
  Building2, Plus, Edit, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminIndustries({ showToast }) {
  const { refreshData } = useCms();
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    desc: '',
    icon: 'Building2',
    status: 'Published',
    displayOrder: 1
  });

  const fetchIndustries = async () => {
    setIsLoading(true);
    try {
      const list = await api.getIndustries();
      setIndustries(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load industries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getIndustries()
      .then((list) => {
        if (active) {
          setIndustries(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load industries:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingIndustry(null);
    setFormData({
      title: '',
      slug: '',
      desc: '',
      icon: 'Building2',
      status: 'Published',
      displayOrder: industries.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ind) => {
    setEditingIndustry(ind);
    setFormData({
      title: ind.title || '',
      slug: ind.slug || '',
      desc: ind.desc || '',
      icon: ind.icon || 'Building2',
      status: ind.status || 'Published',
      displayOrder: ind.displayOrder || 1
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
      if (editingIndustry) {
        await api.updateIndustry(editingIndustry.id, payload);
        showToast?.('Industry updated successfully');
      } else {
        await api.createIndustry(payload);
        showToast?.('New industry added successfully');
      }
      setIsModalOpen(false);
      await fetchIndustries();
      await refreshData();
    } catch (err) {
      console.error('Error saving industry:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteIndustry(id);
      setDeleteConfirmId(null);
      showToast?.('Industry deleted');
      await fetchIndustries();
      await refreshData();
    } catch (err) {
      console.error('Error deleting industry:', err);
    }
  };

  return (
    <div className="cms-page-root">
      <div className="cms-page-header">
        <div>
          <h1 className="page-title">Industries CMS</h1>
          <p className="page-sub">
            Manage industry sectors, use cases, and tailored solutions shown on the public site.
          </p>
        </div>
        <button className="btn-add-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Industry</span>
        </button>
      </div>

      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading industries...</span>
          </div>
        ) : industries.length === 0 ? (
          <div className="empty-state">
            <Building2 size={36} className="empty-icon" />
            <h3>No Industries Configured</h3>
            <p>Click "Add New Industry" to configure an industry sector.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Industry Title</th>
                  <th>Icon</th>
                  <th>Overview & Scope</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {industries.map((ind) => (
                  <tr key={ind.id}>
                    <td>
                      <span className="order-pill">{ind.displayOrder}</span>
                    </td>
                    <td>
                      <div className="title-cell">
                        <strong>{ind.title}</strong>
                        <span className="slug-text">/{ind.slug}</span>
                      </div>
                    </td>
                    <td>
                      <code className="icon-code">{ind.icon}</code>
                    </td>
                    <td>
                      <span className="desc-clamp">{ind.desc}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${ind.status === 'Published' ? 'published' : 'draft'}`}>
                        {ind.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEdit(ind)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteConfirmId(ind.id)}>
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
              <h3>Delete Industry?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to remove this industry sector? It will be unpublished immediately.
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
                {editingIndustry ? `Edit Industry: ${editingIndustry.title}` : 'Add New Industry'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Industry Title *</label>
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
                    <label className="form-label">Icon Name</label>
                    <select 
                      className="form-select"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    >
                      <option value="HeartPulse">HeartPulse (Healthcare)</option>
                      <option value="GraduationCap">GraduationCap (Education)</option>
                      <option value="Landmark">Landmark (Finance)</option>
                      <option value="ShoppingBag">ShoppingBag (Retail & E-commerce)</option>
                      <option value="Factory">Factory (Manufacturing)</option>
                      <option value="Building2">Building2 (Real Estate)</option>
                      <option value="Truck">Truck (Logistics)</option>
                      <option value="Briefcase">Briefcase (Professional Services)</option>
                      <option value="Rocket">Rocket (Startups & SMEs)</option>
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

                  <div className="form-group full-span">
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
                    <label className="form-label">Description & Offerings</label>
                    <textarea 
                      rows="3"
                      className="cms-textarea"
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-blue" disabled={isSaving}>
                  <span>{isSaving ? 'Saving...' : editingIndustry ? 'Update Industry' : 'Create Industry'}</span>
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
        .title-cell {
          display: flex;
          flex-direction: column;
        }
        .slug-text {
          font-size: 0.76rem;
          color: #94A3B8;
        }
        .icon-code {
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.76rem;
          color: #334155;
        }
        .desc-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.82rem;
          line-height: 1.4;
          max-width: 380px;
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
        .btn-edit:hover { background: #F1F5F9; }
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
          max-width: 600px;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .modal-card.mini { max-width: 420px; padding: 24px; }
        .delete-modal-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .delete-modal-desc { font-size: 0.88rem; color: #64748B; margin-bottom: 20px; }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-heading { font-size: 1.25rem; font-weight: 700; color: #0F172A; }
        .modal-close-btn { background: none; border: none; font-size: 1.5rem; color: #94A3B8; cursor: pointer; }
        .modal-body { padding: 24px; overflow-y: auto; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full-span { grid-column: 1 / -1; }
        .form-label { font-size: 0.8rem; font-weight: 600; color: #1E293B; }
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
