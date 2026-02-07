import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { activeProjects } from '../../data/constants';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './ProjectsPage.css';

const ActiveProjectsPage = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

  const scroll = useCallback((direction) => {
    const scrollAmount = isMobile ? (window.innerWidth <= 375 ? 200 : 250) : 320;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, [isMobile]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = useCallback((e) => {
    if (!touchStart) return;
    const current = e.touches[0].clientX;
    const diff = touchStart - current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && canScrollRight) scroll('right');
      else if (diff < 0 && canScrollLeft) scroll('left');
      setTouchStart(null);
    }
  }, [touchStart, canScrollLeft, canScrollRight, scroll]);
  const handleTouchEnd = () => setTouchStart(null);

 

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    checkScrollPosition();
    slider.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    if (isMobile) {
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    return () => {
      slider.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      if (isMobile) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        slider.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, touchStart, canScrollLeft, canScrollRight, handleTouchMove]);

  // show only first 5 projects on the home preview
  const previewProjects = activeProjects.slice(0, 5);

  const renderAuthors = (proj) => {
    // support either `author`/`linkedin` fields or arrays `authors` with `linkedin` array/object
    if (Array.isArray(proj.authors) && proj.authors.length) {
      return proj.authors.map((a, i) => (
        <span key={i} className="author-item">
          {a.name || a}
          {a.linkedin ? (
            <a href={a.linkedin} target="_blank" rel="noreferrer" className="linkedin-icon" aria-label={`LinkedIn for ${a.name || a}`}>
              <FaLinkedin size={14} />
            </a>
          ) : null}
          {i < proj.authors.length - 1 ? ', ' : ''}
        </span>
      ));
    }
    // fallback to legacy single author fields
    return (
      <>
        {proj.author}
        {proj.linkedin ? (
          <a href={proj.linkedin} target="_blank" rel="noreferrer" className="linkedin-icon" aria-label={`LinkedIn for ${proj.author}`}>
            <FaLinkedin size={14} />
          </a>
        ) : null}
      </>
    );
  };

  return (
    <div className="Projects-page">
      <h1 className="tab-heading">Active Projects</h1>
      <p className="tab-desc">Explore active projects by our community members.</p>

      <div className="carousel-wrapper">
        {canScrollLeft && (
          <button className="scroll-arrow left-arrow" onClick={() => scroll('left')} aria-label="Scroll Left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
          </button>
        )}

        <div className={`blog-slider ${isMobile ? 'mobile-slider' : ''}`} ref={sliderRef}>
              {previewProjects.map((proj, idx) => {
            const idKey = proj.id || idx;
            return (
              <article className={`project-article ${isMobile ? 'mobile-article' : ''}`} key={idKey}>
                <header>
                  <h3 className="project-title">{proj.title}</h3>
                </header>

                <p id={`proj-desc-${idKey}`} className={`project-about clamped`}>{proj.description}</p>

                <footer className="project-meta">
                  <p className="project-author">By: {renderAuthors(proj)}</p>
                  {proj.url ? (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="repo-link" aria-label={`Repo for ${proj.title}`}>
                      <FaGithub size={20} style={{ marginRight: '8px' }} />Repo
                    </a>
                  ) : null}
                </footer>
              </article>
            );
          })}

          {/* removed More... article per request */}
        </div>

        {canScrollRight && (
          <button className="scroll-arrow right-arrow" onClick={() => scroll('right')} aria-label="Scroll Right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
          </button>
        )}
      </div>

      <div className="read-more-container">
        <Link to="/projects/active#active" className="read-more-link">View All Active Projects →</Link>
      </div>
    </div>
  );
};

export default ActiveProjectsPage;
