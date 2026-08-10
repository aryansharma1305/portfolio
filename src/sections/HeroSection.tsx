import React from 'react';
import { motion } from 'framer-motion';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

const f = (delay: number, y = 0, x = 0) => ({
  initial: { opacity: 0, y, x },
  animate: { opacity: 1, y: 0, x: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const ROLES = ['Full-Stack Dev', 'AI Engineer', 'App Developer', 'ML Researcher'];

const HeroSection: React.FC = () => {
  const [roleIdx, setRoleIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" style={{
      height: '100vh',
      minHeight: '620px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#0C0C0C',
      /* keep content clear of the fixed navbar */
      paddingTop: 'clamp(58px, 7vh, 72px)',
    }}>

      {/* subtle radial glow behind portrait */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '55%',
        transform: 'translate(-50%,-50%)',
        width: 'clamp(300px, 55vw, 700px)',
        height: 'clamp(300px, 55vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(118,33,176,0.18) 0%, rgba(182,0,168,0.08) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Heading ── */}
      <div style={{ overflow: 'hidden', flexShrink: 0, zIndex: 2, position: 'relative' }}>
        <motion.h1 {...f(0.12, 60)} className="hero-heading" style={{
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          lineHeight: 0.88,
          whiteSpace: 'nowrap',
          /*
            Kanit 900 uppercase has ~0.52 aspect ratio per char.
            "HI, I'M ARYAN" = 14 chars incl spaces.
            At 13.5vw: 13.5 × 14 × 0.52 ≈ 98vw → just fits with a small bleed.
          */
          fontSize: 'clamp(2.8rem, 13.2vw, 16rem)',
          paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
          fontFamily: "'Kanit', sans-serif",
        }}>
          Hi, i&apos;m aryan
        </motion.h1>
      </div>

      {/* ── Rotating role badge ── */}
      <motion.div {...f(0.28)} style={{
        paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
        zIndex: 2,
        position: 'relative',
        marginTop: '0.6rem',
      }}>
        <motion.span
          key={roleIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(215,226,234,0.6)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 'clamp(0.65rem, 1vw, 0.95rem)',
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #B600A8, #7621B0)',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(182,0,168,0.7)',
          }} />
          {ROLES[roleIdx]}
        </motion.span>
      </motion.div>

      {/* ── Portrait ── */}
      <motion.div {...f(0.55, 30)} style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 0,
        zIndex: 10,
        width: 'clamp(210px, 32vw, 480px)',
      }}>
        <Magnet padding={150} strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={import.meta.env.BASE_URL + 'images/portrait.png'}
            alt="Aryan Sharma"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            draggable={false}
            fetchPriority="high"
          />
        </Magnet>
      </motion.div>

      <div style={{ flex: 1 }} />

      {/* ── Bottom bar ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 clamp(1.25rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
        position: 'relative',
        zIndex: 20,
        flexShrink: 0,
      }}>
        <motion.p {...f(0.32, 18)} style={{
          color: 'rgba(215,226,234,0.55)',
          fontWeight: 300,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          lineHeight: 1.55,
          fontSize: 'clamp(0.6rem, 0.95vw, 0.88rem)',
          maxWidth: '200px',
          fontFamily: "'Kanit', sans-serif",
        }}>
          full-stack · ai · mobile<br />crafting things that matter
        </motion.p>

        <motion.div {...f(0.45, 18)}>
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
