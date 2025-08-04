import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import ChipsBytesWebsite from './ChipsBytesWebsite';
import BlogsPage from './components/Pages/BlogsPage';
import BlogsDetailsPage from './components/Page-Contents/BlogsDetailsPage';
import ProjectsPage from './components/Pages/ProjectsPage';
import ProjectsDetailsPage from './components/Page-Contents/ProjectsDetailsPage';
import EventsPage from './components/Pages/EventsPage';
import EventDetailsPage from './components/Page-Contents/EventsDetailsPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Update activeTab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveTab('home');
    } else if (path.startsWith('/blogs')) {
      setActiveTab('blogs');
    } else if (path.startsWith('/projects')) {
      setActiveTab('projects');
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />
      <Routes>
        <Route path="/" element={<ChipsBytesWebsite />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/details" element={<BlogsDetailsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/details" element={<ProjectsDetailsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/details" element={<EventDetailsPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="app-container">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;