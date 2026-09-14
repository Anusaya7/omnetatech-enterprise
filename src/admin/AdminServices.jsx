import { useState, useEffect } from 'react';
import { 
  Briefcase, Plus, Edit, Trash2, 
  RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminServices({ showToast }) {
  const { refreshData } = useCms();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Core Engineering',
    icon: 'Code',
    status: 'Published',
    displayOrder: 1,
    shortDescription: '',
    description: '',
    featuresText: ''
  });

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const list = await api.getServices();
      setServices(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getServices()
      .then((list) => {
        if (active) {
          setServices(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load services:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Core Engineering',
      icon: 'Code',
      status: 'Published',
      displayOrder: services.length + 1,
      shortDescription: '',
      description: '',
      featuresText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (svc) => {
    setEditingService(svc);
    setFormData({
      title: svc.title || '',
      slug: svc.slug || '',
      category: svc.category || 'Core Engineering',
      icon: svc.icon || 'Code',
      status: svc.status || 'Published',
      displayOrder: svc.displayOrder || 1,
      shortDescription: svc.shortDescription || '',
      description: svc.description || '',
      featuresText: Array.isArray(svc.features) ? svc.features.join('\n') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      icon: formData.icon,
      status: formData.status,
      displayOrder: parseInt(formData.displayOrder || 1, 10),
      shortDescription: formData.shortDescription,
      description: formData.description,
      features: formData.featuresText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingService) {
        await api.updateService(editingService.id, payload);
        showToast?.('Service updated successfully');
      } else {
        await api.createService(payload);
        showToast?.('New service added successfully');
      }
      setIsModalOpen(false);
      await fetchServices();
      await refreshData();
    } catch (err) {
      console.error('Failed to save service:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteService(id);
      setDeleteConfirmId(null);
      showToast?.('Service deleted successfully');
      await fetchServices();
      await refreshData();
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  return (
    <div className="services-cms-root">
      
      {/* Header */}
      <div className="services-header-row">
        <div>
          <h1 className="page-title">Services CMS</h1>
          <p className="page-sub">
            Add, update, or remove technology services rendered on the public website and navigation.
          </p>
        </div>

        <button className="btn-add-new" onClick={handleOpenAddModal}>
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table Card */}
      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={36} className="empty-icon" />
            <h3>No Services Available</h3>
            <p>Click "Add New Service" above to publish a service.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Order</th>
                  <th>Service Title</th>
                  <th>Category</th>
                  <th>Icon</th>
                  <th>Features</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id}>
                    <td>
                      <span className="order-pill">{svc.displayOrder}</span>
                    </td>
                    <td>
                      <div className="title-cell">
                        <strong>{svc.title}</strong>
                        <span className="slug-text">/{svc.slug}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cat-badge">{svc.category}</span>
                    </td>
                    <td>
                      <code className="icon-code">{svc.icon}</code>
                    </td>
                    <td>
                      <span className="features-count">
                        {Array.isArray(svc.features) ? svc.features.length : 0} items
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${svc.status === 'Published' ? 'published' : 'draft'}`}>
                        {svc.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button 
                          className="btn-edit" 
                          onClick={() => handleOpenEditModal(svc)}
                          title="Edit Service"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => setDeleteConfirmId(svc.id)}
                          title="Delete Service"
                        >
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-card mini shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <AlertCircle size={24} className="text-danger" />
              <h3>Delete Service?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to delete this service? It will no longer appear on the public website.
            </p>
            <div className="modal-footer">
              <button className="btn-secondary-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirmId)}>
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-heading">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Service Title *</label>
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
                      placeholder="e.g. software-development"
                      className="cms-input"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon Name</label>
                    <select 
                      className="form-select"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    >
                      <option value="Code">Code (Software)</option>
                      <option value="Globe">Globe (Web)</option>
                      <option value="Smartphone">Smartphone (Mobile)</option>
                      <option value="Palette">Palette (Design)</option>
                      <option value="Cloud">Cloud (Cloud & DevOps)</option>
                      <option value="Bot">Bot (Automation & AI)</option>
                      <option value="Compass">Compass (Consulting)</option>
                      <option value="Database">Database</option>
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
                    <label className="form-label">Short Description (Card Summary)</label>
                    <textarea 
                      rows="2"
                      className="cms-textarea"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Full Details & Overview</label>
                    <textarea 
                      rows="3"
                      className="cms-textarea"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Key Deliverables & Features (One per line)</label>
                    <textarea 
                      rows="4"
                      className="cms-textarea font-mono"
                      placeholder="Custom Web Applications&#10;Business Software Solutions&#10;API Development & Integration"
                      value={formData.featuresText}
                      onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    ></textarea>
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary-blue"
                  disabled={isSaving}
                >
                  <span>{isSaving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <style>{`
        .services-cms-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .services-header-row {
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
        .btn-add-new {
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
        .btn-add-new:hover {
          background: #1255B8;
        }

        .table-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }
        .loading-state, .empty-state {
          padding: 60px 24px;
          text-align: center;
          color: #64748B;
        }
        .empty-icon {
          color: #CBD5E1;
          margin-bottom: 12px;
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
          font-size: 0.88rem;
          vertical-align: middle;
        }

        .order-pill {
          display: inline-block;
          background: #F1F5F9;
          color: #475569;
          font-size: 0.78rem;
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
        .cat-badge {
          background: #EFF6FF;
          color: #1769E0;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .icon-code {
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.76rem;
          color: #334155;
        }
        .features-count {
          font-size: 0.8rem;
          color: #64748B;
        }

        .status-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .pill-published {
          background: #D1FAE5;
          color: #059669;
        }
        .pill-draft {
          background: #F1F5F9;
          color: #64748B;
        }

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
          border-color: #94A3B8;
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
          max-width: 440px;
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

        .modal-form {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }
        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
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
        .font-mono {
          font-family: monospace;
          font-size: 0.82rem;
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
        .text-danger {
          color: #DC2626;
        }
      `}</style>
    </div>
  );
}
