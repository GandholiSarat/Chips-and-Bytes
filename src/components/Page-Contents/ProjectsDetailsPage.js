import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { gitLinks } from '../../data/constants';
import './ProjectsDetailsPage.css';
import '../../style.css';
import { FaGithub } from 'react-icons/fa';

const ProjectsDetailsPage = () => {
  const [projects, setProjects] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProjectPreviews = async () => {
      const previews = [];
      for (const linkObj of gitLinks) {
        try {
          const res = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(linkObj.url)}`);
          const { title, description, image, url } = res.data.data;
          previews.push({
            title: title || linkObj.title,
            description: description || linkObj.description,
            image: image?.url || '',
            url: url || linkObj.url,
          });
        } catch (error) {
          console.error("Error fetching preview for", linkObj.url, error);
          // Fallback to original data if API fails
          previews.push({
            title: linkObj.title,
            description: linkObj.description,
            image: '',
            url: linkObj.url,
          });
        }
      }
      setProjects(previews);
    };
    fetchProjectPreviews();
  }, []);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

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
                    <img src={project.image} alt={project.title} className="project-image" />
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
                                    className="continue-link"
                                    aria-label={`GitHub link for ${project.title}`}
                                  >
                                    <FaGithub size={20} style={{ marginRight: '8px' }} />
                                    View Repo
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