import React, { useEffect, useState } from 'react';
import './ProjectsDetailsPage.css';
import { gitLinks } from '../../data/constants';
import { FaGithub } from 'react-icons/fa';
import '../../style.css';

const ProjectsDetailsPage = () => {
  const [projectData, setProjectData] = useState([]);

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
    };

    fetchMetadata();
  }, []);

  return (
    <div className="projects-details-container">
      <h1 className="projects-heading">Project Repositories</h1>
      <p className="projects-subheading">Explore open-source work and research projects.</p>

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
            {project.image && (
              <img src={project.image} alt={project.title} className="project-image" />
            )}
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              aria-label={`GitHub link for ${project.title}`}
            >
              <FaGithub size={20} style={{ marginRight: '8px' }} />
              View Repo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsDetailsPage;
