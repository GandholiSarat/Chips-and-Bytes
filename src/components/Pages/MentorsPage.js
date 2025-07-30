import React, { useRef, useEffect, useState } from 'react';
import './MentorsPage.css';
import '../../style.css';
import { mentors as originalMentors } from '../../data/constants';
import { FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Mentors = () => {
  const scrollRef = useRef();
  const intervalRef = useRef(null);
  const [mentorList, setMentorList] = useState([...originalMentors, ...originalMentors, ...originalMentors]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const cardWidth = container.children[0].offsetWidth + 24;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      scroll('right');
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Initialize scroll to center (so we can scroll both directions)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const cardWidth = container.children[0].offsetWidth + 24;
    const middleIndex = Math.floor(mentorList.length / 2);
    container.scrollLeft = middleIndex * cardWidth;
  }, [mentorList]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const cardWidth = container.children[0].offsetWidth + 24;
    const totalCards = mentorList.length;
    const scrollLeft = container.scrollLeft;
    const currentIndex = Math.floor(scrollLeft / cardWidth);

    const buffer = 5; // how early to trigger append

    // Append if near end
    if (totalCards - currentIndex <= buffer) {
      setMentorList((prev) => [...prev, ...originalMentors]);
    }

    // Prepend if near start (optional, for reverse scrolling)
    else if (currentIndex <= buffer) {
      setMentorList((prev) => [...originalMentors, ...prev]);

      // Reset scroll position to maintain visual position
      setTimeout(() => {
        container.scrollLeft += originalMentors.length * cardWidth;
      }, 0);
    }
  };

  return (
    <div className="mentors-page">
      <h1 className="tab-heading">Mentors</h1>
      <p className="tab-desc">Meet our mentors who guide and inspire us in our journey.</p>

      <div className="mentors-carousel-wrapper">

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


        <button 
                className="scroll-arrow right-arrow" 
                onClick={() => scroll('right')} 
                aria-label="Scroll Right"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>

      </div>
    </div>
  );
};

export default Mentors;