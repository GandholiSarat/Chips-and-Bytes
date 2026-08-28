/**
 * @file eventLifecycle.js
 * @description Keeps the scheduled-event collection and past-event archive in sync.
 */

const Event = require('../models/Event');
const PastEvent = require('../models/PastEvent');

// Events are scheduled by the club in India. Deployments may override this with
// EVENT_TIME_ZONE if the club later runs a session in another time zone.
const EVENT_TIME_ZONE = process.env.EVENT_TIME_ZONE || 'Asia/Kolkata';

const getDateKey = (value) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error('Event has an invalid date');
  return date.toISOString().slice(0, 10);
};

const getTimeParts = (value) => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || '').trim());
  if (!match) throw new Error('Event has an invalid time');

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) throw new Error('Event has an invalid time');
  return { hours, minutes };
};

const zonePartsAsUtc = (timestamp, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date(timestamp));

  const values = Object.fromEntries(parts
    .filter(({ type }) => type !== 'literal')
    .map(({ type, value }) => [type, Number(value)]));

  return Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second);
};

/**
 * Turns the separate form date and time into one absolute moment. The second
 * pass makes this reliable in time zones that observe daylight-saving changes.
 */
const getEventStartAt = (event, timeZone = EVENT_TIME_ZONE) => {
  const [year, month, day] = getDateKey(event.date).split('-').map(Number);
  const { hours, minutes } = getTimeParts(event.time);
  const localAsUtc = Date.UTC(year, month - 1, day, hours, minutes, 0);
  const firstOffset = zonePartsAsUtc(localAsUtc, timeZone) - localAsUtc;
  const candidate = localAsUtc - firstOffset;
  const finalOffset = zonePartsAsUtc(candidate, timeZone) - candidate;
  return new Date(localAsUtc - finalOffset);
};

const isEventExpired = (event, now = new Date(), timeZone = EVENT_TIME_ZONE) => (
  getEventStartAt(event, timeZone).getTime() <= now.getTime()
);

const toPastEvent = (event) => ({
  date: getDateKey(event.date),
  title: event.title,
  reportLink: '',
  resourcesLink: ''
});

/**
 * Archive one event exactly once. If persisting the archive fails, restore the
 * source event so a temporary database problem cannot silently lose it.
 */
const archiveEventById = async (id) => {
  const event = await Event.findByIdAndDelete(id).lean();
  if (!event) return null;

  try {
    return await PastEvent.create(toPastEvent(event));
  } catch (error) {
    await Event.create(event);
    throw error;
  }
};

const archiveExpiredEvents = async (now = new Date()) => {
  const events = await Event.find({}).lean();
  const expired = events.filter((event) => isEventExpired(event, now));
  const results = await Promise.allSettled(expired.map((event) => archiveEventById(event._id)));

  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.error('Unable to archive an expired event:', result.reason);
    }
  });

  return {
    archived: results.filter((result) => result.status === 'fulfilled' && result.value).length,
    failed: results.filter((result) => result.status === 'rejected').length
  };
};

module.exports = {
  EVENT_TIME_ZONE,
  getEventStartAt,
  isEventExpired,
  toPastEvent,
  archiveEventById,
  archiveExpiredEvents
};
