/**
 * @file eventArchiver.js
 * @description Runs the event archive housekeeping while the backend is awake.
 */

const { archiveExpiredEvents } = require('./eventLifecycle');

const ARCHIVE_INTERVAL_MS = Math.max(
  Number.parseInt(process.env.EVENT_ARCHIVE_INTERVAL_MS || '60000', 10) || 60000,
  30000
);

const archiveExpiredEventsSafely = async () => {
  try {
    await archiveExpiredEvents();
  } catch (error) {
    console.error('Unable to check expired events:', error);
  }
};

const startEventArchiver = () => {
  void archiveExpiredEventsSafely();
  const interval = setInterval(archiveExpiredEventsSafely, ARCHIVE_INTERVAL_MS);
  interval.unref();
  return interval;
};

module.exports = { startEventArchiver };
