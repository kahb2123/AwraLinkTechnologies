import { randomUUID } from 'node:crypto';
import express from 'express';
import nodemailer from 'nodemailer';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 3;

function firstValue(env, ...names) {
  for (const name of names) {
    const value = env[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
}

export function getSmtpConfig(env = process.env) {
  const smtpHost = firstValue(env, 'SMTP_HOST');
  const smtpPortValue = firstValue(env, 'SMTP_PORT') || '465';
  const smtpPort = Number(smtpPortValue);
  const smtpUser = firstValue(env, 'SMTP_USER', 'SMTP_USERNAME');
  const smtpPass = firstValue(env, 'SMTP_PASS', 'SMTP_PASSWORD');
  const mailTo = firstValue(env, 'MAIL_TO') || 'sales@awralink.com';
  const fromEmail = firstValue(env, 'FROM_EMAIL', 'MAIL_FROM') || smtpUser;
  const secureValue = firstValue(env, 'SMTP_SECURE', 'SMTP_ENCRYPTION').toLowerCase();
  const missing = [];

  if (!smtpHost) missing.push('SMTP_HOST');
  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) missing.push('SMTP_PORT');
  if (!smtpUser) missing.push('SMTP_USER or SMTP_USERNAME');
  if (!smtpPass) missing.push('SMTP_PASS or SMTP_PASSWORD');
  if (!EMAIL_PATTERN.test(mailTo)) missing.push('MAIL_TO');
  if (!EMAIL_PATTERN.test(fromEmail)) missing.push('FROM_EMAIL');

  let smtpSecure = smtpPort === 465;
  if (secureValue) {
    if (['true', '1', 'yes', 'ssl'].includes(secureValue)) {
      smtpSecure = true;
    } else if (['false', '0', 'no', 'tls', 'starttls'].includes(secureValue)) {
      smtpSecure = false;
    } else {
      missing.push('SMTP_SECURE (true for SSL or false for TLS)');
    }
  }

  return {
    config: missing.length === 0
      ? { smtpHost, smtpPort, smtpUser, smtpPass, mailTo, fromEmail, smtpSecure }
      : null,
    missing,
  };
}

export function validateInquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, error: 'Invalid inquiry data.' };
  }

  if (typeof input.website === 'string' && input.website.trim()) {
    return { ok: false, error: 'Invalid inquiry.' };
  }

  const limits = {
    fullName: 120,
    organization: 150,
    email: 254,
    phone: 40,
    service: 100,
    budget: 100,
    message: 5000,
  };
  const fields = {};

  for (const [field, limit] of Object.entries(limits)) {
    const value = typeof input[field] === 'string' ? input[field].trim() : '';
    if (value.length > limit) {
      return { ok: false, error: 'One or more inquiry fields are too long.' };
    }
    fields[field] = value;
  }

  if (
    fields.fullName.length < 2 ||
    /[\r\n]/.test(fields.fullName) ||
    /[\r\n]/.test(fields.email) ||
    !fields.organization ||
    !EMAIL_PATTERN.test(fields.email) ||
    (fields.phone && !/^[+().\-\s\d]{7,20}$/.test(fields.phone)) ||
    !fields.service ||
    fields.message.length < 10 ||
    input.consent !== true
  ) {
    return { ok: false, error: 'Please check the required inquiry fields and try again.' };
  }

  return { ok: true, fields };
}

async function sendInquiryEmail(config, fields) {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    requireTLS: !config.smtpSecure,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  return transporter.sendMail({
    from: { name: 'AwraLink Technologies', address: config.fromEmail },
    to: config.mailTo,
    replyTo: { name: fields.fullName, address: fields.email },
    subject: `Website inquiry from ${fields.fullName}`,
    text: [
      `Name: ${fields.fullName}`,
      `Organization: ${fields.organization}`,
      `Work email: ${fields.email}`,
      `Phone: ${fields.phone || 'Not provided'}`,
      `Service: ${fields.service}`,
      `Budget: ${fields.budget || 'Not provided'}`,
      '',
      'Message:',
      fields.message,
    ].join('\n'),
  });
}

export function createApp({
  getConfig = getSmtpConfig,
  sendMail = sendInquiryEmail,
} = {}) {
  const app = express();
  const attempts = new Map();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '16kb' }));

  app.get(['/', '/health', '/api', '/api/health'], (_request, response) => {
    response.json({ ok: true, service: 'awralink-contact-api' });
  });

  app.post(['/contact', '/contact.php', '/api/contact', '/api/contact.php'], async (request, response) => {
    const validation = validateInquiry(request.body);
    if (!validation.ok) {
      return response.status(422).json(validation);
    }

    const now = Date.now();
    const requestIp = request.ip || request.socket.remoteAddress || 'unknown';
    const recentAttempts = (attempts.get(requestIp) || []).filter((time) => time > now - RATE_WINDOW_MS);
    if (recentAttempts.length >= RATE_LIMIT) {
      attempts.set(requestIp, recentAttempts);
      return response.status(429).json({
        ok: false,
        error: 'Too many inquiries were submitted recently. Please wait and try again.',
      });
    }
    recentAttempts.push(now);
    attempts.set(requestIp, recentAttempts);

    const { config, missing } = getConfig();
    if (!config) {
      console.error('Contact API is missing SMTP settings:', missing.join(', '));
      return response.status(503).json({
        ok: false,
        error: 'The contact service is not configured. Please email sales@awralink.com directly.',
      });
    }

    const requestId = randomUUID();
    try {
      const result = await sendMail(config, validation.fields);
      console.info(JSON.stringify({
        event: 'contact_email_accepted',
        requestId,
        messageId: result.messageId || '',
      }));
      return response.status(200).json({ ok: true });
    } catch (error) {
      console.error(JSON.stringify({
        event: 'contact_email_failed',
        requestId,
        code: error.code || 'UNKNOWN',
        command: error.command || '',
      }));
      return response.status(502).json({
        ok: false,
        error: 'We could not send your inquiry. Please try again or email sales@awralink.com directly.',
      });
    }
  });

  app.use((request, response) => {
    response.status(404).json({ ok: false, error: 'API route not found.' });
  });

  app.use((error, _request, response, _next) => {
    if (error.type === 'entity.too.large') {
      return response.status(413).json({ ok: false, error: 'The inquiry is too large.' });
    }
    if (error instanceof SyntaxError && Object.prototype.hasOwnProperty.call(error, 'body')) {
      return response.status(400).json({ ok: false, error: 'Invalid JSON request.' });
    }

    console.error('Contact API request failed:', error.message);
    return response.status(500).json({ ok: false, error: 'The contact service encountered an error.' });
  });

  return app;
}
