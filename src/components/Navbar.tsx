import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import ResumeButton from './ResumeButton';

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

const LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Navbar: React.FC = () => {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Scroll-spy: highlight the section currently in the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          transformOrigin: '0 0',
          scaleX: progress,
          background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
          zIndex: 300,
        }}
      />

      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: 'rgba(12, 12, 12, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(215, 226, 234, 0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            height: 'clamp(58px, 7vh, 72px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Brand */}
          <a
            href="#top"
            aria-label="Back to top"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #B600A8, #7621B0)',
                boxShadow: '0 0 18px rgba(182, 0, 168, 0.45)',
                display: 'grid',
                placeItems: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '0.92rem',
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              AS
            </span>
            <span
              style={{
                color: '#D7E2EA',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontSize: 'clamp(0.68rem, 1vw, 0.8rem)',
                fontFamily: "'Kanit', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Aryan Sharma
            </span>
          </a>

          {/* Desktop links */}
          <nav className="nav-desktop-only" aria-label="Primary">
            <div style={{ display: 'flex', gap: 'clamp(1.2rem, 2.4vw, 2.2rem)', alignItems: 'center' }}>
              {LINKS.map(({ label, href, id }) => (
                <a
                  key={id}
                  href={href}
                  style={{
                    position: 'relative',
                    color: active === id ? '#FFFFFF' : 'rgba(215, 226, 234, 0.55)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    fontFamily: "'Kanit', sans-serif",
                    paddingBottom: 6,
                  }}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #B600A8, #7621B0)',
                      }}
                      transition={{ duration: 0.35, ease }}
                    />
                  )}
                </a>
              ))}
            </div>
          </nav>

          <div className="nav-desktop-only" style={{ alignItems: 'center' }}>
            <ResumeButton />
          </div>

          {/* Mobile toggle */}
          <button
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid rgba(215, 226, 234, 0.22)',
              background: 'rgba(215, 226, 234, 0.05)',
              color: '#D7E2EA',
              cursor: 'pointer',
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              background: 'rgba(10, 10, 10, 0.97)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1.4rem, 4vh, 2.4rem)',
            }}
          >
            {LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.06, ease }}
                style={{
                  color: '#D7E2EA',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontSize: 'clamp(1.9rem, 9vw, 3rem)',
                  textDecoration: 'none',
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 + LINKS.length * 0.06, ease }}
            >
              <ResumeButton />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
