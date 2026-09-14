import { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit, Trash2, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';

export default function AdminCareers({ showToast }) {
  const { refreshData } = useCms();
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'India (Remote / Hybrid)',
    type: 'Full-Time',
    status: 'Active',
    displayOrder: 1,
    description: '',
    requirementsText: '',
    responsibilitiesText: ''
  });

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const list = await api.getCareers();
      setCareers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load careers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.getCareers()
      .then((list) => {
        if (active) {
          setCareers(Array.isArray(list) ? list : []);
        }
      })
      .catch((err) => {
        console.error('Failed to load careers:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingCareer(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'India (Remote / Hybrid)',
      type: 'Full-Time',
      status: 'Active',
      displayOrder: careers.length + 1,
      description: '',
      requirementsText: '',
      responsibilitiesText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingCareer(job);
    setFormData({
      title: job.title || '',
      department: job.department || 'Engineering',
      location: job.location || 'India (Remote / Hybrid)',
      type: job.type || 'Full-Time',
      status: job.status || 'Active',
      displayOrder: job.displayOrder || 1,
      description: job.description || '',
      requirementsText: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      responsibilitiesText: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      displayOrder: parseInt(formData.displayOrder || 1, 10),
      requirements: formData.requirementsText.split('\n').map(r => r.trim()).filter(Boolean),
      responsibilities: formData.responsibilitiesText.split('\n').map(r => r.trim()).filter(Boolean)
    };

    try {
      if (editingCareer) {
        await api.updateCareer(editingCareer.id, payload);
        showToast?.('Career opportunity updated successfully');
      } else {
        await api.createCareer(payload);
        showToast?.('New career opportunity published');
      }
      setIsModalOpen(false);
      await fetchCareers();
      await refreshData();
    } catch (err) {
      console.error('Error saving career:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCareer(id);
      setDeleteConfirmId(null);
      showToast?.('Job listing deleted');
      await fetchCareers();
      await refreshData();
    } catch (err) {
      console.error('Error deleting career:', err);
    }
  };

  return (
    <div className="cms-page-root">
      <div className="cms-page-header">
        <div>
          <h1 className="page-title">Careers & Job Openings CMS</h1>
          <p className="page-sub">
            Manage open roles, technical domains, and qualifications for talent acquisition in India.
          </p>
        </div>
        <button className="btn-add-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Post New Job Opening</span>
        </button>
      </div>

      <div className="table-panel shadow-sm">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Loading careers...</span>
          </div>
        ) : careers.length === 0 ? (
          <div className="empty-state">
            <Users size={36} className="empty-icon" />
            <h3>No Active Job Openings</h3>
            <p>Click "Post New Job Opening" to list an engineering role.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Position Title</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <span className="order-pill">{job.displayOrder}</span>
                    </td>
                    <td>
                      <div className="title-cell">
                        <strong>{job.title}</strong>
                        <span className="summary-clamp">{job.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className="dept-badge">{job.department}</span>
                    </td>
                    <td>
                      <span className="meta-sub">{job.location}</span>
                    </td>
                    <td>
                      <span className="meta-sub">{job.type}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${job.status === 'Active' ? 'published' : 'draft'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEdit(job)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteConfirmId(job.id)}>
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
              <h3>Delete Job Opening?</h3>
            </div>
            <p className="delete-modal-desc">
              Are you sure you want to delete this job listing? It will no longer appear on the careers page.
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
                {editingCareer ? `Edit Opening: ${editingCareer.title}` : 'Post New Job Opening'}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-span">
                    <label className="form-label">Position Title *</label>
                    <input 
                      type="text" 
                      required 
                      className="cms-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select 
                      className="form-select"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Mobile Engineering">Mobile Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Quality Assurance">Quality Assurance</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="cms-input"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Employment Type</label>
                    <select 
                      className="form-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
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
                    <label className="form-label">Role Overview / Summary</label>
                    <textarea 
                      rows="3"
                      className="cms-textarea"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Candidate Requirements (One item per line)</label>
                    <textarea 
                      rows="3"
                      className="cms-textarea font-mono"
                      placeholder="Proficiency with React and Node.js&#10;Experience designing REST APIs&#10;Commitment to clean code"
                      value={formData.requirementsText}
                      onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group full-span">
                    <label className="form-label">Key Responsibilities (One item per line)</label>
                    <textarea 
                      rows="3"
                      className="cms-textarea font-mono"
                      placeholder="Develop client applications&#10;Participate in code reviews"
                      value={formData.responsibilitiesText}
                      onChange={(e) => setFormData({ ...formData, responsibilitiesText: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-blue" disabled={isSaving}>
                  <span>{isSaving ? 'Saving...' : editingCareer ? 'Update Opening' : 'Post Opening'}</span>
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
        .summary-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.78rem; color: #64748B; line-height: 1.35; max-width: 320px; margin-top: 3px; }
        .dept-badge { background: #EFF6FF; color: #1769E0; font-size: 0.76rem; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
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
