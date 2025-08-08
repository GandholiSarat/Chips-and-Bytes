import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5001/api/events'; // ✅ fixed to http

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events. Please check if the backend is running.');
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
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        date: '',
        time: '',
        location: '',
        description: ''
      });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Error submitting event. Make sure you are authorized.');
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed.');
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditingId(event._id); // ✅ use _id instead of id
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading events...</p>}

      {!loading && !error && (
        <>
          <form className="event-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
            <input name="time" type="time" value={formData.time} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <button type="submit">{editingId ? 'Update' : 'Add'} Event</button>
          </form>

          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <ul className="event-list">
              {events.map(event => (
                <li key={event._id} className="event-item">
                  <strong>{event.title}</strong> - {event.date} at {event.time} | {event.location}
                  <p>{event.description}</p>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
