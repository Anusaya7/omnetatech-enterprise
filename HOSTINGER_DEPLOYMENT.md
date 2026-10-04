# OmNetaTech Enterprise — Hostinger deployment

The production app is one Node.js process. `npm start` runs `node server.js`, which loads environment variables and then starts `server/server.js`. That process serves the built website from `dist/` and the API from `/api`.

Do not commit `.env`, `.env.local`, or `.env.production`. Do not put real passwords in this file.

## Deployment procedure

1. **Upload or connect the GitHub repository.** In Hostinger hPanel, open Git and connect `https://github.com/Anusaya7/omnetatech-enterprise.git`, branch `main`. Deploy into the application directory that will contain `package.json` and `server.js`.

2. **Set the Node.js version.** Use Node.js 20.x LTS. Node.js 22.x is also compatible.

3. **Set the application root.** Use the directory where this repository is deployed. `package.json` and `server.js` must be in that directory.

4. **Set the startup file.** Use `server.js`.

5. **Set the start command.** Use `npm start`. That script is `node server.js`. The server reads `HOST` and `PORT` from the environment and falls back to `0.0.0.0` and `3000`.

6. **Install dependencies.** From the application root, install production and build tools:

   ```bash
   npm install --production=false
   ```

   Vite is a dev dependency, so a production-only install cannot build the frontend.

7. **Set environment variables in hPanel.** Hostinger values override a `.env` file. Leave `VITE_API_URL` empty for this same-domain app. Use a Gmail App Password for `SMTP_PASS`, not the normal Gmail password.

   | Variable | Production value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | Leave this to Hostinger when it assigns a port. Fallback is `3000`. |
   | `HOST` | `0.0.0.0` |
   | `DB_FILE_PATH` | Absolute path outside the deployed repository. See step 9. |
   | `ADMIN_EMAIL` | Administrator login email. |
   | `ADMIN_PASSWORD` | Administrator password. Set this in hPanel. |
   | `ALLOWED_ORIGINS` | `https://omnetatech.com,https://www.omnetatech.com` |
   | `VITE_API_URL` | Leave empty. |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | Gmail address that sends mail. |
   | `SMTP_PASS` | Gmail App Password. |
   | `SMTP_FROM` | Sender address, usually the same Gmail address. |
   | `ADMIN_NOTIFY_EMAIL` | Inbox that receives callback notifications. |

8. **Build the frontend.** Run this after the environment variables are saved, with `VITE_API_URL` empty:

   ```bash
   npm run build
   ```

   The browser then calls `/api/callback-request` on the same domain.

9. **Configure the persistent database path.** Hostinger can replace the application directory on a new Git deployment. Create a writable directory outside that directory, for example `/home/<username>/omnetatech-data/`, and set:

   ```text
   DB_FILE_PATH=/home/<username>/omnetatech-data/db.json
   ```

   The application creates the file on first start and does not delete an existing `db.json` on restart. If `DB_FILE_PATH` is empty, it uses `./data/db.json` inside the application directory, which a later deployment can replace. The code cannot choose the Hostinger home directory for you.

10. **Restart the application.** Use the Hostinger Node.js restart control, or run `npm start` from the application root.

11. **Configure the domain.** Point `omnetatech.com` and `www.omnetatech.com` at the Hostinger application, then enable the free SSL certificate. Keep `ALLOWED_ORIGINS` set to both HTTPS origins.

12. **Test the callback form.** Open the live site, choose Request a Callback, and submit a valid name and mobile number. The request must remain in the database even if email delivery fails. With SMTP configured, the notification subject is `New Callback Request — OmNetaTech`.

13. **Test admin login.** Open `/admin/login` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Callback Requests must show the saved name, mobile, email, company, preferred time, message, date, and status. Status values are New, Contacted, Completed, and Cancelled.

14. **Verify email delivery.** Submit one more callback after the Gmail App Password is set. Confirm the message arrives at `ADMIN_NOTIFY_EMAIL`. If SMTP settings are missing, the site still saves the request and logs `SMTP configuration is incomplete; callback email skipped.`

## Checks after restart

- `GET /api/health` returns `{"status":"ok"}`.
- `GET /` loads the website.
- `POST /api/callback-request` with a valid body returns success.
- `GET /api/admin/callback-requests` without a login token returns unauthorized.
- A second deployment does not erase the file at `DB_FILE_PATH`.
