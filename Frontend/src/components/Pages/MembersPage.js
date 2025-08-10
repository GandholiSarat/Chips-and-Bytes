/**
 * @file MembersPage.js
 * @description
 * Displays a horizontally scrollable carousel of club members.
 * Supports auto-scroll, manual navigation, and responsive design.
 * 
 * Features:
 * - Auto-scrolls through member cards with a maximum loop count.
 * - Allows manual scrolling with left/right arrows.
 * - Responsive to window resizing.
 * 
 * @component
 * @returns {JSX.Element}
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './MembersPage.css';
import '../../style.css';
import { members } from '../../data/constants';
import { FaLinkedin } from 'react-icons/fa';

const MembersPage = () => {
  const scrollRef = useRef(null);
  const scrollCount = useRef(0);
  const intervalRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const maxLoops = 20;

  /**
   * Checks and updates the scroll position state for the carousel.
   */
  const checkScrollPosition = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 5);
  }, []);

  /**
   * Scrolls the carousel left or right by one card width.
   * @param {'left'|'right'} direction
   */
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;
    const card = container.children[0];
    const cardWidth = card.offsetWidth + 24;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
    setTimeout(checkScrollPosition, 500);
  };

  // Auto-scroll setup
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

  // Responsive: update scroll position on resize
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
    <div className="members-member-page">
      <h1 className="tab-member-heading">Members</h1>
      <p className="tab-member-desc">
        Meet our members who are part of this club.
      </p>
      <div className="members-member-carousel-wrapper">
        {canScrollLeft && (
          <button
            className="member-scroll-btn member-scroll-left"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
        )}
        <div
          className="members-member-list"
          ref={(el) => {
            scrollRef.current = el;
          }}
          onScroll={checkScrollPosition}
        >
          {members.map((mentor, index) => (
            <div className="member-mentor-card" key={`${mentor.name}-${index}`}>
              <img
                src={mentor.image}
                alt={mentor.name}
                className="member-mentor-image"
              />
              <div className="member-mentor-info">
                <h2>{mentor.name}</h2>
                <p className="member-mentor-designation">{mentor.designation}</p>
                <p className="member-mentor-summary">{mentor.summary}</p>
                <a
                  className="member-linkedin-link"
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
            className="member-scroll-btn member-scroll-right"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
