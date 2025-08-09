import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';
import './HomePage.css';
import AboutPage from './AboutPage';
import EventsPage from './EventsPage';
import ProjectsPage from './ProjectsPage';
import BlogsPage from './BlogsPage';
import MentorsPage from './MentorsPage';
import ContactPage from './ContactPage';
import Members from './MembersPage';
import MembersPage from './MembersPage';
import { Link } from 'react-router-dom';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/announcements`;

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data || []);
      });
  }, []);

  return (
    <div className="page home-page">
      <div className="video-background-section">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay" />

        <div className="video-grid">
          <div className="video-left">
            <h1 className="main-heading">Welcome to</h1>
            <h2 className="typing-heading">Chips & Bytes</h2>
            <p className="subheading">Explore the world of Computer Architecture</p>
            <div className="hero-buttons">
              <button
                className="btn primary button-glow"
                onClick={() => {
                  document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join Our Community
              </button>
            </div>

          </div>

          <div className="video-right">
            <div className="bouncing-icon">
              <img src="/assets/logo_white_full.png" alt="Chips & Bytes Logo" 
                style={{width: '120px',height: '95px'}}/>
            </div>
          </div>
        </div>

        <div className="announcements-bar">
          <div className="scroll-text">
            <span className="announcement-highlight">Latest Updates: </span>
            {announcements.length > 0
              ? announcements.map(a => a.text).join(' | ')
              : 'No announcements yet.'}
          </div>
        </div>
      </div>
      <div id="about-us" className="tab-section-container">
        <AboutPage />
      </div>
      <div id="members-section" className="tab-section-container">
        <MembersPage />
      </div>
      <div id="events-section" className="tab-section-container">
        <EventsPage />
      </div>
      <div id="projects-section" className="tab-section-container">
        <ProjectsPage />
      </div>
      <div id="blogs-section" className="tab-section-container">
        <BlogsPage />
      </div>
      <div id="mentors-section" className="tab-section-container">
        <MentorsPage />
      </div>
      <div id="contact-section" className="tab-section-container">
        <ContactPage />
      </div>

      <div style={{ textAlign: 'right', margin: '2rem 2.5rem 1rem 0' }}>
        <Link to="/admin" aria-label="Admin Login">
          <Cpu size={22} color="#38bff82f" />
        </Link>
      </div>

    </div>
  );
};

export default HomePage;