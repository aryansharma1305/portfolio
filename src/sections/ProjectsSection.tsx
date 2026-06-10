import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type ProjectVisual = {
  eyebrow: string;
  title: string;
  accent: string;
  secondary: string;
  metrics: string[];
  chips: string[];
};

const PROJECTS = [
  {
    num: '01',
    name: 'ScholarX',
    category: 'AI / Research',
    desc: 'Production-ready RAG pipeline for semantic search and Q&A over research papers. Hybrid semantic + keyword retrieval with reranking, citation grounding, and evaluation framework.',
    tech: ['Python', 'ChromaDB', 'Sentence Transformers', 'RAG'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Citation-grounded RAG',
      title: 'Semantic paper search',
      accent: '#79d8ff',
      secondary: '#a7f3d0',
      metrics: ['Hybrid retrieval', 'Reranking', 'Eval suite'],
      chips: ['PDF chunks', 'Vector store', 'Answer trace'],
    },
  },
  {
    num: '02',
    name: 'Digi Buddy',
    category: 'Voice AI / Accessibility',
    desc: 'Hands-free voice-controlled web assistant. Integrates LLM reasoning with DOM parsing/manipulation and real-time STT/TTS for full accessibility.',
    tech: ['Python', 'FastAPI', 'Next.js', 'LLMs', 'STT/TTS'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Voice-first control',
      title: 'Speak, parse, act',
      accent: '#f7c948',
      secondary: '#fb7185',
      metrics: ['Realtime STT', 'DOM actions', 'TTS loop'],
      chips: ['Intent map', 'Page state', 'Action plan'],
    },
  },
  {
    num: '03',
    name: 'Articulyze',
    category: 'Multimodal AI',
    desc: 'Communication analysis platform using speech, facial emotion, and gaze data. Speech-to-text, filler-word detection, time-aligned verbal-nonverbal analysis.',
    tech: ['Python', 'Flask', 'Whisper', 'DeepFace', 'MediaPipe'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Speech + expression',
      title: 'Communication analysis',
      accent: '#c084fc',
      secondary: '#38bdf8',
      metrics: ['Filler words', 'Gaze sync', 'Emotion trend'],
      chips: ['Transcript', 'Face cues', 'Timeline'],
    },
  },
  {
    num: '04',
    name: 'AI Interview Prep',
    category: 'Full-Stack / AI',
    desc: 'AI-driven interview platform with real-time voice analysis, adaptive difficulty, Google STT transcription, performance feedback, and progress dashboards.',
    tech: ['Next.js', 'Node.js', 'Firebase', 'WebRTC', 'Google STT'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Adaptive interview room',
      title: 'Realtime practice dashboard',
      accent: '#60a5fa',
      secondary: '#f97316',
      metrics: ['Voice score', 'Adaptive Qs', 'Progress'],
      chips: ['Session', 'Feedback', 'Readiness'],
    },
  },
  {
    num: '05',
    name: 'Kathanam',
    category: 'Accessibility / Patent Filed',
    desc: 'Accessibility platform for real-time sign-to-speech and speech-to-text conversion using IndicWav2Vec and TTS models. Patent application filed.',
    tech: ['React.js', 'Firebase', 'Node.js', 'IndicWav2Vec'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Accessible communication',
      title: 'Sign, speech, text',
      accent: '#34d399',
      secondary: '#f9a8d4',
      metrics: ['Sign input', 'Speech output', 'Indic STT'],
      chips: ['Caption', 'Gesture', 'Translate'],
    },
  },
  {
    num: '06',
    name: 'NoCodeFolio',
    category: 'No-Code / SaaS',
    desc: 'No-code portfolio builder with live visual editing, instant previews, secure auth via NextAuth, and one-click Vercel deployment with full source-code export.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase', 'Framer Motion'],
    github: 'https://github.com/AryanSharma1305',
    visual: {
      eyebrow: 'Portfolio builder',
      title: 'Design, preview, deploy',
      accent: '#f472b6',
      secondary: '#22d3ee',
      metrics: ['Live editor', 'Export code', 'Deploy'],
      chips: ['Canvas', 'Theme', 'Publish'],
    },
  },
];

const TOTAL = PROJECTS.length;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);

    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

const ProjectMockup: React.FC<{
  visual: ProjectVisual;
  projectName: string;
  index: number;
}> = ({ visual, projectName, index }) => {
  const bars = [72, 48, 86, 58, 78];

  return (
    <motion.div
      className="project-visual"
      style={{
        '--project-accent': visual.accent,
        '--project-secondary': visual.secondary,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="project-visual-topbar">
        <span />
        <span />
        <span />
      </div>

      <div className="project-visual-main">
        <div className="project-visual-copy">
          <span>{visual.eyebrow}</span>
          <strong>{visual.title}</strong>
        </div>

        <div className="project-visual-orbit" aria-hidden="true">
          <motion.div
            className="project-visual-core"
            animate={{ rotate: 360 }}
            transition={{ duration: 16 + index, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="project-visual-ring"
            animate={{ rotate: -360 }}
            transition={{ duration: 22 + index, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="project-visual-metrics" aria-label={`${projectName} project highlights`}>
        {visual.metrics.map((metric, metricIndex) => (
          <motion.div
            key={metric}
            className="project-visual-metric"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 + metricIndex * 0.08 }}
          >
            <span>{metric}</span>
            <i style={{ width: `${bars[(index + metricIndex) % bars.length]}%` }} />
          </motion.div>
        ))}
      </div>

      <div className="project-visual-chips">
        {visual.chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{
  project: (typeof PROJECTS)[0];
  index: number;
  isCompact: boolean;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ project, index, isCompact, scrollProgress }) => {
  const reduceMotion = useReducedMotion();
  const targetScale = 1 - (TOTAL - 1 - index) * 0.035;
  const scale = useTransform(
    scrollProgress,
    [index / TOTAL, Math.min((index + 1) / TOTAL, 1)],
    [1, isCompact || reduceMotion ? 1 : targetScale]
  );

  return (
    <div
      className="project-card-frame"
      style={{
        top: isCompact ? undefined : `${80 + index * 22}px`,
      }}
    >
      <motion.article
        className="project-card"
        style={{ scale }}
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="project-card-header">
          <div className="project-card-title-row">
            <span className="project-number">{project.num}</span>
            <div className="project-title-block">
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <span className="project-tech">{project.tech.join(' / ')}</span>
            </div>
          </div>

          <motion.a
            className="project-link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View on GitHub
          </motion.a>
        </div>

        <div className="project-card-body">
          <p>{project.desc}</p>
          <ProjectMockup visual={project.visual} projectName={project.name} index={index} />
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompact = useMediaQuery('(max-width: 820px)');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="section-card-dark projects-section">
      <motion.h2
        className="hero-heading projects-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Projects
      </motion.h2>

      <div ref={containerRef} className="project-stack">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={index}
            isCompact={isCompact}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
