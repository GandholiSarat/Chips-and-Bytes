import React from 'react';
import { Cpu } from 'lucide-react';
import './Navbar.css';

const sectionMap = {
  home: null,
  about: 'about-us',
  events: 'events-section',
  projects: 'projects-section',
  blogs: 'blogs-section',
  mentors: 'mentors-section',
  contact: 'contact-section'
};

const Navbar = ({ activeTab, setActiveTab }) => {
  const handleNavClick = (id) => {

  setActiveTab(id); 
  if (sectionMap[id]) {
    setTimeout(() => {
      const section = document.getElementById(sectionMap[id]);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};



  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <img src="/assets/logo_white.png" alt="Chips & Bytes Logo" className="logo-icon" />
          <div className="logo-text">
            <h1 className="logo-title">Chips & Bytes</h1>
            <p className="logo-subtitle">Computer Architecture Club</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'events', label: 'Events' },
            { id: 'projects', label: 'Projects' },
            { id: 'blogs', label: 'Blogs' },
            { id: 'mentors', label: 'Mentors' },
            { id: 'contact', label: 'Contact Us' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`nav-button ${activeTab === id ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

