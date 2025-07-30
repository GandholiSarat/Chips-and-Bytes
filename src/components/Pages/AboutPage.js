// import '../../style.css';
import './AboutPage.css'; // Ensure the CSS is imported

import React, { useEffect, useRef } from 'react';

function AboutPage() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) headingRef.current.classList.add('visible');
    if (paraRef.current) paraRef.current.classList.add('fade-in');
  }, []);

  return (
    <div className="about-page">
      <h1 ref={headingRef} className="about-us-heading">
        About Us
      </h1>
      <p ref={paraRef} className="tab-desc fade-in">
        <strong>Chips & Bytes</strong> is a vibrant community of innovators, learners, and future leaders in computer architecture. Our mission is to ignite curiosity and drive excellence by blending theory with hands-on experience.
      </p>
      <ul className="about-list fade-in">
        <li> Work on real-world hardware and software projects</li>
        <li> Collaborate with industry experts and researchers</li>
        <li> Participate in workshops, seminars, and hackathons</li>
        <li> Develop skills for careers in hardware design, embedded systems, and more</li>
      </ul>
      <p className="tab-desc fade-in">
        Join us to explore the building blocks of modern computing, unlock your potential, and shape the future of technology!
      </p>
    </div>
  );
}

export default AboutPage;
