import React from 'react';

interface LiveProjectButtonProps {
  href: string;
  label?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href, label = 'Live Demo' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-link project-link-live"
    >
      {label}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
};

export default LiveProjectButton;
