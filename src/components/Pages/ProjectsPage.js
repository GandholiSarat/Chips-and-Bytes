import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { gitLinks } from '../../data/constants';
import { FaGithub } from 'react-icons/fa';
import './ProjectsPage.css';
import '../../style.css';

const ProjectsPage = () => {
  const [projectData, setProjectData] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const sliderRef = useRef(null);

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 useEffect(() => {
    const fetchMetadata = async () => {
      const results = await Promise.all(
        gitLinks.map(async (linkObj) => {
          try {
            const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(linkObj.url)}`);
            const json = await response.json();
            const { title, description, image, url } = json.data;

            return {
              title: title || linkObj.title,
              description: description || linkObj.description,
              image: image?.url || null,
              url: url || linkObj.url,
            };
          } catch (err) {
            console.error(`Failed to fetch metadata for ${linkObj.url}`, err);
            return { ...linkObj };
          }
        })
      );
      setProjectData(results);
      setLoading(false); 
    };

    fetchMetadata();
  }, []);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

  const scroll = (direction) => {
    const scrollAmount = isMobile ? (window.innerWidth <= 375 ? 200 : 250) : 320;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && canScrollRight) {
        scroll('right');
      } else if (diff < 0 && canScrollLeft) {
        scroll('left');
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkScrollPosition();
    slider.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    // Add touch event listeners for mobile
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
  }, [projectData, isMobile, touchStart, canScrollLeft, canScrollRight]);

  return (
    <div className="Projects-page">
      <h1 className="tab-heading">Projects</h1>
      <p className="tab-desc">
        Read articles and tutorials written by our community members.
      </p>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Projects...</p>
        </div>
      ) : (
        <>
          <div className="carousel-wrapper">
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

            <div 
              className={`blog-slider ${isMobile ? 'mobile-slider' : ''}`} 
              ref={sliderRef}
            >
              {projectData.map((Projects, idx) => (
                <div className={`blog-card ${isMobile ? 'mobile-card' : ''}`} key={idx}>
                  <div className="card-content">
                    {Projects.image && (
                      <div className="image-container">
                        <img src={Projects.image} alt={Projects.title} className="blog-image" />
                        <div className="image-overlay"></div>
                      </div>
                    )}
                    <div className="text-content">
                      <h3 className="blog-title">{Projects.title}</h3>
                      <p className="blog-description">
                        {Projects.description?.slice(0, isMobile ? 80 : 100)}...
                      </p>
                      <a
                                    href={Projects.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                    aria-label={`GitHub link for ${Projects.title}`}
                                  >
                                    <FaGithub size={20} style={{ marginRight: '8px' }} />
                                    View Repo
                                  </a>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* More... card */}
              <div className={`blog-card more-card ${isMobile ? 'mobile-card' : ''}`}>
                <Link to="/Projects/details" className="more-card-link">
                  <div className="card-content more-card-content">
                    <div className="more-card-inner">
                      <div className="more-icon">
                        <svg width={isMobile ? "50" : "70"} height={isMobile ? "50" : "70"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3"></circle>
                          <circle cx="12" cy="5" r="3"></circle>
                          <circle cx="12" cy="19" r="3"></circle>
                        </svg>
                      </div>
                      <h3 className="more-title">More...</h3>
                      <p className="more-description">
                        {isMobile ? "Explore more content" : "Explore all our Projects and discover more amazing content"}
                      </p>
                      <div className="more-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7,7 17,7 17,17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

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
          </div>

          {/* Mobile swipe hint */}
          {/* {isMobile && (
            <div className="mobile-swipe-hint">
              <p className="swipe-hint">← Swipe to explore →</p>
            </div>
          )} */}

          <div className="read-more-container">
            <Link to="/Projects/details" className="read-more-link">
              View All Projects →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;