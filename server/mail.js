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

export async function sendCallbackNotification(request, fallbackRecipient) {
  const to = String(process.env.ADMIN_NOTIFY_EMAIL || fallbackRecipient || '').trim();
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !to) {
    console.warn('Callback notification email was not sent because SMTP or ADMIN_NOTIFY_EMAIL is not configured.');
    return { sent: false, reason: 'not_configured' };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000
  });

  const lines = [
    'New Callback Request',
    '',
    `Name: ${request.fullName}`,
    `Mobile Number: ${request.mobile}`,
    `Email: ${request.email || 'Not provided'}`,
    `Company: ${request.companyName || 'Not provided'}`,
    `Preferred Time: ${request.preferredTime}`,
    `Message: ${request.message || 'Not provided'}`,
    `Submission Date/Time: ${formatSubmittedAt(request.createdAt)} IST`
  ];

  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to,
    subject: 'New Callback Request',
    text: lines.join('\n')
  });

  return { sent: true };
}
