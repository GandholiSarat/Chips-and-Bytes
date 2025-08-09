import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './EventEdit.css'; // reuse styles

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/pastevents`;

const PastEventsEdit = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    reportLink: '',
    resourcesLink: ''
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await axios.get(API_URL);
    setEvents(res.data || []);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData, config);
    } else {
      await axios.post(API_URL, formData, config);
    }
    setFormData({ date: '', title: '', reportLink: '', resourcesLink: '' });
    setEditingId(null);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setFormData({
      date: event.date || '',
      title: event.title || '',
      reportLink: event.reportLink || '',
      resourcesLink: event.resourcesLink || ''
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`${API_URL}/${id}`, config);
    fetchEvents();
  };

  return (
    <div className="event-edit-page">
      <h1>Edit Past Events</h1>
      <form className="event-form" onSubmit={handleSubmit}>
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="reportLink" placeholder="Report Link" value={formData.reportLink} onChange={handleChange} />
        <input name="resourcesLink" placeholder="Resources Link" value={formData.resourcesLink} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Past Event</button>
      </form>
      <div className="table-wrapper">
        <div className="table-container">
          <table className="events-table">
            <thead>
              <tr className="table-header">
                <th className="table-cell header-cell">S.No</th>
                <th className="table-cell header-cell">Date</th>
                <th className="table-cell header-cell">Event Title</th>
                <th className="table-cell header-cell">Report</th>
                <th className="table-cell header-cell">Resources</th>
                <th className="table-cell header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...events].reverse().map((event, index) => (
                <tr key={event._id} className="table-row">
                  <td className="table-cell serial-cell">{index + 1}</td>
                  <td className="table-cell date-cell">{event.date}</td>
                  <td className="table-cell title-cell">{event.title}</td>
                  <td className="table-cell link-cell">
                    {event.reportLink ? (
                      <a
                        href={event.reportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drive-link report-link"
                        aria-label={`Report for ${event.title}`}
                      >
                        <FaExternalLinkAlt size={16} />
                        Click here
                      </a>
                    ) : (
                      <span style={{ color: '#888' }}>N/A</span>
                    )}
                  </td>
                  <td className="table-cell link-cell">
                    {event.resourcesLink ? (
                      <a
                        href={event.resourcesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drive-link resources-link"
                        aria-label={`Resources for ${event.title}`}
                      >
                        <FaExternalLinkAlt size={16} />
                        Click here
                      </a>
                    ) : (
                      <span style={{ color: '#888' }}>N/A</span>
                    )}
                  </td>
                  <td className="table-cell link-cell">
                    <button
                      style={{
                        background: '#22d3ee',
                        color: '#0f172a',
                        border: 'none',
                        padding: '0.4em 1.1em',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        cursor: 'pointer',
                        marginRight: '0.5em',
                        marginBottom: '0.2em',
                        boxShadow: '0 2px 8px rgba(34, 211, 238, 0.08)',
                        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s'
                      }}
                      onMouseOver={e => { e.target.style.background = '#0ea5e9'; e.target.style.color = '#fff'; }}
                      onMouseOut={e => { e.target.style.background = '#22d3ee'; e.target.style.color = '#0f172a'; }}
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        background: '#f87171',
                        color: '#fff',
                        border: 'none',
                        padding: '0.4em 1.1em',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        cursor: 'pointer',
                        marginBottom: '0.2em',
                        boxShadow: '0 2px 8px rgba(248, 113, 113, 0.08)',
                        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s'
                      }}
                      onMouseOver={e => { e.target.style.background = '#dc2626'; }}
                      onMouseOut={e => { e.target.style.background = '#f87171'; }}
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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

export default PastEventsEdit;