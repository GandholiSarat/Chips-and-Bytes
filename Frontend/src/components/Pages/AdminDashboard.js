import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const destinations = [
  ['Announcements', 'Write clear public notices, links, and visibility states.', '/admin/announcement-edit'],
  ['Upcoming events', 'Schedule events with their speaker, date, time, venue, and description.', '/admin/event-edit'],
  ['Past events', 'Maintain completed sessions and their reports or resources.', '/admin/past-events-edit'],
  ['Daily news', 'Add ordered headlines, summaries, and full reading notes by date.', '/admin/news-edit'],
  ['Projects', 'Edit project data in your browser and copy the generated source file.', '/admin/projects-edit'],
  ['Blogs', 'Edit blog data in your browser and copy the generated source file.', '/admin/blogs-edit'],
  ['Members', 'Edit member data in your browser and copy the generated source file.', '/admin/members-edit'],
  ['Mentors', 'Edit mentor data in your browser and copy the generated source file.', '/admin/mentors-edit'],
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/admin'); };
  return <main className="admin-dashboard">
    <header className="admin-dashboard__header"><p>Chips & Bytes</p><h1>Content control room</h1><span>Announcements, events, and news save to the website service. Projects, blogs, members, and mentors generate a source file you can paste into the repository.</span></header>
    <nav className="admin-nav" aria-label="Content editors"><ul>{destinations.map(([title, description, to], index) => <li key={to}><Link to={to}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div><b aria-hidden="true">↗</b></Link></li>)}</ul></nav>
    <button className="logout-btn" type="button" onClick={handleLogout}>Log out</button>
  </main>;
};
export default AdminDashboard;
