import React from 'react';

const LiveProjectButton: React.FC = () => {
  return (
    <button
      style={{
        borderRadius: '9999px',
        border: '2px solid #D7E2EA',
        color: '#D7E2EA',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        padding: '10px 28px',
        fontSize: '0.85rem',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'background 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(215,226,234,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      Live Project
    </button>
  );
};

export default LiveProjectButton;
