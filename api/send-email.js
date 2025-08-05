// api/send-email.js
import { Resend } from 'resend';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 5;
const rateLimitStore = new Map();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resend = new Resend(process.env.RESEND_API_KEY);

const parseList = (s) =>
  typeof s === 'string' ? s.split(',').map((x) => x.trim()).filter(Boolean) : [];

function sanitize(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate limiting per IP (ephemeral in serverless)
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { count: 0, firstRequestAt: now };
  if (now - entry.firstRequestAt < RATE_LIMIT_WINDOW_MS) {
    if (entry.count >= MAX_PER_WINDOW) {
      return res
        .status(429)
        .json({ error: 'Too many requests. Please wait and try again.' });
    }
    entry.count += 1;
  } else {
    entry.count = 1;
    entry.firstRequestAt = now;
  }
  rateLimitStore.set(ip, entry);

  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  const { name, email, message } = body || {};

  if (!name || !name.toString().trim()) return res.status(400).json({ error: 'Name is required.' });
  if (!email || !email.toString().trim()) return res.status(400).json({ error: 'Email is required.' });
  if (!emailRegex.test(email.toString().trim())) return res.status(400).json({ error: 'Email is not valid.' });
  if (!message || !message.toString().trim()) return res.status(400).json({ error: 'Message cannot be empty.' });

  const cleanName = sanitize(name);
  const cleanEmail = String(email).trim();
  const cleanMessage = sanitize(message);

  const receivers = parseList(process.env.CONTACT_RECEIVER_EMAILS || '');
  if (receivers.length === 0) {
    return res.status(500).json({ error: 'No receiver email configured.' });
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: fromAddress,
      to: receivers,
      subject: `New contact form message from ${cleanName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
        <p><strong>Message:</strong><br/>${cleanMessage}</p>
        <hr/>
        <p style="font-size:0.8em;"><em>IP: ${ip}</em></p>
      `,
      reply_to: cleanEmail,
    });

    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      await resend.emails.send({
        from: fromAddress,
        to: [cleanEmail],
        subject: `Thanks for contacting us, ${cleanName}!`,
        html: `
          <p>Hi ${cleanName},</p>
          <p>Thanks for your message. We received it and will get back to you soon.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="background:#f0f4f8;padding:10px;border-radius:6px;">${cleanMessage}</blockquote>
          <p>— The Team</p>
        `,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Try again later.' });
  }
}
