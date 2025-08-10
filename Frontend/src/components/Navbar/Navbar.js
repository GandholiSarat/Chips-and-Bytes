/**
 * @file Navbar.js
 * @description
 * Responsive navigation bar for the Chips & Bytes website.
 * Handles navigation between sections and pages, highlights the active section,
 * and supports both desktop and mobile layouts.
 * 
 * Features:
 * - Scrolls to sections on the home page.
 * - Navigates to other pages (blogs, projects, etc.).
 * - Highlights the active section based on scroll position.
 * - Responsive mobile menu with toggle.
 * - Closes mobile menu on outside click or scroll.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - The currently active tab/section.
 * @param {Function} props.setActiveTab - Function to update the active tab.
 * @param {Function} props.navigate - Navigation function (from react-router).
 * @returns {JSX.Element}
 */

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const sectionMap = {
  home: null,
  about: 'about-us',
  events: 'events-section',
  projects: 'projects-section',
  blogs: 'blogs-section',
  members: 'members-section',
  mentors: 'mentors-section',
  contact: 'contact-section'
};

/**
 * Navbar Component
 * 
 * Renders the main navigation bar, handles section/page navigation,
 * and manages mobile menu state.
 */
const Navbar = ({ activeTab, setActiveTab, navigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Update active tab based on route changes
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/blogs')) {
      setActiveTab('blogs');
    } else if (path.startsWith('/projects')) {
      setActiveTab('projects');
    }
    // For home page, let scroll detection handle it
  }, [location.pathname, setActiveTab]);

  /**
   * Handles navigation button clicks.
   * Scrolls to section or navigates to page as needed.
   * @param {string} id - Section or page identifier
   */
  const handleNavClick = (id) => {
    setActiveTab(id); 
    setIsMobileMenuOpen(false);

    if (id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (navigate) {
        navigate('/');
      }
      return;
    }

    if (id === 'blogs' && !location.pathname.startsWith('/blogs')) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('blogs-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'projects' && !location.pathname.startsWith('/projects')) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('projects-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (location.pathname === '/' && sectionMap[id]) {
      setTimeout(() => {
        const section = document.getElementById(sectionMap[id]);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (sectionMap[id]) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionMap[id]);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  /**
   * Toggles the mobile menu open/close state.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Detect and highlight active section on scroll (home page only)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollPosition < 100) {
        if (activeTab !== 'home') setActiveTab('home');
        return;
      }
      const sections = [
        { id: 'about', element: document.getElementById('about-us') },
        { id: 'members', element: document.getElementById('members-section') },
        { id: 'events', element: document.getElementById('events-section') },
        { id: 'projects', element: document.getElementById('projects-section') },
        { id: 'blogs', element: document.getElementById('blogs-section') },
        { id: 'mentors', element: document.getElementById('mentors-section') },
        { id: 'contact', element: document.getElementById('contact-section') }
      ];
      let currentSection = 'home';
      let maxVisibility = 0;
      sections.forEach(({ id, element }) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        const visibleTop = Math.max(0, -elementTop);
        const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityRatio = visibleHeight / windowHeight;
        if (elementTop < windowHeight * 0.5 && elementBottom > windowHeight * 0.2) {
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            currentSection = id;
          }
        }
      });
      if (currentSection !== activeTab) setActiveTab(currentSection);
    };

    // Initial check
    handleScroll();

    // Throttle scroll event with requestAnimationFrame
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [location.pathname, activeTab, setActiveTab]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <img src="/assets/logo_white.png" alt="Chips & Bytes Logo" className="logo-icon" />
          <div className="logo-text">
            <h1 className="logo-title">Chips & Bytes</h1>
            <p className="logo-subtitle">Computer Architecture Club</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-links">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'members', label: 'Members'},
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
        <div className="mobile-menu-toggle">
          <button 
            onClick={toggleMobileMenu}
            className="menu-toggle-btn"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'members', label: 'Members' },
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
