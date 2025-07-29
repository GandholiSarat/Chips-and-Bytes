import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { blogLinks } from '../../data/constants';
import './BlogsPage.css';
import '../../style.css';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBlogPreviews = async () => {
      const previews = [];
      // Get only first 5 blogs
      const firstFiveLinks = blogLinks.slice(0, 5);
      
      for (const link of firstFiveLinks) {
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

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5);
  };

  const scroll = (direction) => {
    const scrollAmount = 320;
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

  return (
    <div className="blogs-page">
      <h1 className="tab-heading">Blogs</h1>
      <p className="tab-desc">
        Read articles and tutorials written by our community members.
      </p>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
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
                        {blog.description?.slice(0, 100)}...
                      </p>
                      <a 
                        href={blog.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="blog-read-link"
                      >
                        Read Article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            )}
          </div>

          <div className="read-more-container">
            <Link to="/blogs/details" className="read-more-link">
              View All Blogs →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsPage;