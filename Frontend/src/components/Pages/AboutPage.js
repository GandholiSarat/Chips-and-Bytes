/**
 * @file AboutPage.js
 * @description
 * About page for the Chips & Bytes website.
 * Describes the club's mission, objectives, and community values.
 * 
 * Features:
 * - Animated headings and paragraphs.
 * - Lists club mission and objectives.
 * 
 * @component
 * @returns {JSX.Element}
 */

import './AboutPage.css';
import React from 'react';

function AboutPage() {
  return (
    <section className="about-page" aria-labelledby="about-heading">
      <header className="section-heading about-page__heading">
        <h1 id="about-heading" className="about-us-heading">About Us</h1>
        <p className="tab-desc">
          <strong>Chips &amp; Bytes</strong> is a dynamic community of computer science and architecture enthusiasts from Department of Mathematics &amp; Computer Science (DMACS) at{' '}
          <a href="https://www.sssihl.edu.in/departments/mathematics-computer-science/" target="_blank" rel="noreferrer">
            <strong>Sri Sathya Sai Institute of Higher Learning (SSSIHL)</strong>
          </a>, dedicated to learning, building, and innovating. We blend deep technical understanding with hands-on practice, encouraging self-driven growth, open-source contributions, and entrepreneurial thinking so members can turn ideas into real startup-worthy projects.
        </p>
      </header>

      <div className="club-mission">
        <h2 className="subheading">Our Mission</h2>
        <p className="tab-desc">
          To cultivate a passionate, collaborative community that explores the 
          intricacies of computer architecture and systems, contributes to 
          technological advancement through research and open-source development, 
          and inspires members to incubate and pursue startup ideas with an 
          entrepreneurial mindset.
        </p>
      </div>

      <div className="club-objectives">
        <h2 className="subheading">What We Do</h2>
        <ul className="about-list">
          <li>
            Foster self-driven learning and continuously challenge members' 
            technical and analytical capabilities in computer architecture 
            and systems.
          </li>
          <li>
            Develop proficiency in the tools and technologies that power 
            modern computing, from low-level hardware concepts to system 
            software.
          </li>
          <li>
            Contribute to established open-source projects to gain practical 
            experience and promote collaborative development.
          </li>
          <li>
            Engage with industry professionals and mentors to provide real-world 
            insight, guidance, and exposure.
          </li>
          <li>
            Prepare members for future careers and entrepreneurial ventures by 
            equipping them with cutting-edge, industry-relevant skills.
          </li>
        </ul>
      </div>

      <p className="tab-desc about-page__closing">
        Join <strong>Chips &amp; Bytes</strong> to explore the building blocks 
        of modern computing, grow your capabilities, and help shape the future 
        of technology.
      </p>
    </section>
  );
}

export default AboutPage;
