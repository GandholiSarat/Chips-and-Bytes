// pages/api/send-email.js (or app/api/send-email/route.js for App Router)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
await resend.emails.send({
  from: 'contact@yourdomain.com',
  to: ['alice@example.com', 'bob@example.com'], // array of recipients
  cc: ['manager@example.com'],                  // optional CC
  bcc: ['audit@example.com'],                  // optional BCC
  subject: `New contact form message from ${name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});


    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}