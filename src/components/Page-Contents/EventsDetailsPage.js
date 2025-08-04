import React, { useState } from 'react';
import './EventsDetailsPage.css';
import '../../style.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const EventDetailsPage = () => {
  // Sample data - replace with your actual data
  const [events] = useState([
    {
      id: 1,
      date: "2024-03-15",
      title: "Annual Tech Conference 2024",
      reportLink: "https://drive.google.com/file/d/1234567890",
      resourcesLink: "https://drive.google.com/drive/folders/abcdef123"
    },
    {
      id: 2,
      date: "2024-02-28",
      title: "Workshop on AI and Machine Learning",
      reportLink: "https://drive.google.com/file/d/2345678901",
      resourcesLink: "https://drive.google.com/drive/folders/bcdef1234"
    },
    {
      id: 3,
      date: "2024-02-10",
      title: "Digital Innovation Summit",
      reportLink: "https://drive.google.com/file/d/3456789012",
      resourcesLink: "https://drive.google.com/drive/folders/cdef12345"
    },
    {
      id: 4,
      date: "2024-01-20",
      title: "Startup Pitch Competition",
      reportLink: "https://drive.google.com/file/d/4567890123",
      resourcesLink: "https://drive.google.com/drive/folders/def123456"
    },
    {
      id: 5,
      date: "2024-01-05",
      title: "New Year Technology Roadmap",
      reportLink: "https://drive.google.com/file/d/5678901234",
      resourcesLink: "https://drive.google.com/drive/folders/ef1234567"
    },
    {
      id: 6,
      date: "2023-12-20",
      title: "Year-End Review and Planning Session",
      reportLink: "https://drive.google.com/file/d/6789012345",
      resourcesLink: "https://drive.google.com/drive/folders/f12345678"
    },
    {
      id: 7,
      date: "2023-11-15",
      title: "Cybersecurity Awareness Workshop",
      reportLink: "https://drive.google.com/file/d/7890123456",
      resourcesLink: "https://drive.google.com/drive/folders/g123456789"
    },
    {
      id: 8,
      date: "2023-10-30",
      title: "Halloween Hackathon 2023",
      reportLink: "https://drive.google.com/file/d/8901234567",
      resourcesLink: "https://drive.google.com/drive/folders/h1234567890"
    }
  ]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-details-container">
      <div className="header-section">
        <h1 className="event-heading">Event Details</h1>
        <p className="event-subtitle">Comprehensive overview of our events, reports, and resources</p>
      </div>

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
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id} className="table-row">
                  <td className="table-cell serial-cell">{index + 1}</td>
                  <td className="table-cell date-cell">{formatDate(event.date)}</td>
                  <td className="table-cell title-cell">{event.title}</td>
                  <td className="table-cell link-cell">
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
                  </td>
                  <td className="table-cell link-cell">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;