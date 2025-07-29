import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {blogLinks} from '../../data/constants'; // adjust path as needed
import './BlogsDetailsPage.css';
import '../../style.css';

const BlogsDetailsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogPreviews = async () => {
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
    };

    fetchBlogPreviews();
  }, []);

  return (
    <div className="blog-details-container">
      <h1 className="blog-heading">Featured Blogs</h1>
      <div className="blog-cards">
        {blogs.map((blog, idx) => (
          <div className="blog-card" key={idx}>
            {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description?.slice(0, 100)}...</p>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="continue-link">
                Continue Reading →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsDetailsPage;
