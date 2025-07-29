import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';
import '../../style.css'

const ProjectsPage = () => (
  <>
    <h1  className="tab-heading" >Projects</h1>
    <p className="tab-desc">Explore our projects, from simple 8-bit CPUs to advanced pipelines.</p>
    <Link to="/projects/details" className="read-more-link">
      Read more →
    </Link>
  </>
  
);

export default ProjectsPage;