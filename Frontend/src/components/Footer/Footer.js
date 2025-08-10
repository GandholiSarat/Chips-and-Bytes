/**
 * @file Footer.js
 * @description
 * Footer component for the Chips and Bytes website.
 * Displays the site logo, copyright,
 * and a note about site maintenance by DMACS students.
 */

import React from 'react';
import './Footer.css';

/**
 * Footer Component
 * 
 * Renders the website footer with logo, copyright,
 * and maintenance information.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo left-logo">
        {/* Replace with your left logo */}
        <img src="/assets/emblem.png" alt="Left Logo" />
      </div>

      <div className="footer-text">
        &copy; {new Date().getFullYear()} Digital Copyright - All Rights Reserved
      </div>
      <div className="footer-maintained right-text">
        This Site is Maintained by Students of DMACS,{' '}
        <a href="https://www.sssihl.edu.in" target="_blank" rel="noopener noreferrer">
          SSSIHL
        </a>.
      </div>
    </footer>
  );
};

export default Footer;
