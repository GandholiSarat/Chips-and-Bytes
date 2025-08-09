import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import '../../style.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events`)
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
        <div className="events-wrapper">
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card neon-glow" key={event._id}>
                <div className="event-card-header">
                  <h2 className="event-title">{event.title}</h2>
                  <span className="event-speaker">by {event.speaker}</span>
                </div>
                <div className="event-card-body">
                  <div className="event-meta">
                    <span className="event-date">🗓️ {new Date(event.date).toISOString().slice(0, 10)}</span>
                    <span className="event-time">🕒 {event.time}</span>
                    <span className="event-location">📍 {event.location}</span>
                  </div>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
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
