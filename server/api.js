import { db } from './db.js';

// Rate limiter map for admin login attempts
const loginAttempts = new Map(); // ip -> { count: number, lockedUntil: number }

// Rate limiter map for public contact and careers submissions
const submissionAttempts = new Map(); // ip -> { count: number, resetAt: number }

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1';
}

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (entry) {
    if (entry.lockedUntil && entry.lockedUntil > now) {
      const waitMinutes = Math.ceil((entry.lockedUntil - now) / 60000);
      return { allowed: false, waitMinutes };
    }
    if (entry.lockedUntil && entry.lockedUntil <= now) {
      loginAttempts.delete(ip);
    }
  }
  return { allowed: true };
}

function recordFailedLogin(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { count: 0, firstAttempt: now, lockedUntil: 0 };
  entry.count += 1;
  // If 5 failed attempts within 15 minutes, lock for 15 minutes
  if (entry.count >= 5) {
    entry.lockedUntil = now + 15 * 60 * 1000;
  }
  loginAttempts.set(ip, entry);
}

function clearFailedLogins(ip) {
  loginAttempts.delete(ip);
}

function checkSubmissionRateLimit(ip) {
  const now = Date.now();
  const entry = submissionAttempts.get(ip);
  if (entry) {
    if (entry.resetAt > now) {
      if (entry.count >= 15) { // 15 submissions per 10 minutes limit
        const waitMinutes = Math.ceil((entry.resetAt - now) / 60000);
        return { allowed: false, waitMinutes };
      }
    } else {
      submissionAttempts.delete(ip);
    }
  }
  return { allowed: true };
}

function recordSubmission(ip) {
  const now = Date.now();
  const entry = submissionAttempts.get(ip) || { count: 0, resetAt: now + 10 * 60 * 1000 };
  entry.count += 1;
  submissionAttempts.set(ip, entry);
}

// Input sanitization & validation
function sanitizeText(str, maxLen = 1000) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string' || email.length > 120) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.trim();
  return clean.length >= 6 && clean.length <= 30 && /^[0-9+()\s-]+$/.test(clean);
}

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB payload limit

