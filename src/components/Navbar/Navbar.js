import React from 'react';
import { Cpu } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const handleNavClick = (id) => {
    if (id === 'about') {
      setActiveTab('home'); // Always show HomePage
      setTimeout(() => {
        const section = document.getElementById('about-us');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Wait for HomePage to render if needed
    } else {
      setActiveTab(id);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => setActiveTab('home')}>
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

