import nodemailer from 'nodemailer';

function formatSubmittedAt(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return String(value || '');
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });
}

function readSmtpSettings() {
  const host = String(process.env.SMTP_HOST || '').trim();
  const user = String(process.env.SMTP_USER || '').trim();
  const pass = String(process.env.SMTP_PASS || '').trim();
  const from = String(process.env.SMTP_FROM || '').trim();
  const to = String(process.env.ADMIN_NOTIFY_EMAIL || '').trim();
  const parsedPort = Number(String(process.env.SMTP_PORT || '').trim());
  const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 587;
  const secure = String(process.env.SMTP_SECURE || '').trim().toLowerCase() === 'true' || port === 465;
  return { host, user, pass, from, to, port, secure };
}

export function isSmtpConfigured() {
  const settings = readSmtpSettings();
  return Boolean(settings.host && settings.user && settings.pass && settings.to);
}

function createTransporter(settings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    requireTLS: !settings.secure,
    auth: {
      user: settings.user,
      pass: settings.pass
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000
  });
}

export function safeSmtpError(error) {
  const code = String(error?.code || error?.responseCode || '');
  const raw = `${code} ${error?.message || ''} ${error?.response || ''}`;
  const secret = String(process.env.SMTP_PASS || '').trim();
  if (secret && raw.includes(secret)) {
    return 'SMTP delivery failed.';
  }
  if (/EAUTH|535|534|authentication|invalid login|username and password/i.test(raw)) {
    return 'SMTP authentication failed.';
  }
  if (/ENOTFOUND|EDNS|EAI_AGAIN|ENODATA/i.test(raw)) {
    return 'SMTP host could not be resolved.';
  }
  if (/ETIMEDOUT|ESOCKET|ECONNECTION|ECONNREFUSED|ECONNRESET|ETIMEDOUT/i.test(raw)) {
    return 'SMTP server is unavailable or timed out.';
  }
  return 'SMTP delivery failed.';
}

export function warnIfSmtpUnavailable() {
  if (!isSmtpConfigured()) {
    console.warn('SMTP configuration is incomplete; callback email skipped.');
    return;
  }

  const transporter = createTransporter(readSmtpSettings());
  transporter.verify().then(() => {
    console.log('[OmNetaTech Server] SMTP configuration is ready.');
  }).catch((error) => {
    console.warn('SMTP is unavailable. Callback requests will still be saved.', safeSmtpError(error));
  });
}

export function buildCallbackEmail(request) {
  const lines = [
    'New Callback Request',
    '',
    `Name: ${request.fullName}`,
    `Mobile Number: ${request.mobile}`,
    `Email: ${request.email || 'Not provided'}`,
    `Company: ${request.companyName || 'Not provided'}`,
    `Preferred Callback Time: ${request.preferredTime}`,
    `Message: ${request.message || 'Not provided'}`,
    `Submitted At: ${formatSubmittedAt(request.createdAt)}`
  ];
  return {
    subject: 'New Callback Request — OmNetaTech',
    text: lines.join('\n')
  };
}

export async function sendCallbackNotification(request) {
  const settings = readSmtpSettings();
  if (!settings.host || !settings.user || !settings.pass || !settings.to) {
    console.warn('SMTP configuration is incomplete; callback email skipped.');
    return { sent: false, reason: 'not_configured' };
  }

  const transporter = createTransporter(settings);
  const email = buildCallbackEmail(request);

  await transporter.sendMail({
    from: settings.from || settings.user,
    to: settings.to,
    subject: email.subject,
    text: email.text
  });

  return { sent: true };
}
