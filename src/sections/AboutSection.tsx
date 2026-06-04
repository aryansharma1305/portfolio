import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const fadeFrom = (delay: number, x = 0, y = 30, duration = 0.9) => ({
  initial: { opacity: 0, x, y },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.1 } as const,
  transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const ABOUT_TEXT =
  "M.tech in Computer Science with a 9.96 CGPA. I've shipped production apps at Jio Platforms, built AI tools at IIT Mandi, and won multiple national hackathons. I love building things at the intersection of full-stack engineering and AI — from RAG pipelines to voice assistants to accessibility platforms. Let's build something that matters.";

const STATS = [
  { value: '9.96', label: 'CGPA' },
  { value: '4+', label: 'Internships' },
  { value: '6+', label: 'Projects' },
  { value: '4×', label: 'Hackathon Wins' },
];

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        backgroundColor: '#0C0C0C',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner images */}
      <motion.img
        {...fadeFrom(0.1, -80, 0, 0.9)}
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
        alt=""
        style={{ position: 'absolute', top: '6%', left: 'clamp(1rem, 4vw, 5rem)', width: 'clamp(80px, 12vw, 190px)', pointerEvents: 'none' }}
        draggable={false}
      />
      <motion.img
        {...fadeFrom(0.25, -80, 0, 0.9)}
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        alt=""
        style={{ position: 'absolute', bottom: '8%', left: 'clamp(1.5rem, 8vw, 8rem)', width: 'clamp(70px, 10vw, 160px)', pointerEvents: 'none' }}
        draggable={false}
      />
      <motion.img
        {...fadeFrom(0.15, 80, 0, 0.9)}
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
        alt=""
        style={{ position: 'absolute', top: '6%', right: 'clamp(1rem, 4vw, 5rem)', width: 'clamp(80px, 12vw, 190px)', pointerEvents: 'none' }}
        draggable={false}
      />
      <motion.img
        {...fadeFrom(0.3, 80, 0, 0.9)}
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        alt=""
        style={{ position: 'absolute', bottom: '8%', right: 'clamp(1.5rem, 8vw, 8rem)', width: 'clamp(90px, 13vw, 200px)', pointerEvents: 'none' }}
        draggable={false}
      />

      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, gap: '3rem', maxWidth: '680px', width: '100%' }}>

        {/* Heading */}
        <motion.h2
          className="hero-heading"
          {...fadeFrom(0, 0, 40)}
          style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(3.5rem, 11vw, 140px)',
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          About me
        </motion.h2>

        {/* Animated paragraph */}
        <AnimatedText
          text={ABOUT_TEXT}
          style={{
            color: '#D7E2EA',
            fontWeight: 400,
            lineHeight: 1.8,
            maxWidth: '580px',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
            fontFamily: "'Kanit', sans-serif",
          }}
        />

        {/* Stats row */}
        <motion.div
          {...fadeFrom(0.2, 0, 20)}
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                background: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Kanit', sans-serif",
                lineHeight: 1,
              }}>{value}</span>
              <span style={{
                color: 'rgba(215,226,234,0.5)',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
                fontFamily: "'Kanit', sans-serif",
              }}>{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeFrom(0.3, 0, 20)}>
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
