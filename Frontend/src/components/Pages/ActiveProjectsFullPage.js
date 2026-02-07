import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { activeProjects } from '../../data/constants';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProjectsPage from './ProjectsPage';
import './ProjectsPage.css';

const ActiveProjectsFullPage = () => {
  const location = useLocation();
  const activeRef = useRef(null);
  const archivedRef = useRef(null);

  useEffect(() => {
    // if URL contains #archived or hash from navigation, scroll to archived
    if (location.hash === '#archived') {
      setTimeout(() => {
        const el = document.getElementById('archived-projects-section') || archivedRef.current;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else if (location.hash === '#active') {
      setTimeout(() => {
        const el = document.getElementById('active-projects-section') || activeRef.current;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, [location.hash]);

  const renderAuthors = (proj) => {
    if (Array.isArray(proj.authors) && proj.authors.length) {
      return proj.authors.map((a, i) => (
        <span key={i} className="article-author-item">
          {a.name || a}
          {a.linkedin ? (
            <a href={a.linkedin} target="_blank" rel="noreferrer" className="article-linkedin" aria-label={`LinkedIn for ${a.name || a}`}>
              <FaLinkedin />
            </a>
          ) : null}
          {i < proj.authors.length - 1 ? ', ' : ''}
        </span>
      ));
    }
    return (
      <>
        {proj.author}
        {proj.linkedin && (
          <a href={proj.linkedin} target="_blank" rel="noreferrer" className="article-linkedin" aria-label={`LinkedIn for ${proj.author}`}>
            <FaLinkedin />
          </a>
        )}
      </>
    );
  };

  return (
    <div className="ActiveProjectsFull-page">
      <h1 id="active-projects-section" ref={activeRef} className="tab-heading">Active Projects</h1>

      <div ref={activeRef} className="active-projects-articles">
        {activeProjects.map(proj => (
          <article key={proj.id || proj.title} className="newspaper-article">
            <header className="article-header">
              <h2 className="article-title">{proj.title}</h2>
              <div className="article-meta">
                <span className="article-author">{renderAuthors(proj)}</span>
              </div>
            </header>

            <section className="article-body">
              <p className="article-description">{proj.description}</p>
            </section>

            <footer className="article-footer">
              {proj.url ? (
                <a href={proj.url} target="_blank" rel="noreferrer" className="repo-button">
                  <FaGithub /> <span>View Repo</span>
                </a>
              ) : null}
            </footer>
          </article>
        ))}
      </div>

      {/* Render archived projects section below active projects (moved from Home) */}
      <div className="archived-projects-inline">
        <ProjectsPage />
      </div>
    </div>
  );
};

export default ActiveProjectsFullPage;
