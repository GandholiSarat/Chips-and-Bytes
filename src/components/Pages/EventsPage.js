import React from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import '../../style.css';

const EventsPage = () => (
  <>
    <h1 className="tab-heading">Events</h1>
    <p className="tab-desc">Join our upcoming workshops, hackathons, and seminars.</p>

    {/* New Event Announcement */}
    <div className="event-announcement">
      <h2 className="event-title">Upcoming Session</h2>
      <p className="event-details">
        📌 <strong>Session on Branch Predictors</strong> by <strong>Lokesh R</strong><br />
        🗓️ <strong>9th August 2025</strong><br />
        🕒 <strong>3:15 PM</strong><br />
        📍 <strong>I M.Tech CS Lab</strong><br />
        Don't miss it – Join us!
      </p>
    </div>

    <div className="read-more-container">
      <Link to="/events/details" className="read-more-link">
        View Past Events →
      </Link>
    </div>
  </>
);

export default EventsPage;
