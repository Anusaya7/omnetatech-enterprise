import { db } from './db.js';

// Helper to parse JSON body from incoming HTTP request
function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Extract Bearer token
function getBearerToken(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }
  return null;
}

// Middleware handler for Vite
export async function apiMiddleware(req, res, next) {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // Only handle /api/* requests
  if (!pathname.startsWith('/api')) {
    return next();
  }

  const method = req.method.toUpperCase();

  // CORS headers for development flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    // ----------------------------------------------------
    // PUBLIC ROUTES
    // ----------------------------------------------------

    // Bundle with all public data
    if (pathname === '/api/public/bundle' && method === 'GET') {
      return sendJson(res, 200, db.getPublicBundle());
    }

    // Public website content
    if (pathname === '/api/public/content' && method === 'GET') {
      return sendJson(res, 200, db.getWebsiteContent());
    }

    // Public services
    if (pathname === '/api/public/services' && method === 'GET') {
      return sendJson(res, 200, db.getServices(true));
    }

    // Public solutions
    if (pathname === '/api/public/solutions' && method === 'GET') {
      return sendJson(res, 200, db.getSolutions(true));
    }

    // Public industries
    if (pathname === '/api/public/industries' && method === 'GET') {
      return sendJson(res, 200, db.getIndustries(true));
    }

    // Public portfolio
    if (pathname === '/api/public/portfolio' && method === 'GET') {
      return sendJson(res, 200, db.getPortfolio(true));
    }

    // Public insights
    if (pathname === '/api/public/insights' && method === 'GET') {
      return sendJson(res, 200, db.getInsights(true));
    }

    // Public careers
    if (pathname === '/api/public/careers' && method === 'GET') {
      return sendJson(res, 200, db.getCareers(true));
    }

    // Public Contact Enquiry submission
    if (pathname === '/api/contact' && method === 'POST') {
      const body = await parseBody(req);
      const { fullName, email, phone, service, message, companyName } = body;

      if (!fullName || !email || !phone || !message) {
        return sendJson(res, 400, {
          error: 'Please fill in all required fields: Full Name, Email, Phone Number, and Project Details.'
        });
      }

      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendJson(res, 400, { error: 'Please provide a valid email address.' });
      }

      const result = db.createEnquiry({
        fullName,
        companyName,
        email,
        phone,
        service: service || 'Software Development',
        message
      });

      return sendJson(res, 201, {
        success: true,
        message: 'Thank you for contacting OmNetaTech. Our team will review your inquiry and respond within 24 hours.',
        enquiryId: result.enquiry.id,
        referenceId: result.enquiry.id
      });
    }

    // Public Career Application submission
    if (pathname === '/api/careers/apply' && method === 'POST') {
      const body = await parseBody(req);
      const { fullName, email, phone, role, experience, portfolioUrl, notes } = body;

      if (!fullName || !email || !phone) {
        return sendJson(res, 400, { error: 'Please provide your Full Name, Email, and Phone number.' });
      }

      const result = db.createEnquiry({
        fullName,
        companyName: `Applicant: ${role || 'General Application'}`,
        email,
        phone,
        service: `Career: ${role || 'General Application'}`,
        message: `Experience: ${experience || 'Not specified'}\nPortfolio/Resume Link: ${portfolioUrl || 'None provided'}\nAdditional Notes: ${notes || 'None'}`
      });

      return sendJson(res, 201, {
        success: true,
        message: 'Application submitted successfully. Our hiring team will review your profile.',
        enquiryId: result.enquiry.id
      });
    }

    // Admin Login
    if (pathname === '/api/admin/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(res, 400, { error: 'Please provide both email and password.' });
      }

      const admin = db.verifyAdmin(email, password);
      if (!admin) {
        return sendJson(res, 401, { error: 'Invalid email address or password. Please verify credentials.' });
      }

      const session = db.createSession(admin.id);
      return sendJson(res, 200, {
        success: true,
        token: session.token,
        expiresAt: session.expiresAt,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        }
      });
    }

    // ----------------------------------------------------
    // PROTECTED ADMIN ROUTES (Require valid session token)
    // ----------------------------------------------------
    const token = getBearerToken(req);
    const adminUser = db.validateSession(token);

    if (!adminUser) {
      return sendJson(res, 401, { error: 'Unauthorized: Session expired or invalid token.' });
    }

    // Admin Auth: Verify current session / Me
    if (pathname === '/api/admin/auth/me' && method === 'GET') {
      return sendJson(res, 200, {
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name
        }
      });
    }

    // Admin Auth: Logout
    if (pathname === '/api/admin/auth/logout' && method === 'POST') {
      db.destroySession(token);
      return sendJson(res, 200, { success: true, message: 'Logged out successfully.' });
    }

    // Admin Auth: Change Password
    if (pathname === '/api/admin/auth/change-password' && method === 'POST') {
      const body = await parseBody(req);
      const { currentPassword, newPassword } = body;
      const updateResult = db.updateAdminPassword(currentPassword, newPassword);

      if (!updateResult.success) {
        return sendJson(res, 400, { error: updateResult.error });
      }

      // Re-create session for the admin with new password
      const newSession = db.createSession(adminUser.id);
      return sendJson(res, 200, {
        success: true,
        message: 'Password updated successfully. Please use your new password next time.',
        token: newSession.token
      });
    }

    // Admin Dashboard Stats
    if (pathname === '/api/admin/dashboard' && method === 'GET') {
      const stats = db.getDashboardStats();
      const recentEnquiries = db.getEnquiries('All').slice(0, 5);
      const recentNotifications = db.getNotifications().slice(0, 6);
      return sendJson(res, 200, {
        stats,
        recentEnquiries,
        recentNotifications
      });
    }

    // Admin Global Search
    if (pathname === '/api/admin/search' && method === 'GET') {
      const q = urlObj.searchParams.get('q') || '';
      return sendJson(res, 200, db.globalSearch(q));
    }

    // Admin Enquiries
    if (pathname === '/api/admin/enquiries' && method === 'GET') {
      const filter = urlObj.searchParams.get('filter') || 'All';
      return sendJson(res, 200, db.getEnquiries(filter));
    }

    // Single Enquiry / Enquiries ID pattern
    const enquiryMatch = pathname.match(/^\/api\/admin\/enquiries\/([^/]+)$/);
    if (enquiryMatch) {
      const enquiryId = enquiryMatch[1];

      if (method === 'GET') {
        const enq = db.getEnquiryById(enquiryId);
        if (!enq) return sendJson(res, 404, { error: 'Enquiry not found' });
        return sendJson(res, 200, enq);
      }

      if (method === 'PATCH' || method === 'PUT') {
        const body = await parseBody(req);
        const updated = db.updateEnquiry(enquiryId, body);
        if (!updated) return sendJson(res, 404, { error: 'Enquiry not found' });
        return sendJson(res, 200, updated);
      }

      if (method === 'DELETE') {
        const deleted = db.deleteEnquiry(enquiryId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Notifications
    if (pathname === '/api/admin/notifications' && method === 'GET') {
      return sendJson(res, 200, db.getNotifications());
    }

    if (pathname === '/api/admin/notifications/mark-all-read' && method === 'POST') {
      db.markAllNotificationsRead();
      return sendJson(res, 200, { success: true });
    }

    const notifMatch = pathname.match(/^\/api\/admin\/notifications\/([^/]+)\/read$/);
    if (notifMatch && method === 'POST') {
      const notifId = notifMatch[1];
      const updated = db.markNotificationRead(notifId);
      return sendJson(res, 200, { success: !!updated, notification: updated });
    }

    // Admin Services CRUD
    if (pathname === '/api/admin/services') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getServices(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Service title is required' });
        const created = db.createService(body);
        return sendJson(res, 201, created);
      }
    }

    const serviceMatch = pathname.match(/^\/api\/admin\/services\/([^/]+)$/);
    if (serviceMatch) {
      const svcId = serviceMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updateService(svcId, body);
        if (!updated) return sendJson(res, 404, { error: 'Service not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deleteService(svcId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Solutions CRUD
    if (pathname === '/api/admin/solutions') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getSolutions(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Solution title is required' });
        const created = db.createSolution(body);
        return sendJson(res, 201, created);
      }
    }

    const solMatch = pathname.match(/^\/api\/admin\/solutions\/([^/]+)$/);
    if (solMatch) {
      const solId = solMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updateSolution(solId, body);
        if (!updated) return sendJson(res, 404, { error: 'Solution not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deleteSolution(solId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Industries CRUD
    if (pathname === '/api/admin/industries') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getIndustries(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Industry title is required' });
        const created = db.createIndustry(body);
        return sendJson(res, 201, created);
      }
    }

    const indMatch = pathname.match(/^\/api\/admin\/industries\/([^/]+)$/);
    if (indMatch) {
      const indId = indMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updateIndustry(indId, body);
        if (!updated) return sendJson(res, 404, { error: 'Industry not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deleteIndustry(indId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Portfolio CRUD
    if (pathname === '/api/admin/portfolio') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getPortfolio(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Project title is required' });
        const created = db.createPortfolio(body);
        return sendJson(res, 201, created);
      }
    }

    const portMatch = pathname.match(/^\/api\/admin\/portfolio\/([^/]+)$/);
    if (portMatch) {
      const portId = portMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updatePortfolio(portId, body);
        if (!updated) return sendJson(res, 404, { error: 'Project not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deletePortfolio(portId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Insights CRUD
    if (pathname === '/api/admin/insights') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getInsights(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Article title is required' });
        const created = db.createInsight(body);
        return sendJson(res, 201, created);
      }
    }

    const insMatch = pathname.match(/^\/api\/admin\/insights\/([^/]+)$/);
    if (insMatch) {
      const insId = insMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updateInsight(insId, body);
        if (!updated) return sendJson(res, 404, { error: 'Article not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deleteInsight(insId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Careers CRUD
    if (pathname === '/api/admin/careers') {
      if (method === 'GET') {
        return sendJson(res, 200, db.getCareers(false));
      }
      if (method === 'POST') {
        const body = await parseBody(req);
        if (!body.title) return sendJson(res, 400, { error: 'Job title is required' });
        const created = db.createCareer(body);
        return sendJson(res, 201, created);
      }
    }

    const careerMatch = pathname.match(/^\/api\/admin\/careers\/([^/]+)$/);
    if (careerMatch) {
      const careerId = careerMatch[1];
      if (method === 'PUT' || method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.updateCareer(careerId, body);
        if (!updated) return sendJson(res, 404, { error: 'Job opening not found' });
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const deleted = db.deleteCareer(careerId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // Admin Website Content
    if (pathname === '/api/admin/website' && method === 'GET') {
      return sendJson(res, 200, db.getWebsiteContent());
    }

    const websiteSectionMatch = pathname.match(/^\/api\/admin\/website\/([^/]+)$/);
    if (websiteSectionMatch && (method === 'PUT' || method === 'PATCH')) {
      const section = websiteSectionMatch[1];
      const body = await parseBody(req);
      const updated = db.updateWebsiteContent(section, body, adminUser.name);
      return sendJson(res, 200, updated);
    }

    // 404 Not Found for undefined /api routes
    return sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found` });

  } catch (error) {
    console.error('API Middleware Error:', error);
    return sendJson(res, 500, { error: 'Internal server error occurred.' });
  }
}
