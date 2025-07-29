// Updated ChipsBytesWebsite.jsx with new tabs and no icons

import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react'; // Importing the CPU icon from lucide-react
import './style.css';

const ChipsBytesWebsite = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navigation = () => (
    <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : 'navbar-default'}`}>
      <div className="nav-container">
        {/* Logo aligned left */}
        <div className="navbar-logo" onClick={() => setActiveTab('home')}>
          <Cpu className="logo-icon" /> {/* Using the CPU icon as the logo */}
          <div className="logo-text">
            <h1 className="logo-title">Chips & Bytes</h1>
            <p className="logo-subtitle">Computer Architecture Club</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'events', label: 'Events' },
            { id: 'projects', label: 'Projects' },
            { id: 'blogs', label: 'Articles' },
            { id: 'mentors', label: 'Mentors' },
            { id: 'contact', label: 'Contact Us' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`nav-button ${activeTab === id ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="page home-page">
      <div className="video-background-section">
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay" />

        {/* Foreground content with two sides */}
        <div className="video-grid">
          {/* Left: Text */}
          <div className="video-left">
            <h1 className="main-heading">Welcome to Chips & Bytes</h1>
            <p className="subheading">Explore the world of Computer Architecture</p>
            <div className="hero-buttons">
              <button className="btn primary button-glow">
                Join Our Community
              </button>
              <button className="btn secondary button-glow" onClick={() => setActiveTab('projects')}>
                Start Building
              </button>
            </div>
          </div>

          {/* Right: Animated Icon */}
          <div className="video-right">
            <div className="bouncing-icon">
              <Cpu className="bouncing-cpu-icon" /> {/* Using the CPU icon as the bouncing logo */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="page about-page">
      <h1>About Us</h1>
      <p>We are a community passionate about computer architecture and systems design.</p>
    </div>
  );

  const EventsPage = () => (
    <div className="page events-page">
      <h1>Events</h1>
      <p>Join our upcoming workshops, hackathons, and seminars.</p>
    </div>
  );

  const ProjectsPage = () => (
    <div className="page projects-page">
      <h1>Projects</h1>
      <p>Explore our projects, from simple 8-bit CPUs to advanced pipelines.</p>
    </div>
  );

  const BlogsPage = () => (
    <div className="page blogs-page">
      <h1>Blogs</h1>
      <p>Read articles and tutorials written by our community members.</p>
    </div>
  );

  const MentorsPage = () => (
    <div className="page mentors-page">
      <h1>Mentors</h1>
      <p>Meet our mentors who guide and inspire us in our journey.</p>
    </div>
  );

  const ContactPage = () => (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with us for any queries or collaborations.</p>
    </div>
  );

  return (
    <div className="app">
      <Navigation />
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'about' && <AboutPage />}
      {activeTab === 'events' && <EventsPage />}
      {activeTab === 'projects' && <ProjectsPage />}
      {activeTab === 'blogs' && <BlogsPage />}
      {activeTab === 'mentors' && <MentorsPage />}
      {activeTab === 'contact' && <ContactPage />}
    </div>
  );
};

export default ChipsBytesWebsite;