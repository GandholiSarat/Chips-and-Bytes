import React, { useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Cpu } from 'lucide-react';
import './HomePage.css';
import AboutPage from './AboutPage';
import EventsPage from './EventsPage';
import ProjectsPage from './ProjectsPage';
import BlogsPage from './BlogsPage';
import MentorsPage from './MentorsPage';
import ContactPage from './ContactPage';
import MembersPage from './MembersPage';
import { Link } from 'react-router-dom';
import { publicContentFallback } from '../../data/publicContentFallback';
import { usePublicResource } from '../../hooks/usePublicResource';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/announcements`;

const HomePage = () => {
  const { data: announcements, isRefreshing: loadingAnnouncements } = usePublicResource({
    cacheKey: 'announcements',
    url: API_URL,
    fallback: publicContentFallback.announcements,
  });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.tab-section-container'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page home-page">
      <section className="studio-hero" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-gridline hero-gridline--vertical" aria-hidden="true" />
        <div className="hero-gridline hero-gridline--horizontal" aria-hidden="true" />

        <div className="hero-copy">
          <p className="hero-kicker"><span /> Computer Architecture Club · SSSIHL</p>
          <h1 id="hero-title">Build an instinct<br />for <em>systems.</em></h1>
          <p className="hero-lede">
            A student-led lab for asking better questions about computation—then learning, building, and sharing the answers.
          </p>
          <div className="hero-actions">
            <button className="hero-action hero-action--primary" onClick={() => scrollTo('about-us')}>
              Explore the club <ArrowDownRight size={17} strokeWidth={1.8} />
            </button>
            <button className="hero-action hero-action--quiet" onClick={() => scrollTo('events-section')}>
              See what’s next
            </button>
          </div>
          <dl className="hero-index" aria-label="Club focus areas">
            <div><dt>01</dt><dd>Architecture</dd></div>
            <div><dt>02</dt><dd>Systems</dd></div>
            <div><dt>03</dt><dd>Open practice</dd></div>
          </dl>
        </div>

        <div className="hero-object" aria-hidden="true">
          <div className="hero-object__orbit hero-object__orbit--outer" />
          <div className="hero-object__orbit hero-object__orbit--inner" />
          <div className="hero-object__core"><span>C&amp;B</span><small>01 / 01</small></div>
          <div className="hero-object__marker hero-object__marker--one" />
          <div className="hero-object__marker hero-object__marker--two" />
          <p className="hero-object__caption">A field guide to how machines think</p>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true"><span /> Scroll to enter</div>
      </section>

      <section className="announcement-panel" aria-label="Latest updates">
        <p className="announcement-panel__label">Field notes / latest</p>
        <p className="announcement-panel__copy">
          {announcements.length > 0 ? announcements.map((announcement) => announcement.text).join(' · ') : 'No announcements yet.'}
        </p>
        <span className="announcement-panel__status">{loadingAnnouncements ? 'Syncing' : 'Live'}</span>
      </section>

      <div id="about-us" className="tab-section-container"><AboutPage /></div>
      <div id="members-section" className="tab-section-container"><MembersPage /></div>
      <div id="events-section" className="tab-section-container"><EventsPage /></div>
      <div id="projects-section" className="tab-section-container"><ProjectsPage /></div>
      <div id="blogs-section" className="tab-section-container"><BlogsPage /></div>
      <div id="mentors-section" className="tab-section-container"><MentorsPage /></div>
      <div id="contact-section" className="tab-section-container"><ContactPage /></div>

      <div className="admin-entry">
        <Link to="/admin" aria-label="Admin login"><Cpu size={16} /><span>Club admin</span><ArrowUpRight size={14} /></Link>
      </div>
    </div>
  );
};

export default HomePage;
