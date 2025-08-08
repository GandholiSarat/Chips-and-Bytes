import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import '../../style.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map(e => ({ ...e, id: e._id }));
        console.log(data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="tab-heading">Events</h1>
      <p className="tab-desc">Join our upcoming workshops, hackathons, and seminars.</p>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-announcement" key={event._id}>
              <h2 className="event-title">Upcoming Session</h2>
              <p className="event-details">
                📌 <strong>{event.title}</strong> by <strong>{event.speaker}</strong><br />
                🗓️ <strong>{event.date}</strong><br />
                🕒 <strong>{event.time}</strong><br />
                📍 <strong>{event.location}</strong><br />
                {event.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="read-more-container">
        <Link to="/events/details" className="read-more-link">
          View Past Events →
        </Link>
      </div>
    </>
  );
};

export default EventsPage;
