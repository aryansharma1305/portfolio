import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    name: 'Full-Stack Development',
    desc: 'End-to-end web apps — React, Next.js, Node.js, Express. Dockerized deployments, secure auth, real-time features. Shipped at Jio Platforms for 1M+ users.',
    tags: ['React', 'Next.js', 'Node.js', 'Docker', 'PostgreSQL'],
    accent: '#7EC8E3',
  },
  {
    num: '02',
    name: 'Mobile App Development',
    desc: 'Cross-platform and native Android apps using Flutter, Kotlin, and Dart. Clean architecture, smooth animations, Firebase-powered backends.',
    tags: ['Flutter', 'Kotlin', 'Dart', 'Android Studio', 'Firebase'],
    accent: '#B600A8',
  },
  {
    num: '03',
    name: 'AI & LLM Engineering',
    desc: 'RAG pipelines, LLM-powered interfaces, voice assistants with STT/TTS. Production ML with TensorFlow, PyTorch, ChromaDB. Reduced runtime 45% at IIT Mandi.',
    tags: ['PyTorch', 'RAG', 'LLMs', 'FastAPI', 'ChromaDB'],
    accent: '#7621B0',
  },
  {
    num: '04',
    name: 'Computer Vision',
    desc: 'Real-time vision — facial emotion, gaze tracking, sign language recognition. OpenCV, MediaPipe, DeepFace, Whisper. Patent-filed sign-to-speech system.',
    tags: ['OpenCV', 'MediaPipe', 'DeepFace', 'Whisper', 'Python'],
    accent: '#BE4C00',
  },
  {
    num: '05',
    name: 'Accessibility & Inclusion',
    desc: 'Technology that removes barriers — sign-to-speech, voice-controlled web, AI communication tools. Building for everyone, not just the average user.',
    tags: ['IndicWav2Vec', 'TTS', 'WebRTC', 'STT', 'A11y'],
    accent: '#7EC8E3',
  },
];

const ServiceRow: React.FC<{ s: (typeof SERVICES)[0]; i: number }> = ({ s, i }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
        borderRadius: '16px',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(12,12,12,0.5)' : 'transparent',
        cursor: 'default',
        borderBottom: i === SERVICES.length - 1 ? 'none' : '1px solid rgba(12,12,12,0.1)',
      }}
    >
      {/* Number */}
      <span style={{
        fontWeight: 900,
        color: hovered ? s.accent : '#0C0C0C',
        lineHeight: 1,
        flexShrink: 0,
        fontSize: 'clamp(2.2rem, 7vw, 100px)',
        fontFamily: "'Kanit', sans-serif",
        opacity: hovered ? 1 : 0.12,
        transition: 'color 0.3s, opacity 0.3s',
        width: 'clamp(55px, 9vw, 130px)',
        textAlign: 'right',
        textShadow: hovered ? `0 0 30px ${s.accent}80` : 'none',
      }}>
        {s.num}
      </span>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '0.4rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {hovered && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{
                width: '24px', height: '2px',
                backgroundColor: s.accent,
                borderRadius: '2px',
                transformOrigin: 'left',
                boxShadow: `0 0 8px ${s.accent}`,
                flexShrink: 0,
              }}
            />
          )}
          <span style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#0C0C0C',
            fontSize: 'clamp(0.95rem, 1.9vw, 1.8rem)',
            fontFamily: "'Kanit', sans-serif",
            letterSpacing: '-0.01em',
            transition: 'color 0.3s',
          }}>
            {s.name}
          </span>
        </div>

        <span style={{
          fontWeight: 300,
          lineHeight: 1.7,
          color: '#0C0C0C',
          opacity: 0.6,
          maxWidth: '580px',
          fontSize: 'clamp(0.78rem, 1.3vw, 1.05rem)',
          fontFamily: "'Kanit', sans-serif",
        }}>
          {s.desc}
        </span>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '4px' }}>
          {s.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 11px',
              borderRadius: '999px',
              border: `1px solid ${hovered ? s.accent + '50' : 'rgba(12,12,12,0.18)'}`,
              fontSize: 'clamp(0.58rem, 0.85vw, 0.72rem)',
              fontWeight: 500,
              color: hovered ? s.accent : '#0C0C0C',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: "'Kanit', sans-serif",
              transition: 'border-color 0.3s, color 0.3s',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
      padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          color: '#0C0C0C',
          fontWeight: 900,
          textTransform: 'uppercase',
          textAlign: 'center',
          fontSize: 'clamp(3.5rem, 11vw, 140px)',
          marginBottom: 'clamp(3rem, 7vw, 6rem)',
          fontFamily: "'Kanit', sans-serif",
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        Services
      </motion.h2>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {SERVICES.map((s, i) => <ServiceRow key={s.num} s={s} i={i} />)}
      </div>
    </section>
  );
};

export default ServicesSection;