// Helper to parse JSON body with payload size and malformed JSON protection
function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
        return resolve(req.body);
      }
      if (Buffer.isBuffer(req.body)) {
        if (req.body.length > MAX_BODY_SIZE) {
          const err = new Error('Payload too large (maximum 1MB allowed)');
          err.statusCode = 413;
          return reject(err);
        }
        try {
          const str = req.body.toString('utf-8');
          return resolve(str && str.trim() ? JSON.parse(str) : {});
        } catch {
          const err = new Error('Malformed JSON payload');
          err.statusCode = 400;
          return reject(err);
        }
      }
      if (typeof req.body === 'string') {
        if (Buffer.byteLength(req.body) > MAX_BODY_SIZE) {
          const err = new Error('Payload too large (maximum 1MB allowed)');
          err.statusCode = 413;
          return reject(err);
        }
        try {
          return resolve(req.body && req.body.trim() ? JSON.parse(req.body) : {});
        } catch {
          const err = new Error('Malformed JSON payload');
          err.statusCode = 400;
          return reject(err);
        }
      }
    }
    let body = '';
    let bytesReceived = 0;
    req.on('data', chunk => {
      bytesReceived += chunk.length;
      if (bytesReceived > MAX_BODY_SIZE) {
        req.destroy();
        const err = new Error('Payload too large (maximum 1MB allowed)');
        err.statusCode = 413;
        return reject(err);
      }
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body || !body.trim()) {
        return resolve({});
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        const err = new Error('Malformed JSON payload');
        err.statusCode = 400;
        reject(err);
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

// Helper to send JSON response with security headers
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
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

// Middleware handler for Vite, Vercel, and standalone Node.js server
export async function apiMiddleware(req, res, next) {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // Only handle /api/* requests
  if (!pathname.startsWith('/api')) {
    return next();
  }

  const method = req.method.toUpperCase();

  // CORS headers with origin verification
  const origin = req.headers['origin'];
  const host = req.headers['host'] || '';
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim().toLowerCase()) : [];
  
  const defaultAllowedOrigins = [
    'https://omnetatech.com',
    'https://www.omnetatech.com',
    'https://omnetatech-enterprise.vercel.app'
  ];

  if (origin) {
    const originLower = origin.toLowerCase();
    if (
      defaultAllowedOrigins.includes(originLower) ||
      allowedOriginsEnv.includes(originLower) ||
      originLower.startsWith('http://localhost:') ||
      originLower.startsWith('http://127.0.0.1:') ||
      (host && originLower === `http://${host.toLowerCase()}`) ||
      (host && originLower === `https://${host.toLowerCase()}`)
    ) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    // ----------------------------------------------------
    // SYSTEM & HEALTH ROUTES
    // ----------------------------------------------------
    if (pathname === '/api/health' && method === 'GET') {
      return sendJson(res, 200, {
        status: 'ok',
        environment: process.env.NODE_ENV || 'production',
        database: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      });
    }

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
      const clientIp = getClientIp(req);
      const rateLimitCheck = checkSubmissionRateLimit(clientIp);
      if (!rateLimitCheck.allowed) {
        return sendJson(res, 429, {
          error: `Too many submissions from your connection. Please wait ${rateLimitCheck.waitMinutes} minute(s) before trying again.`
        });
      }

      const body = await parseBody(req);
      const { fullName, email, phone, service, message, companyName } = body;

      if (!fullName || !email || !phone || !message) {
        return sendJson(res, 400, {
          error: 'Please fill in all required fields: Full Name, Email, Phone Number, and Project Details.'
        });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, 400, { error: 'Please provide a valid email address.' });
      }

      if (!isValidPhone(phone)) {
        return sendJson(res, 400, { error: 'Please provide a valid contact phone number.' });
      }

      const cleanName = sanitizeText(fullName, 100);
      const cleanCompany = sanitizeText(companyName || '', 120);
      const cleanService = sanitizeText(service || 'Software Development', 80);
      const cleanMessage = sanitizeText(message, 5000);

      if (cleanName.length < 2) {
        return sendJson(res, 400, { error: 'Please provide a valid name.' });
      }

      if (cleanMessage.length < 5) {
        return sendJson(res, 400, { error: 'Please provide more details regarding your project requirement.' });
      }

      const result = db.createEnquiry({
        fullName: cleanName,
        companyName: cleanCompany,
        email: email.trim().toLowerCase().slice(0, 120),
        phone: phone.trim().slice(0, 30),
        service: cleanService,
        message: cleanMessage
      });

      recordSubmission(clientIp);

      return sendJson(res, 201, {
        success: true,
        message: 'Thank you for contacting OmNetaTech. Our team will review your inquiry and respond within 24 hours.',
        enquiryId: result.enquiry.id,
        referenceId: result.enquiry.id
      });
    }

    // Public Career Application submission
    if (pathname === '/api/careers/apply' && method === 'POST') {
      const clientIp = getClientIp(req);
      const rateLimitCheck = checkSubmissionRateLimit(clientIp);
      if (!rateLimitCheck.allowed) {
        return sendJson(res, 429, {
          error: `Too many submissions from your connection. Please wait ${rateLimitCheck.waitMinutes} minute(s) before trying again.`
        });
      }

      const body = await parseBody(req);
      const { fullName, email, phone, role, experience, portfolioUrl, notes } = body;

      if (!fullName || !email || !phone) {
        return sendJson(res, 400, { error: 'Please provide your Full Name, Email, and Phone number.' });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, 400, { error: 'Please provide a valid email address.' });
      }

      if (!isValidPhone(phone)) {
        return sendJson(res, 400, { error: 'Please provide a valid phone number.' });
      }

      const cleanName = sanitizeText(fullName, 100);
      const cleanRole = sanitizeText(role || 'General Application', 100);
      const cleanExp = sanitizeText(experience || 'Not specified', 100);
      const cleanUrl = sanitizeText(portfolioUrl || 'None provided', 300);
      const cleanNotes = sanitizeText(notes || 'None', 2000);

      const result = db.createEnquiry({
        fullName: cleanName,
        companyName: `Applicant: ${cleanRole}`,
        email: email.trim().toLowerCase().slice(0, 120),
        phone: phone.trim().slice(0, 30),
        service: `Career: ${cleanRole}`,
        message: `Experience: ${cleanExp}\nPortfolio/Resume Link: ${cleanUrl}\nAdditional Notes: ${cleanNotes}`
      });

      recordSubmission(clientIp);

      return sendJson(res, 201, {
        success: true,
        message: 'Application submitted successfully. Our hiring team will review your profile.',
        enquiryId: result.enquiry.id
      });
    }

    // Admin Login with Rate Limiting & Generic Failure Message
    if (pathname === '/api/admin/auth/login' && method === 'POST') {
      const clientIp = getClientIp(req);
      const rateLimitCheck = checkLoginRateLimit(clientIp);
      if (!rateLimitCheck.allowed) {
        return sendJson(res, 429, {
          error: `Too many failed login attempts. Please try again in ${rateLimitCheck.waitMinutes} minute(s).`
        });
      }

      const body = await parseBody(req);
      const { email, password } = body;

      if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return sendJson(res, 400, { error: 'Please provide both email and password.' });
      }

      const admin = db.verifyAdmin(email, password);
      if (!admin) {
        recordFailedLogin(clientIp);
        return sendJson(res, 401, { error: 'Invalid email address or password. Please verify credentials.' });
      }

      clearFailedLogins(clientIp);
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

    // If route is not an admin route, it is an unknown API endpoint -> 404
    if (!pathname.startsWith('/api/admin/')) {
      return sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found` });
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
    if (error.statusCode === 413) {
      return sendJson(res, 413, { error: error.message });
    }
    if (error.statusCode === 400) {
      return sendJson(res, 400, { error: error.message });
    }
    console.error('API Middleware Error:', error.message);
    return sendJson(res, 500, { error: 'Internal server error occurred.' });
  }
}
