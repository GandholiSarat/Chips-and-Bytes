/**
 * @file AnnouncementEdit.js
 * @description
 * Admin page for creating, editing, and deleting announcements.
 * Allows admins to manage announcement text entries.
 * 
 * Features:
 * - Fetches all announcements from the backend.
 * - Allows adding new announcements.
 * - Allows editing and deleting existing announcements.
 * - Uses JWT token from localStorage for authentication.
 * - Navigates back to the admin dashboard.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import
import './AnnouncementEdit.css';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/announcements`;

/**
 * AnnouncementEdit Component
 * 
 * Renders a form and list for managing announcements.
 * 
 * @component
 */
const AnnouncementEdit = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Add this line

  /**
   * Fetch all announcements from the backend API.
   */
  const fetchAnnouncements = async () => {
    const res = await axios.get(API_URL);
    setAnnouncements(res.data || []);
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  /**
   * Handle form submission for adding or updating an announcement.
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { text }, config);
    } else {
      await axios.post(API_URL, { text }, config);
    }
    setText('');
    setEditingId(null);
    fetchAnnouncements();
  };

  /**
   * Populate the form for editing an announcement.
   * @param {Object} a - Announcement object
   */
  const handleEdit = (a) => {
    setText(a.text);
    setEditingId(a._id);
  };

  /**
   * Delete an announcement by ID.
   * @param {string} id - Announcement ID
   */
  const handleDelete = async (id) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`${API_URL}/${id}`, config);
    fetchAnnouncements();
  };

  return (
    <div className="announcement-edit-page">
      <h1>Edit Announcements</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Announcement text"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Announcement</button>
      </form>
      <ul>
        {announcements.map(a => (
          <li key={a._id}>
            {a.text}
            <button onClick={() => handleEdit(a)}>Edit</button>
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        className="back-to-admin-btn"
        style={{ marginTop: '2rem' }}
        onClick={() => navigate('/admin/dashboard')}
      >
        Go Back to Admin Page
      </button>
    </div>
  );
};

export default AnnouncementEdit;