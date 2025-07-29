// Updated ChipsBytesWebsite.jsx with new tabs and no icons

import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Pages/HomePage';
import EventsPage from './components/Pages/EventsPage';
import ProjectsPage from './components/Pages/ProjectsPage';
import BlogsPage from './components/Pages/BlogsPage';
import MentorsPage from './components/Pages/MentorsPage';
import ContactPage from './components/Pages/ContactPage';
import './style.css';

const ChipsBytesWebsite = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'events' && <EventsPage />}
      {activeTab === 'projects' && <ProjectsPage />}
      {activeTab === 'blogs' && <BlogsPage />}
      {activeTab === 'mentors' && <MentorsPage />}
      {activeTab === 'contact' && <ContactPage />}
    </div>
  );
};

export default ChipsBytesWebsite;