// /api/send-email.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message).trim();

  if (!cleanEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const receiverEmails = (process.env.CONTACT_RECEIVER_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

  if (!process.env.RESEND_API_KEY || receiverEmails.length === 0) {
    return res.status(500).json({ error: 'Missing Resend config in environment variables.' });
  }

  try {
    // Send to site owners
    const toReceivers = await resend.emails.send({
      from: fromAddress,
      to: receiverEmails,
      subject: `New contact form message from ${cleanName}`,
      reply_to: cleanEmail,
      html: `
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Message:</strong><br/>${cleanMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    console.log('Email sent to team:', toReceivers);

    // Optionally send confirmation to user
    if (process.env.SEND_CONFIRMATION_EMAIL !== 'false') {
      try {
        const toUser = await resend.emails.send({
          from: fromAddress,
          to: cleanEmail,
          subject: 'Thanks for reaching out!',
          html: `
            <p>Hi ${cleanName},</p>
            <p>Thanks for contacting us. We received your message:</p>
            <blockquote>${cleanMessage.replace(/\n/g, '<br/>')}</blockquote>
            <p>We'll get back to you shortly.</p>
            <p>— The Chips & Bytes Team</p>
          `,
        });

        console.log('Confirmation email sent to user:', toUser);
      } catch (userErr) {
        console.warn('Failed to send confirmation email:', userErr);
        // Don't fail the request just because confirmation email failed
      }
    }

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Failed to send email:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}
