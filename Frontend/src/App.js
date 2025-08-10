/**
 * @file App.js
 * @description
 * Main entry point for the Chips & Bytes React application.
 * Sets up routing for all pages, including public and admin routes.
 * Handles navigation, active tab state, and renders the Navbar and Footer.
 * 
 * Features:
 * - Client-side routing using react-router-dom.
 * - Dynamic active tab highlighting in the Navbar.
 * - Protected admin routes using JWT authentication.
 * - Renders all main pages and admin edit pages.
 * 
 * @component
 * @returns {JSX.Element}
 */

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
import Footer from './components/Footer/Footer';
import AdminLogin from './components/Pages/AdminLogin';
import AdminDashboard from './components/Pages/AdminDashboard';
import EventEdit from './components/AdminPages/EventEdit';
import PastEventsEdit from './components/AdminPages/PastEventsEdit';
import AnnouncementEdit from './components/AdminPages/AnnouncementEdit';
import ProtectedRoute from './components/Auth/ProtectedRoute';

/**
 * AppContent Component
 * 
 * Handles the main layout, routing, and active tab state.
 * 
 * @component
 * @returns {JSX.Element}
 */
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<ChipsBytesWebsite />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/details" element={<BlogsDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/details" element={<ProjectsDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/details" element={<EventDetailsPage />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/event-edit"
            element={
              <ProtectedRoute>
                <EventEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/past-events-edit"
            element={
              <ProtectedRoute>
                <PastEventsEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcement-edit"
            element={
              <ProtectedRoute>
                <AnnouncementEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

/**
 * App Component
 * 
 * Wraps the application in a Router and renders AppContent.
 * 
 * @component
 * @returns {JSX.Element}
 */
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