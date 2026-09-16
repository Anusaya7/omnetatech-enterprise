# OmNetaTech Enterprise — Hostinger Node.js Web App Deployment Guide

This document outlines the verified deployment configuration for hosting **OmNetaTech Enterprise** as a Node.js Web Application on Hostinger.

---

## A. Repository & Application Configuration

- **Repository**: `https://github.com/Anusaya7/omnetatech-enterprise.git`
- **Branch**: `main`
- **Architecture**: Single unified Node.js production server with React + Vite frontend and native REST API backend
- **Node.js Runtime Version**: Node.js `20.x` LTS (or `22.x`)
- **Frontend Build Output Directory**: `dist`
- **Canonical Production Server Entry Point**: `server.js` (imports `./server/server.js`)
- **Alternative PM2 Process File**: `ecosystem.config.cjs`
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (or `node server.js`)

---

## B. Hostinger hPanel Node.js Setup

1. **Log in** to your Hostinger Account and navigate to **hPanel**.
2. Go to **Websites** → Select or Add your Website → Navigate to **Node.js** (under Advanced or Web App section).
3. Configure the application runtime parameters:
   - **Node.js Version**: Select **20.x** (recommended LTS).
   - **Application Root**: `/public_html` (or your chosen subfolder where the repository is cloned/deployed).
   - **Application Startup File**: `server.js`
   - **Application Mode**: `production`
4. **Git Deployment Setup**:
   - In hPanel under **Git**, connect repository: `https://github.com/Anusaya7/omnetatech-enterprise.git`
   - Branch: `main`
   - Configure Webhook if automatic deployment on `git push` is desired.
5. **Install Dependencies & Build**:
   - Run via SSH / Hostinger Terminal:
     ```bash
     npm install --production=false
     npm run build
     ```
   - *Note*: `--production=false` ensures `devDependencies` (Vite, Rollup, Terser) are installed so `npm run build` can generate the `dist` directory.
6. **Start / Restart Application**:
   - Click **Restart** in the Hostinger Node.js dashboard, or use `npm start`.

---

## C. Environment Variables (Hostinger Configuration)

Configure these environment variables in your Hostinger hPanel Node.js environment settings (or in a `.env` file located in the application root). **Never commit secret values to GitHub.**

| Variable Name | Required | Default / Description |
| :--- | :--- | :--- |
| `NODE_ENV` | Yes | `production` |
| `PORT` | Auto | Assigned automatically by Hostinger (fallback: `3000`) |
| `HOST` | Recommended | `0.0.0.0` |
| `DB_FILE_PATH` | Optional | Absolute persistent path outside git directory (e.g. `/home/username/data/db.json`) |
| `ADMIN_EMAIL` | Optional | Custom admin login email (default: `admin@omnetatech.com`) |
| `ADMIN_PASSWORD` | Optional | Custom strong admin password (overrides default seed hash) |
| `ALLOWED_ORIGINS` | Optional | Comma-separated CORS origins (e.g. `https://omnetatech.com,https://www.omnetatech.com`) |
| `VITE_API_URL` | Optional | Frontend API base URL (leave blank when frontend and API are unified on the same origin) |

> **Persistence Tip**: Hostinger Git deployments may overwrite repository files. Setting `DB_FILE_PATH` to a directory outside your git root (such as `/home/username/data/omnetatech-db.json`) guarantees your enquiries, sessions, and CMS updates remain permanently intact across every git update. On initial startup with a custom `DB_FILE_PATH`, the system will automatically initialize the persistent file from the pre-populated seed data.

---

## D. Verification via Hostinger Preview / Temporary URL

Before updating public DNS records, verify your deployment:

1. **System Health Check**:
   - Visit: `http://<your-preview-domain>/api/health`
   - Expected Response: `HTTP 200 OK` with JSON `{"status":"ok", "environment":"production", ...}`
2. **Public CMS Bundle**:
   - Visit: `http://<your-preview-domain>/api/public/bundle`
   - Expected Response: `HTTP 200 OK` with JSON containing verified services, solutions, industries, portfolio, insights, and careers.
3. **Frontend Landing Page**:
   - Visit: `http://<your-preview-domain>/`
   - Verify header, hero section, dynamic services, case studies, and footer render properly.
4. **Client-Side Routing (SPA Fallback)**:
   - Direct navigation to:
     - `http://<your-preview-domain>/services`
     - `http://<your-preview-domain>/about`
     - `http://<your-preview-domain>/careers`
     - `http://<your-preview-domain>/insights`
     - `http://<your-preview-domain>/contact`
   - Verify page refreshes reload the SPA correctly without 404 errors.
5. **API Security Check**:
   - Request non-existent API route: `http://<your-preview-domain>/api/non-existent`
   - Expected Response: `HTTP 404 Not Found` with JSON `{"error":"Endpoint GET /api/non-existent not found"}` (never HTML).
6. **Admin Panel Authentication & CMS**:
   - Visit: `http://<your-preview-domain>/admin/login`
   - Log in using your configured admin credentials.
   - Verify dashboard statistics load.
   - Test editing a service or content item in CMS and verify it reflects in the public bundle.

---

## E. Domain & DNS Configuration

> **IMPORTANT**: DNS was **NOT** changed during this technical preparation. Update DNS only after temporary URL verification passes.

When you are ready to point your custom domain:
1. Obtain Hostinger DNS records (A Record / CNAME) from **hPanel** → **Domains**.
2. Update the DNS records in your domain registrar (e.g. GoDaddy / Cloudflare):
   - **Type A**: Host `@` pointing to Hostinger server IP.
   - **Type CNAME**: Host `www` pointing to `@` or your domain.
3. In Hostinger hPanel, enable **Free SSL Certificate** (Let's Encrypt) to ensure HTTPS encryption and activate HSTS headers.

---

## F. Post-Deployment QA Checklist

- [ ] `GET /api/health` returns status `200` and JSON `{"status":"ok"}`
- [ ] `GET /api/public/bundle` returns status `200` with CMS data
- [ ] Contact form submission successfully creates an enquiry (`POST /api/contact`)
- [ ] Career application submission works as expected (`POST /api/careers/apply`)
- [ ] Admin login accepts valid credentials and rejects invalid credentials (`POST /api/admin/auth/login`)
- [ ] Admin dashboard and enquiries view are accessible with session token
- [ ] Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`) present in responses
- [ ] Unknown `/api/*` requests return JSON 404 errors
- [ ] Direct browser refreshes on SPA routes load the application cleanly
- [ ] Database persistence configured via `DB_FILE_PATH` (if isolated storage is desired)
