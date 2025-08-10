/**
 * @file BlogsDetailsPage.js
 * @description
 * Displays a horizontally scrollable carousel of featured blogs.
 * Fetches blog preview data (title, description, image, url) using the Microlink API.
 * Shows a loading spinner while fetching data.
 * Allows users to scroll through blog cards and open blog links.
 * 
 * Features:
 * - Fetches and displays blog previews from external links.
 * - Responsive carousel with left/right scroll arrows.
 * - Loading spinner while fetching data.
 * - Smooth scroll and scroll position detection.
 * 
 * @component
 * @returns {JSX.Element}
 */

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { blogLinks } from '../../data/constants';
import './BlogsDetailsPage.css';
import '../../style.css';
import { useLocation } from "react-router-dom";

const BlogsDetailsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sliderRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    /**
     * Fetches blog preview data from the Microlink API for each blog link.
     */
    const fetchBlogPreviews = async () => {
      setLoading(true);
      const previews = [];
      for (const link of blogLinks) {
        try {
          const res = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(link)}`);
          const { title, description, image, url } = res.data.data;
          previews.push({
            title,
            description,
            image: image?.url || '',
            url,
          });
        } catch (error) {
          console.error("Error fetching preview for", link, error);
        }
      }
      setBlogs(previews);
      setLoading(false);
    };
    fetchBlogPreviews();
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
  }, [blogs]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  /**
   * Loading spinner component shown while fetching blog data.
   * @returns {JSX.Element}
   */
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading amazing content...</p>
    </div>
  );

  return (
    <div className="blog-details-container">
      <div className="header-section">
        <h1 className="blog-heading">Featured Blogs</h1>
        <p className="blog-subtitle">Discover our latest insights and stories</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
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

          <div className="blog-slider" ref={sliderRef}>
            {blogs.map((blog, idx) => (
              <div className="blog-card" key={idx}>
                <div className="card-content">
                  {blog.image && (
                    <div className="image-container">
                      <img src={blog.image} alt={blog.title} className="blog-image" />
                      <div className="image-overlay"></div>
                    </div>
                  )}
                  <div className="text-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description">
                      {blog.description?.slice(0, 120)}...
                    </p>
                    <a 
                      href={blog.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="continue-link"
                    >
                      Read More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7,7 17,7 17,17"></polyline>
                      </svg>
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
      )}
    </div>
  );
};

export default BlogsDetailsPage;