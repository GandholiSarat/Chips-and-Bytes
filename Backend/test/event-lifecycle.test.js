const test = require('node:test');
const assert = require('node:assert/strict');
const { getEventStartAt, isEventExpired, toPastEvent } = require('../services/eventLifecycle');

const event = {
  title: 'QEMU memory lab',
  date: '2026-08-30',
  time: '15:10',
  speaker: 'Chips & Bytes',
  location: 'Seminar Hall',
  description: 'Trace a memory access through the system.'
};

test('combines event date and time in the configured club timezone', () => {
  const start = getEventStartAt(event, 'Asia/Kolkata');
  assert.equal(start.toISOString(), '2026-08-30T09:40:00.000Z');
});

test('archives events only after their scheduled moment and preserves blank links', () => {
  assert.equal(isEventExpired(event, new Date('2026-08-30T09:39:59.000Z'), 'Asia/Kolkata'), false);
  assert.equal(isEventExpired(event, new Date('2026-08-30T09:40:01.000Z'), 'Asia/Kolkata'), true);
  assert.deepEqual(toPastEvent(event), {
    date: '2026-08-30',
    title: 'QEMU memory lab',
    reportLink: '',
    resourcesLink: ''
  });
});
