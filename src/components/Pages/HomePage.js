import React from 'react';
import { Cpu } from 'lucide-react';
import './HomePage.css';
import AboutPage from './AboutPage';

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
          <h1 className="main-heading">Welcome to Chips & Bytes</h1>
          <p className="subheading">Explore the world of Computer Architecture</p>
          <div className="hero-buttons">
            <button className="btn primary button-glow">Join Our Community</button>
          </div>
        </div>

        <div className="video-right">
          <div className="bouncing-icon">
            <img src="/assets/logo_white_full.png" alt="Chips & Bytes Logo" 
              style={{width: '120px',height: '95px'}}/>
          </div>
        </div>
      </div>
    </div>
    {/* About Section from AboutPage.js */}
    <div id="about-us">
      <AboutPage />
    </div>
  </div>
);

export default HomePage;