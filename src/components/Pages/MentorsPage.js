import React, { useRef, useEffect, useState } from 'react';
import './MentorsPage.css';
import '../../style.css';
import { mentors } from '../../data/constants';
import { FaLinkedin } from 'react-icons/fa';

const Mentors = () => {
  const scrollRef = useRef();
  const scrollCount = useRef(0);
  const intervalRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const maxLoops = 20;

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 5);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const cardWidth = container.children[0].offsetWidth + 24;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });

    // Wait a moment for scroll to complete before checking
    setTimeout(checkScrollPosition, 500);
  };

  // Auto-scroll setup
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const cardWidth = container.children[0].offsetWidth + 24;

    intervalRef.current = setInterval(() => {
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      if (atEnd) {
        scrollCount.current += 1;

        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: 'auto' });
          checkScrollPosition(); // Reset arrows
        }, 300);

        if (scrollCount.current >= maxLoops) {
          clearInterval(intervalRef.current);
        }
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setTimeout(checkScrollPosition, 500);
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Check scroll position on mount and on window resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  return (
    <div className="mentors-page">
      <h1 className="tab-heading">Mentors</h1>
      <p className="tab-desc">Meet our mentors who guide and inspire us in our journey.</p>

      <div className="mentors-carousel-wrapper">
<<<<<<< HEAD
        <button 
                className="scroll-arrow left-arrow" 
                onClick={() => scroll('left')} 
                aria-label="Scroll Left"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>

        <div className="mentors-list" ref={scrollRef} onScroll={handleScroll}>
          {mentorList.map((mentor, index) => (
=======
        {canScrollLeft && (
          <button
            className="scroll-arrow left-arrow"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
        )}

        <div className="mentors-list" ref={scrollRef} onScroll={checkScrollPosition}>
          {mentors.map((mentor, index) => (
>>>>>>> 0a06539 (Mentors Debugged)
            <div className="mentor-card" key={`${mentor.name}-${index}`}>
              <img src={mentor.image} alt={mentor.name} className="mentor-image" />
              <div className="mentor-info">
                <h2>{mentor.name}</h2>
                <p className="mentor-designation">{mentor.designation}</p>
                <p className="mentor-summary">{mentor.summary}</p>
                <a
                  className="linkedin-link"
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> {mentor.name}
                </a>
              </div>
            </div>
          ))}
        </div>

<<<<<<< HEAD
        <button 
                className="scroll-arrow right-arrow" 
                onClick={() => scroll('right')} 
                aria-label="Scroll Right"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
=======
        {canScrollRight && (
          <button
            className="scroll-arrow right-arrow"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        )}
>>>>>>> 0a06539 (Mentors Debugged)
      </div>
    </div>
  );
};

export default Mentors;
