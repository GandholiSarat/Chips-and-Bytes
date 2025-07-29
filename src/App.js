import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChipsBytesWebsite from './ChipsBytesWebsite';
import BlogsPage from './components/Pages/BlogsPage';
import BlogsDetailsPage from './components/Page-Contents/BlogsDetailsPage';
import ProjectsPage from './components/Pages/ProjectsPage';
import ProjectsDetailsPage from './components/Page-Contents/ProjectsDetailsPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage or main layout */}
        <Route path="/" element={<ChipsBytesWebsite />} />

        {/* Blog listing */}
        <Route path="/blogs" element={<BlogsPage />} />

        {/* Blog details */}
        <Route path="/blogs/details" element={<BlogsDetailsPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/details" element={<ProjectsDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
