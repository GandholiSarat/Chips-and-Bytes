/**
 * @file EventEdit.js
 * @description
 * Admin page for creating, editing, and deleting events.
 * Allows admins to manage event details such as title, speaker, date, time, location, and description.
 * 
 * Features:
 * - Fetches all events from the backend.
 * - Allows adding new events.
 * - Allows editing and deleting existing events.
 * - Uses JWT token from localStorage for authentication.
 * - Navigates back to the admin dashboard.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventEdit.css';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/events`;

/**
 * EventEdit Component
 * 
 * Renders a form and list for managing events.
 * 
 * @component
 */
const EventEdit = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  /**
   * Fetch all events from the backend API.
   */
  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data || []);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError('You are not authorized. Please login.');
      return;
    }
    fetchEvents();
    // eslint-disable-next-line
  }, [token]);

  /**
   * Handle input changes for the event form.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission for adding or updating an event.
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('No token. Please login again.');

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({
        title: '',
        speaker: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      setError('Failed to save event.');
    }
  };

  /**
   * Populate the form for editing an event.
   * @param {Object} event - Event object
   */
  const handleEdit = (event) => {
    setFormData({
      title: event.title || '',
      speaker: event.speaker || '',
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
      time: event.time || '',
      location: event.location || '',
      description: event.description || ''
    });
    setEditingId(event._id);
  };

  /**
   * Delete an event by ID.
   * @param {string} _id - Event ID
   */
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      setError('Delete failed.');
    }
  };

  return (
    <div className="event-edit-page">
      <h1>Edit Events</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading events...</p>}

      {!loading && !error && (
        <>
          <form className="event-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="speaker" placeholder="Speaker" value={formData.speaker} onChange={handleChange} required />
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
            <input name="time" type="time" value={formData.time} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <button type="submit">{editingId ? 'Update' : 'Add'} Event</button>
          </form>

          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="events-wrapper">
              <div className="events-grid">
                {events.map(event => (
                  <div className="event-card neon-glow" key={event._id}>
                    <div className="event-card-header">
                      <h2 className="event-title">{event.title}</h2>
                      <span className="event-speaker">by {event.speaker}</span>
                    </div>
                    <div className="event-card-body">
                      <div className="event-meta">
                        <span className="event-date">🗓️ {new Date(event.date).toISOString().slice(0, 10)}</span>
                        <span className="event-time">🕒 {event.time}</span>
                        <span className="event-location">📍 {event.location}</span>
                      </div>
                      <p className="event-description">{event.description}</p>
                      <div className="admin-actions">
                        <button type="button" onClick={() => handleEdit(event)}>Edit</button>
                        <button type="button" onClick={() => handleDelete(event._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
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

export default EventEdit;