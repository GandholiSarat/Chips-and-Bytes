import React from 'react';
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

const HomePage = () => (
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
          <span className="announcement-highlight">Latest Updates:</span> Welcome to Chips & Bytes! Join our community to explore Computer Architecture together.
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
  </div>
);

export default HomePage;