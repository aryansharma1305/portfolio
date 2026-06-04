import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SKILL_GROUPS = [
  {
    title: 'Languages',
    icon: '{ }',
    color: '#7EC8E3',
    glow: 'rgba(126,200,227,0.25)',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript / TS', level: 92 },
      { name: 'Java', level: 80 },
      { name: 'Kotlin', level: 72 },
      { name: 'Dart', level: 68 },
      { name: 'C++', level: 75 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    title: 'Web & Mobile',
    icon: '⬡',
    color: '#B600A8',
    glow: 'rgba(182,0,168,0.25)',
    skills: [
      { name: 'React / Next.js', level: 94 },
      { name: 'Node / Express', level: 90 },
      { name: 'Flutter', level: 70 },
      { name: 'Android Studio', level: 68 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Firebase', level: 88 },
    ],
  },
  {
    title: 'AI / ML',
    icon: '◈',
    color: '#7621B0',
    glow: 'rgba(118,33,176,0.25)',
    skills: [
      { name: 'PyTorch / TF', level: 85 },
      { name: 'OpenCV', level: 88 },
      { name: 'MediaPipe', level: 84 },
      { name: 'LLMs / RAG', level: 86 },
      { name: 'Whisper / STT', level: 80 },
      { name: 'ChromaDB', level: 78 },
      { name: 'DeepFace', level: 76 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '⚙',
    color: '#BE4C00',
    glow: 'rgba(190,76,0,0.25)',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Docker', level: 78 },
      { name: 'CI/CD', level: 74 },
      { name: 'GCP', level: 70 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 80 },
      { name: 'Figma', level: 72 },
    ],
  },
];

const ACHIEVEMENTS = [
  { emoji: '🏆', text: '3rd Prize — TechXcelerate Hyderabad (SaaS)', color: '#FFD700' },
  { emoji: '🥉', text: '3rd Place — Team SRM Hackathon 9.0 (200+ teams)', color: '#CD7F32' },
  { emoji: '🥈', text: 'Runners-up — Aarush Hackathon 2024', color: '#C0C0C0' },
  { emoji: '🏅', text: 'Winner — HackRush 1.0, Qwiklabs SRMIST', color: '#FFD700' },
  { emoji: '🎓', text: 'Merit Scholarship — Academic Excellence', color: '#7EC8E3' },
  { emoji: '📄', text: 'Patent Filed — AI Sign-to-Speech System', color: '#B600A8' },
  { emoji: '📰', text: 'Published — Patient Readmission Prediction (IJRCSE 2025)', color: '#7621B0' },
];

// Animated skill bar
const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number }> = ({
  name, level, color, delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.5'] });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', `${level}%`]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          color: 'rgba(215,226,234,0.8)',
          fontSize: 'clamp(0.7rem, 1.1vw, 0.88rem)',
          fontWeight: 500,
          fontFamily: "'Kanit', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>{name}</span>
        <span style={{
          color: color,
          fontSize: '0.7rem',
          fontWeight: 700,
          fontFamily: "'Kanit', sans-serif",
        }}>{level}%</span>
      </div>
      <div style={{
        height: '4px',
        borderRadius: '4px',
        backgroundColor: 'rgba(215,226,234,0.08)',
        overflow: 'hidden',
      }}>
        <motion.div style={{
          height: '100%',
          width,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          borderRadius: '4px',
          boxShadow: `0 0 8px ${color}60`,
        }} transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </div>
  );
};

const SkillCard: React.FC<{ group: (typeof SKILL_GROUPS)[0]; cardIndex: number }> = ({ group, cardIndex }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay: cardIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{
      backgroundColor: '#0F0F0F',
      border: `1px solid ${group.color}25`,
      borderRadius: '24px',
      padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Glow corner */}
    <div style={{
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${group.glow}, transparent 70%)`,
      pointerEvents: 'none',
    }} />

    {/* Card header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{
        fontSize: '1.5rem',
        color: group.color,
        fontWeight: 900,
        lineHeight: 1,
        fontFamily: 'monospace',
      }}>{group.icon}</span>
      <span style={{
        color: '#D7E2EA',
        fontWeight: 700,
        fontSize: 'clamp(0.95rem, 1.5vw, 1.3rem)',
        fontFamily: "'Kanit', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>{group.title}</span>
    </div>

    {/* Skill bars */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {group.skills.map((sk, i) => (
        <SkillBar
          key={sk.name}
          name={sk.name}
          level={sk.level}
          color={group.color}
          delay={cardIndex * 0.08 + i * 0.05}
        />
      ))}
    </div>
  </motion.div>
);

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" style={{
      backgroundColor: '#0C0C0C',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3.5rem)',
    }}>

      {/* Heading */}
      <motion.h2
        className="hero-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontWeight: 900,
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(3.5rem, 11vw, 140px)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        Skills
      </motion.h2>

      {/* Skill grid — 2 columns on wide, 1 on mobile */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45%, 520px), 1fr))',
        gap: 'clamp(1rem, 2vw, 1.75rem)',
        marginBottom: 'clamp(4rem, 7vw, 7rem)',
      }}>
        {SKILL_GROUPS.map((g, i) => (
          <SkillCard key={g.title} group={g} cardIndex={i} />
        ))}
      </div>

      {/* ── Achievements marquee strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p style={{
          color: 'rgba(215,226,234,0.3)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.68rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontFamily: "'Kanit', sans-serif",
        }}>
          Achievements &amp; Recognition
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                borderRadius: '14px',
                backgroundColor: '#0F0F0F',
                border: `1px solid ${a.color}18`,
              }}
            >
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{a.emoji}</span>
              <span style={{
                color: 'rgba(215,226,234,0.7)',
                fontWeight: 400,
                fontSize: 'clamp(0.78rem, 1.2vw, 0.95rem)',
                fontFamily: "'Kanit', sans-serif",
                lineHeight: 1.4,
              }}>{a.text}</span>
              <div style={{
                marginLeft: 'auto',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: a.color,
                flexShrink: 0,
                boxShadow: `0 0 8px ${a.color}`,
              }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
