import React from 'react';
import './BlogCard.css';

const BlogCard = ({ blog, index, className = '', linkClassName, actionLabel }) => (
  <article className={`blog-card ${className}`.trim()}>
    <div className="card-content">
      <div className={`blog-visual blog-visual--${blog.accent}`} aria-hidden="true">
        <span className="blog-visual-label">C&B / {blog.category}</span>
        <span className="blog-visual-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="blog-visual-orbit" />
      </div>
      <div className="text-content">
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

export default BlogCard;
