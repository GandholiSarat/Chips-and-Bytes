const getEventStartAt = (event) => {
  const dateKey = String(event?.date || '').slice(0, 10);
  const time = /^\d{1,2}:\d{2}$/.test(String(event?.time || '')) ? event.time : '00:00';
  const start = new Date(`${dateKey}T${time}:00`);
  return Number.isNaN(start.getTime()) ? null : start;
};

/**
 * Keeps cached/fallback content honest between API refreshes. The backend is
 * authoritative and uses the club time zone; this prevents a passed event from
 * lingering in an already-open visitor tab.
 */
export const getScheduledEvents = (events, now = new Date()) => (
  (Array.isArray(events) ? events : [])
    .map((event) => ({ event, start: getEventStartAt(event) }))
    .filter(({ start }) => start && start.getTime() > now.getTime())
    .sort((first, second) => first.start - second.start)
    .map(({ event }) => event)
);
