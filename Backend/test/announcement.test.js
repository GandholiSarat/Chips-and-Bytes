const test = require('node:test');
const assert = require('node:assert/strict');
const Announcement = require('../models/Announcement');

test('accepts structured announcements and mirrors the public message to legacy text', async () => {
  const announcement = new Announcement({
    title: 'Architecture reading group',
    message: 'Registration is now open for the next session.',
    actionLabel: 'Register',
    actionUrl: '/events',
    category: 'event',
    isActive: true
  });
  await announcement.validate();
  assert.equal(announcement.text, 'Registration is now open for the next session.');
});

test('keeps legacy text announcements valid and exposes them as messages', async () => {
  const announcement = new Announcement({ text: 'Legacy announcement' });
  await announcement.validate();
  assert.equal(announcement.message, 'Legacy announcement');
});
