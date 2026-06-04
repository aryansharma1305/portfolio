import React from 'react';

interface ContactButtonProps {
  label?: string;
  href?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Contact Me',
  href = 'mailto:sharmaaryan237@gmail.com',
}) => {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        borderRadius: '9999px',
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
        color: 'white',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        padding: 'clamp(10px, 1.2vw, 16px) clamp(24px, 3vw, 48px)',
        fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {label}
    </a>
  );
};

export default ContactButton;
