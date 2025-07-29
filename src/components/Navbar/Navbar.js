import React, { useEffect, useCallback, useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';
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

// Reverse mapping for scroll detection
const idToSectionMap = {
  'about-us': 'about',
  'events-section': 'events',
  'projects-section': 'projects',
  'blogs-section': 'blogs',
  'mentors-section': 'mentors',
  'contact-section': 'contact'
};

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setActiveTab(id); 
    setIsMobileMenuOpen(false); // Close mobile menu when navigation item is clicked
    
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside or on scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Set up Intersection Observer for better performance
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -50% 0px', // More lenient trigger area
      threshold: [0, 0.1, 0.5] // Multiple thresholds for better detection
    };

    let currentSections = new Set();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const navId = idToSectionMap[sectionId];
        
        if (entry.isIntersecting) {
          currentSections.add(navId);
        } else {
          currentSections.delete(navId);
        }
      });

      // Find the most prominent section (first one in our navigation order)
      const navOrder = ['about', 'events', 'projects', 'blogs', 'mentors', 'contact'];
      let newActiveTab = 'home';

      for (const section of navOrder) {
        if (currentSections.has(section)) {
          newActiveTab = section;
          break;
        }
      }

      // Handle home section
      if (window.scrollY < 100) {
        newActiveTab = 'home';
      }

      if (newActiveTab !== activeTab) {
        setActiveTab(newActiveTab);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionMap).forEach(sectionId => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab, setActiveTab]);

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

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-only">
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

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle mobile-only">
          <button 
            onClick={toggleMobileMenu}
            className="menu-toggle-btn"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
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
              className={`mobile-nav-button ${activeTab === id ? 'active' : ''}`}
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