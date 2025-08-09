import React, { useRef, useEffect, useState, useCallback } from 'react';
import './MentorsPage.css';
import '../../style.css';
import { mentors } from '../../data/constants';
import { FaLinkedin } from 'react-icons/fa';

const Mentors = () => {
  const scrollRef = useRef(null);
  const scrollCount = useRef(0);
  const intervalRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const maxLoops = 20;

  const checkScrollPosition = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 5);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const card = container.children[0];
    const cardWidth = card.offsetWidth + 24; // spacing assumption

    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });

    setTimeout(checkScrollPosition, 500);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    const getCardWidth = () => {
      if (!container.children[0]) return 0;
      const card = container.children[0];
      return card.offsetWidth + 24;
    };

    const tick = () => {
      if (!container) return;
      const cardWidth = getCardWidth();
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      if (atEnd) {
        scrollCount.current += 1;
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: 'auto' });
          checkScrollPosition();
        }, 300);

        if (scrollCount.current >= maxLoops) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setTimeout(checkScrollPosition, 500);
      }
    };

    intervalRef.current = window.setInterval(tick, 8000);

    checkScrollPosition();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    let timeout = null;
    const onResize = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        checkScrollPosition();
      }, 150);
    };
    window.addEventListener('resize', onResize);
    checkScrollPosition();
    return () => {
      window.removeEventListener('resize', onResize);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [checkScrollPosition]);

  return (
    <div className="mentors-mentor-page">
      <h1 className="tab-mentor-heading">Mentors</h1>
      <p className="tab-mentor-desc">
        Meet our mentors who guide and inspire us in our journey.
      </p>

      <div className="mentors-mentor-carousel-wrapper">
        {canScrollLeft && (
          <button
            className="mentor-scroll-btn mentor-scroll-left"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
        )}

        <div
          className="mentors-mentor-list"
          ref={(el) => {
            scrollRef.current = el;
          }}
          onScroll={checkScrollPosition}
        >
          {mentors.map((mentor, index) => (
            <div className="mentor-mentor-card" key={`${mentor.name}-${index}`}>
              <img
                src={mentor.image}
                alt={mentor.name}
                className="mentor-mentor-image"
              />
              <div className="mentor-mentor-info">
                <h2>{mentor.name}</h2>
                <p className="mentor-mentor-designation">{mentor.designation}</p>
                <p className="mentor-mentor-summary">{mentor.summary}</p>
                <a
                  className="mentor-mentor-linkedin-link"
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

        {canScrollRight && (
          <button
            className="mentor-scroll-btn mentor-scroll-right"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Mentors;

