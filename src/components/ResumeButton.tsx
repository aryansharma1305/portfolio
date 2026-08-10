import React from 'react';

// Local copy of the resume — one-click download, no Drive dependency.
// To update: replace public/resume.pdf with the new file.
const RESUME_URL = import.meta.env.BASE_URL + 'resume.pdf';

interface ResumeButtonProps {
  style?: React.CSSProperties;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({ style }) => {
  return (
    <a
      href={RESUME_URL}
      download
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '9999px',
        border: '1.5px solid rgba(215,226,234,0.35)',
        color: '#D7E2EA',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        padding: 'clamp(9px, 1.1vw, 14px) clamp(20px, 2.5vw, 36px)',
        fontSize: 'clamp(0.65rem, 0.95vw, 0.82rem)',
        background: 'transparent',
        textDecoration: 'none',
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.2s',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(182,0,168,0.7)';
        e.currentTarget.style.background = 'rgba(182,0,168,0.08)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(182,0,168,0.2)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(215,226,234,0.35)';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Download icon */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Resume
    </a>
  );
};

export default ResumeButton;
