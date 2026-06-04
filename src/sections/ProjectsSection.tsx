import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// CloudFront image sets — 3 sets of 3 images (reused across 6 projects)
const IMG_SETS = [
  {
    a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    c: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    c: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    c: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

const PROJECTS = [
  {
    num: '01',
    name: 'ScholarX',
    category: 'AI / Research',
    desc: 'Production-ready RAG pipeline for semantic search and Q&A over research papers. Hybrid semantic + keyword retrieval with reranking, citation grounding, and evaluation framework.',
    tech: ['Python', 'ChromaDB', 'Sentence Transformers', 'RAG'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[0],
  },
  {
    num: '02',
    name: 'Digi Buddy',
    category: 'Voice AI / Accessibility',
    desc: 'Hands-free voice-controlled web assistant. Integrates LLM reasoning with DOM parsing/manipulation and real-time STT/TTS for full accessibility.',
    tech: ['Python', 'FastAPI', 'Next.js', 'LLMs', 'STT/TTS'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[1],
  },
  {
    num: '03',
    name: 'Articulyze',
    category: 'Multimodal AI',
    desc: 'Communication analysis platform using speech, facial emotion, and gaze data. Speech-to-text, filler-word detection, time-aligned verbal–nonverbal analysis.',
    tech: ['Python', 'Flask', 'Whisper', 'DeepFace', 'MediaPipe'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[2],
  },
  {
    num: '04',
    name: 'AI Interview Prep',
    category: 'Full-Stack / AI',
    desc: 'AI-driven interview platform with real-time voice analysis, adaptive difficulty, Google STT transcription, performance feedback, and progress dashboards.',
    tech: ['Next.js', 'Node.js', 'Firebase', 'WebRTC', 'Google STT'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[0],
  },
  {
    num: '05',
    name: 'Kathanam',
    category: 'Accessibility · Patent Filed',
    desc: 'Accessibility platform for real-time sign-to-speech and speech-to-text conversion using IndicWav2Vec and TTS models. Patent application filed.',
    tech: ['React.js', 'Firebase', 'Node.js', 'IndicWav2Vec'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[1],
  },
  {
    num: '06',
    name: 'NoCodeFolio',
    category: 'No-Code / SaaS',
    desc: 'No-code portfolio builder with live visual editing, instant previews, secure auth via NextAuth, and one-click Vercel deployment with full source-code export.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase', 'Framer Motion'],
    github: 'https://github.com/AryanSharma1305',
    imgs: IMG_SETS[2],
  },
];

const TOTAL = PROJECTS.length;

const ProjectCard: React.FC<{
  project: (typeof PROJECTS)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ project, index, scrollProgress }) => {
  const targetScale = 1 - (TOTAL - 1 - index) * 0.04;
  const scale = useTransform(
    scrollProgress,
    [index / TOTAL, Math.min((index + 1) / TOTAL, 1)],
    [1, targetScale]
  );

  const cardRadius = 'clamp(24px, 3vw, 48px)';

  return (
    <div
      style={{
        height: '85vh',
        position: 'sticky',
        top: `${80 + index * 24}px`,
      }}
    >
      <motion.div
        style={{
          scale,
          height: '100%',
          borderRadius: cardRadius,
          border: '1.5px solid rgba(215,226,234,0.25)',
          backgroundColor: '#111111',
          padding: 'clamp(1rem, 2vw, 1.75rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          transformOrigin: 'top center',
          overflow: 'hidden',
        }}
      >
        {/* Card header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 2vw, 1.75rem)' }}>
            {/* Number */}
            <span style={{
              fontWeight: 900,
              background: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              fontSize: 'clamp(2.5rem, 7vw, 100px)',
              fontFamily: "'Kanit', sans-serif",
              flexShrink: 0,
            }}>
              {project.num}
            </span>
            {/* Title block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{
                color: 'rgba(215,226,234,0.45)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: 'clamp(0.55rem, 0.9vw, 0.78rem)',
                fontFamily: "'Kanit', sans-serif",
              }}>
                {project.category}
              </span>
              <span style={{
                color: '#D7E2EA',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2.2vw, 2rem)',
                fontFamily: "'Kanit', sans-serif",
                letterSpacing: '-0.01em',
              }}>
                {project.name}
              </span>
              <span style={{
                color: 'rgba(215,226,234,0.35)',
                fontWeight: 300,
                fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)',
                fontFamily: "'Kanit', sans-serif",
              }}>
                {project.tech.join(' · ')}
              </span>
            </div>
          </div>

          {/* GitHub button */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: '999px',
              border: '1.5px solid rgba(215,226,234,0.4)',
              color: '#D7E2EA',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '8px 22px',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.78rem)',
              background: 'transparent',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
              flexShrink: 0,
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(215,226,234,0.08)';
              e.currentTarget.style.borderColor = 'rgba(215,226,234,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(215,226,234,0.4)';
            }}
          >
            View on GitHub ↗
          </a>
        </div>

        {/* Description */}
        <p style={{
          color: 'rgba(215,226,234,0.55)',
          fontWeight: 300,
          fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)',
          fontFamily: "'Kanit', sans-serif",
          lineHeight: 1.65,
          flexShrink: 0,
          maxWidth: '70%',
        }}>
          {project.desc}
        </p>

        {/* Image grid */}
        <div style={{
          display: 'flex',
          gap: 'clamp(8px, 1vw, 14px)',
          flex: 1,
          minHeight: 0,
        }}>
          {/* Left col — 40% */}
          <div style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 1vw, 14px)',
          }}>
            <img
              src={project.imgs.a}
              alt={project.name}
              loading="lazy"
              style={{
                width: '100%',
                flex: '1',
                borderRadius: cardRadius,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <img
              src={project.imgs.b}
              alt={project.name}
              loading="lazy"
              style={{
                width: '100%',
                flex: '1.4',
                borderRadius: cardRadius,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Right col — 60% */}
          <img
            src={project.imgs.c}
            alt={project.name}
            loading="lazy"
            style={{
              width: '60%',
              borderRadius: cardRadius,
              objectFit: 'cover',
              display: 'block',
              flex: 1,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="section-card-dark"
      style={{
        marginTop: '-3rem',
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 3rem) clamp(5rem, 10vw, 10rem)',
      }}
    >
      <motion.h2
        className="hero-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          fontWeight: 900,
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(3.5rem, 11vw, 140px)',
          marginBottom: 'clamp(3rem, 6vw, 6rem)',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        Projects
      </motion.h2>

      <div ref={containerRef}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} scrollProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
