// OmNetaTech Frontend API Service Layer

const TOKEN_KEY = 'omnetatech_admin_token';
const USER_KEY = 'omnetatech_admin_user';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(USER_KEY),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

async function request(endpoint, options = {}) {
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = authStorage.getToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error || `HTTP error! Status: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // ----------------------------------------------------
  // PUBLIC ENDPOINTS
  // ----------------------------------------------------
  getPublicBundle: () => request('/api/public/bundle'),
  getPublicContent: () => request('/api/public/content'),
  getPublicServices: () => request('/api/public/services'),
  getPublicSolutions: () => request('/api/public/solutions'),
  getPublicIndustries: () => request('/api/public/industries'),
  getPublicPortfolio: () => request('/api/public/portfolio'),
  getPublicInsights: () => request('/api/public/insights'),
  getPublicCareers: () => request('/api/public/careers'),

  // Submit Contact Form
  submitContact: (data) => request('/api/contact', {
    method: 'POST',
    body: data
  }),

  // Submit Career Application
  submitCareerApplication: (data) => request('/api/careers/apply', {
    method: 'POST',
    body: data
  }),

  // ----------------------------------------------------
  // ADMIN AUTHENTICATION
  // ----------------------------------------------------
  login: async (email, password) => {
    const res = await request('/api/admin/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    if (res.token) {
      authStorage.setToken(res.token);
      if (res.user) authStorage.setUser(res.user);
    }
    return res;
  },

  logout: async () => {
    try {
      await request('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // ignore errors on logout
    } finally {
      authStorage.clear();
    }
  },

  getCurrentUser: () => request('/api/admin/auth/me'),

  changePassword: (currentPassword, newPassword) => request('/api/admin/auth/change-password', {
    method: 'POST',
    body: { currentPassword, newPassword }
  }),

  // ----------------------------------------------------
  // ADMIN DASHBOARD & SEARCH
  // ----------------------------------------------------
  getDashboard: () => request('/api/admin/dashboard'),
  globalSearch: (q) => request(`/api/admin/search?q=${encodeURIComponent(q)}`),

  // ----------------------------------------------------
  // ADMIN ENQUIRIES
  // ----------------------------------------------------
  getEnquiries: (filter = 'All') => request(`/api/admin/enquiries?filter=${encodeURIComponent(filter)}`),
  getEnquiry: (id) => request(`/api/admin/enquiries/${id}`),
  updateEnquiry: (id, updates) => request(`/api/admin/enquiries/${id}`, {
    method: 'PATCH',
    body: updates
  }),
  deleteEnquiry: (id) => request(`/api/admin/enquiries/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN NOTIFICATIONS
  // ----------------------------------------------------
  getNotifications: () => request('/api/admin/notifications'),
  markNotificationRead: (id) => request(`/api/admin/notifications/${id}/read`, {
    method: 'POST'
  }),
  markAllNotificationsRead: () => request('/api/admin/notifications/mark-all-read', {
    method: 'POST'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: SERVICES
  // ----------------------------------------------------
  getServices: () => request('/api/admin/services'),
  createService: (data) => request('/api/admin/services', {
    method: 'POST',
    body: data
  }),
  updateService: (id, data) => request(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteService: (id) => request(`/api/admin/services/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: SOLUTIONS
  // ----------------------------------------------------
  getSolutions: () => request('/api/admin/solutions'),
  createSolution: (data) => request('/api/admin/solutions', {
    method: 'POST',
    body: data
  }),
  updateSolution: (id, data) => request(`/api/admin/solutions/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteSolution: (id) => request(`/api/admin/solutions/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: INDUSTRIES
  // ----------------------------------------------------
  getIndustries: () => request('/api/admin/industries'),
  createIndustry: (data) => request('/api/admin/industries', {
    method: 'POST',
    body: data
  }),
  updateIndustry: (id, data) => request(`/api/admin/industries/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteIndustry: (id) => request(`/api/admin/industries/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: PORTFOLIO
  // ----------------------------------------------------
  getPortfolio: () => request('/api/admin/portfolio'),
  createPortfolio: (data) => request('/api/admin/portfolio', {
    method: 'POST',
    body: data
  }),
  updatePortfolio: (id, data) => request(`/api/admin/portfolio/${id}`, {
    method: 'PUT',
    body: data
  }),
  deletePortfolio: (id) => request(`/api/admin/portfolio/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: INSIGHTS
  // ----------------------------------------------------
  getInsights: () => request('/api/admin/insights'),
  createInsight: (data) => request('/api/admin/insights', {
    method: 'POST',
    body: data
  }),
  updateInsight: (id, data) => request(`/api/admin/insights/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteInsight: (id) => request(`/api/admin/insights/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS CRUD: CAREERS
  // ----------------------------------------------------
  getCareers: () => request('/api/admin/careers'),
  createCareer: (data) => request('/api/admin/careers', {
    method: 'POST',
    body: data
  }),
  updateCareer: (id, data) => request(`/api/admin/careers/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteCareer: (id) => request(`/api/admin/careers/${id}`, {
    method: 'DELETE'
  }),

  // ----------------------------------------------------
  // ADMIN CMS: WEBSITE CONTENT
  // ----------------------------------------------------
  getWebsiteContent: () => request('/api/admin/website'),
  updateWebsiteContent: (section, data) => request(`/api/admin/website/${section}`, {
    method: 'PUT',
    body: data
  })
};
