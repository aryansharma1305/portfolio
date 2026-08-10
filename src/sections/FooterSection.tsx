import React from 'react';
import { motion } from 'framer-motion';
import ContactButton from '../components/ContactButton';
import ResumeButton from '../components/ResumeButton';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/AryanSharma1305',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aryan-sharma-175abb24a',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:sharmaaryan237@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const FooterSection: React.FC = () => {
  return (
    <section id="contact" style={{
      backgroundColor: '#0C0C0C',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* big ambient glow */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%,-50%)',
        width: 'clamp(400px, 70vw, 900px)',
        height: 'clamp(300px, 50vw, 600px)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(118,33,176,0.12) 0%, rgba(182,0,168,0.06) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* CTA */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        marginBottom: 'clamp(4rem, 7vw, 7rem)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            fontSize: 'clamp(3.5rem, 10vw, 130px)',
            color: '#D7E2EA',
            fontFamily: "'Kanit', sans-serif",
            marginBottom: '0.5rem',
          }}>
            Let&apos;s work
          </h2>
          <h2 style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            fontSize: 'clamp(3.5rem, 10vw, 130px)',
            fontFamily: "'Kanit', sans-serif",
            background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            together
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: 'rgba(215,226,234,0.45)',
            fontWeight: 300,
            fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)',
            maxWidth: '420px',
            lineHeight: 1.75,
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          Open to full-time SWE / ML roles, research collaborations,<br />
          and impactful freelance projects.<br />
          <a href="tel:+919418651964" style={{ color: 'rgba(215,226,234,0.6)', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block' }}>
            +91 94186 51964
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <ContactButton label="Get in touch" href="mailto:sharmaaryan237@gmail.com" />
          <ResumeButton />

          {/* Social icon buttons */}
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1.5px solid rgba(215,226,234,0.2)',
                color: 'rgba(215,226,234,0.5)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(215,226,234,0.6)';
                e.currentTarget.style.color = '#D7E2EA';
                e.currentTarget.style.background = 'rgba(215,226,234,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(215,226,234,0.2)';
                e.currentTarget.style.color = 'rgba(215,226,234,0.5)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderTop: '1px solid rgba(215,226,234,0.07)',
        paddingTop: '2rem',
        position: 'relative',
        zIndex: 2,
      }}>
        <span style={{
          color: 'rgba(215,226,234,0.2)',
          fontSize: '0.72rem',
          fontFamily: "'Kanit', sans-serif",
          fontWeight: 300,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          © {new Date().getFullYear()} Aryan Sharma · SRM STECH · 9.96 CGPA
        </span>

        <span style={{
          color: 'rgba(215,226,234,0.2)',
          fontSize: '0.72rem',
          fontFamily: "'Kanit', sans-serif",
          fontWeight: 300,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Built with React · TypeScript · Framer Motion
        </span>
      </div>
    </section>
  );
};

export default FooterSection;
