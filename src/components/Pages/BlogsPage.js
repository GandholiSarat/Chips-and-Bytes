import React from 'react';
import { Link } from 'react-router-dom';
import './BlogsPage.css';
import '../../style.css';

const BlogsPage = () => (
  <>
    <h1 className="tab-heading">Blogs</h1>
    <p className="tab-desc">
      Read articles and tutorials written by our community members.
    </p>
    <Link to="/blogs/details" className="read-more-link">
      Read more →
    </Link>
  </>
);

export default BlogsPage;