import React, { useState } from 'react';
import './BlogCard.css';

const BlogCard = ({ blog, index, className = '', linkClassName, actionLabel }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className={`blog-card ${className}`.trim()}>
      <div className="card-content">
        <div className="image-container">
          {blog.image && !imageFailed ? (
            <img
              src={blog.image}
              alt=""
              className="blog-image"
              loading={index < 2 ? 'eager' : 'lazy'}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={`blog-image-fallback blog-image-fallback--${blog.accent}`} aria-hidden="true" />
          )}
          <div className="image-overlay" />
          <div className="blog-card-meta">
            <span>{blog.category}</span>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="text-content">
          <p className="blog-byline">{blog.author || 'Chips & Bytes'}</p>
          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-description">{blog.description}</p>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {actionLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7,7 17,7 17,17" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
