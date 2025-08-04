import React from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import '../../style.css'
const EventsPage = () => (
  <>
    <h1  className="tab-heading" >Events</h1>
    <p className="tab-desc">Join our upcoming workshops, hackathons, and seminars.</p>
              <div className="read-more-container">
                <Link to="/events/details" className="read-more-link">
                  View All Events →
                </Link>
              </div>
  </>
);

export default EventsPage;