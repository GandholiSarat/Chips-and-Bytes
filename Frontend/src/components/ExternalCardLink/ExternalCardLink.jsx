import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ExternalCardLink.css';

const ExternalCardLink = ({ href, ariaLabel, icon, label, host, className = '' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`external-card-link ${className}`.trim()}
    aria-label={ariaLabel}
  >
    <span className="external-card-link__icon" aria-hidden="true">{icon}</span>
    <span className="external-card-link__copy">
      <strong>{label}</strong>
      <small>{host}</small>
    </span>
    <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
  </a>
);

export default ExternalCardLink;
