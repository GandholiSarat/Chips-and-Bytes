/**
 * @file ProjectsDetailsPage.js
 * @description
 * Displays a horizontally scrollable carousel of featured projects.
 * Fetches project preview data (title, description, image, url) using the Microlink API.
 * Allows users to scroll through project cards and open GitHub links.
 * 
 * Features:
 * - Fetches and displays project previews from external links.
 * - Responsive carousel with left/right scroll arrows.
 * - Smooth scroll and scroll position detection.
 * 
 * @component
 * @returns {JSX.Element}
 */

import React, { useEffect, useState, useRef } from 'react';
import { gitLinks } from '../../data/constants';
import './ProjectsDetailsPage.css';
import '../../style.css';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

const ProjectsDetailsPage = () => {
  const [projects, setProjects] = useState(gitLinks);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    /**
     * Fetches project preview data from the Microlink API for each project link.
     */
    const fetchProjectPreviews = async () => {
      const previews = await Promise.all(gitLinks.map(async (linkObj) => {
        try {
          const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(linkObj.url)}`);
          const payload = await response.json();
          const { title, description, image } = payload.data || {};
          return {
            title: title || linkObj.title,
            description: description || linkObj.description,
            image: image?.url || '',
            url: linkObj.url,
          };
        } catch (error) {
          console.error("Error fetching preview for", linkObj.url, error);
          return { ...linkObj };
        }
      }));
      setProjects(previews);
    };
    fetchProjectPreviews();
  }, []);

  /**
   * Checks and updates the scroll position state for the carousel.
   */
  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

  /**
   * Scrolls the carousel left or right by a fixed amount.
   * @param {'left'|'right'} direction
   */
  const scroll = (direction) => {
    const scrollAmount = 350;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkScrollPosition();
    slider.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      slider.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [projects]);

  return (
    <div className="project-details-container">
      <div className="header-section">
        <h1 className="project-heading">Featured Projects</h1>
        <p className="project-subtitle">Explore our latest open-source work and research projects</p>
      </div>

      <div className="carousel-wrapper">
        {canScrollLeft && (
          <button 
            className="scroll-arrow left-arrow" 
            onClick={() => scroll('left')} 
            aria-label="Scroll Left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
        )}

        <div className="project-slider" ref={sliderRef}>
          {projects.map((project, idx) => (
            <div className="project-card" key={idx}>
              <div className="card-content">
                {project.image && (
                  <div className="image-container">
                    <img src={project.image} alt={project.title} className="project-image" loading="lazy" decoding="async" />
                    <div className="image-overlay"></div>
                  </div>
                )}
                <div className="text-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {project.description?.slice(0, 120)}...
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-repo-link project-external-link"
                    aria-label={`GitHub link for ${project.title}`}
                  >
                    <FaGithub size={19} aria-hidden="true" />
                    <span className="project-link-copy">
                      <strong>View repository</strong>
                      <small>github.com</small>
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button 
            className="scroll-arrow right-arrow" 
            onClick={() => scroll('right')} 
            aria-label="Scroll Right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectsDetailsPage;
