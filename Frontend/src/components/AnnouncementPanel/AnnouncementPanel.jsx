import React from 'react';
import './AnnouncementPanel.css';

const AnnouncementPanel = ({ announcements = [] }) => {
  const visible = Array.isArray(announcements) ? announcements.filter((item) => item && item.isActive !== false) : [];
  if (!visible.length) return null;
  return <section className="announcement-panel" aria-labelledby="announcement-heading">
    <header><p>Club notices</p><h2 id="announcement-heading">Announcements</h2></header>
    <div className="announcement-panel__list">{visible.map((item) => <article key={item._id || item.text} className="announcement-panel__item"><span>{item.category || 'notice'}</span><div><h3>{item.title || 'Chips & Bytes update'}</h3><p>{item.message || item.text}</p>{item.actionUrl && <a href={item.actionUrl} target={item.actionUrl.startsWith('http') ? '_blank' : undefined} rel={item.actionUrl.startsWith('http') ? 'noreferrer' : undefined}>{item.actionLabel || 'Learn more'} <b aria-hidden="true">↗</b></a>}</div></article>)}</div>
  </section>;
};
export default AnnouncementPanel;
