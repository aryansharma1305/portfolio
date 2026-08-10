import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';
import {
  fetchGitHubRepos,
  GITHUB_PROFILE_URL,
  languageColor,
  timeAgo,
  type GitHubRepo,
} from '../lib/github';

type ProjectVisual = {
  eyebrow: string;
  title: string;
  accent: string;
  secondary: string;
  metrics: string[];
  chips: string[];
};

type Project = {
  num: string;
  name: string;
  category: string;
  desc: string;
  tech: string[];
  github: string;
  homepage: string | null;
  pushedAt: string | null;
  visual: ProjectVisual;
};

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const humanize = (name: string) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .trim();

const hashString = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const ACCENT_PALETTE = [
  '#79d8ff', '#a7f3d0', '#f7c948', '#fb7185',
  '#c084fc', '#38bdf8', '#60a5fa', '#f97316',
  '#34d399', '#f9a8d4', '#f472b6', '#22d3ee',
];

// Hand-designed cards for known repos. New / unknown repos get a generated visual
// from their GitHub metadata (language color, topics, stars, last push).
const CURATED_LIST: Omit<Project, 'num' | 'github' | 'homepage' | 'pushedAt'>[] = [
  {
    name: 'ScholarX',
    category: 'AI / Research',
    desc: 'Production-ready RAG pipeline for semantic search and Q&A over research papers. Hybrid semantic + keyword retrieval with reranking, citation grounding, and evaluation framework.',
    tech: ['Python', 'ChromaDB', 'Sentence Transformers', 'RAG'],
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
    name: 'Digi Buddy',
    category: 'Voice AI / Accessibility',
    desc: 'Hands-free voice-controlled web assistant. Integrates LLM reasoning with DOM parsing/manipulation and real-time STT/TTS for full accessibility.',
    tech: ['Python', 'FastAPI', 'Next.js', 'LLMs', 'STT/TTS'],
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
    name: 'Articulyze',
    category: 'Multimodal AI',
    desc: 'Communication analysis platform using speech, facial emotion, and gaze data. Speech-to-text, filler-word detection, time-aligned verbal-nonverbal analysis.',
    tech: ['Python', 'Flask', 'Whisper', 'DeepFace', 'MediaPipe'],
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
    name: 'AI Interview Prep',
    category: 'Full-Stack / AI',
    desc: 'AI-driven interview platform with real-time voice analysis, adaptive difficulty, Google STT transcription, performance feedback, and progress dashboards.',
    tech: ['Next.js', 'Node.js', 'Firebase', 'WebRTC', 'Google STT'],
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
    name: 'Kathanam',
    category: 'Accessibility / Patent Filed',
    desc: 'Accessibility platform for real-time sign-to-speech and speech-to-text conversion using IndicWav2Vec and TTS models. Patent application filed.',
    tech: ['React.js', 'Firebase', 'Node.js', 'IndicWav2Vec'],
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
    name: 'NoCodeFolio',
    category: 'No-Code / SaaS',
    desc: 'No-code portfolio builder with live visual editing, instant previews, secure auth via NextAuth, and one-click Vercel deployment with full source-code export.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase', 'Framer Motion'],
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

const CURATED: Record<string, (typeof CURATED_LIST)[number]> = Object.fromEntries(
  CURATED_LIST.map((p) => [normalize(p.name), p])
);

const FALLBACK_PROJECTS: Project[] = CURATED_LIST.map((p, i) => ({
  ...p,
  num: String(i + 1).padStart(2, '0'),
  github: GITHUB_PROFILE_URL,
  homepage: null,
  pushedAt: null,
}));

function buildVisual(repo: GitHubRepo): ProjectVisual {
  const idx = hashString(repo.name) % ACCENT_PALETTE.length;
  const accent = languageColor(repo.language) ?? ACCENT_PALETTE[idx];
  const secondary = ACCENT_PALETTE[(idx + 4) % ACCENT_PALETTE.length];
  const stars = repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : 'New';

  return {
    eyebrow: repo.language ?? 'Open Source',
    title: humanize(repo.name).slice(0, 22),
    accent,
    secondary,
    metrics: [stars, repo.language ?? 'Open source', timeAgo(repo.pushed_at) || 'Recently'],
    chips: (repo.topics ?? []).length > 0 ? repo.topics.slice(0, 3) : ['Open Source', 'GitHub'],
  };
}

function repoToProject(repo: GitHubRepo, index: number): Project {
  const curated = CURATED[normalize(repo.name)];
  const name = curated ? curated.name : humanize(repo.name);
  const category = curated ? curated.category : repo.language ?? 'Open Source';
  const desc = curated
    ? curated.desc
    : (repo.description ?? 'A project I built — dive into the repo for details.');
  const tech = curated
    ? curated.tech
    : (repo.topics ?? []).length > 0
      ? repo.topics.slice(0, 4)
      : repo.language
        ? [repo.language]
        : ['GitHub'];
  const visual = curated ? curated.visual : buildVisual(repo);

  return {
    num: String(index + 1).padStart(2, '0'),
    name,
    category,
    desc,
    tech,
    github: repo.html_url,
    homepage: repo.homepage && /^https?:\/\//.test(repo.homepage) ? repo.homepage : null,
    pushedAt: repo.pushed_at,
    visual,
  };
}

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
  project: Project;
  index: number;
  isCompact: boolean;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
}> = ({ project, index, isCompact, scrollProgress, total }) => {
  const reduceMotion = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(
    scrollProgress,
    [index / total, Math.min((index + 1) / total, 1)],
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
              <span className="project-tech">
                {project.tech.join(' / ')}
                {project.pushedAt ? ` · updated ${timeAgo(project.pushedAt)}` : ''}
              </span>
            </div>
          </div>

          <div className="project-card-actions">
            {project.homepage && <LiveProjectButton href={project.homepage} />}
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
        </div>

        <div className="project-card-body">
          <p>{project.desc}</p>
          <ProjectMockup visual={project.visual} projectName={project.name} index={index} />
        </div>
      </motion.article>
    </div>
  );
};

type SyncState = 'loading' | 'live' | 'offline';

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompact = useMediaQuery('(max-width: 820px)');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Start from the curated cards so the section is instantly beautiful;
  // swap in live GitHub data as soon as it arrives.
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [sync, setSync] = useState<SyncState>('loading');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { repos } = await fetchGitHubRepos(8);
        if (cancelled) return;
        setProjects(repos.map(repoToProject));
        setSync('live');
      } catch {
        if (cancelled) return;
        setSync('offline');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const total = projects.length;

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

      <div className="projects-sync" role="status">
        <span className={`sync-dot ${sync}`} />
        {sync === 'loading' && 'Syncing with GitHub…'}
        {sync === 'live' && 'Auto-synced from GitHub — new repos and updates appear here automatically'}
        {sync === 'offline' && 'Offline preview — could not reach GitHub right now'}
      </div>

      <div ref={containerRef} className="project-stack">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.github + project.num}
            project={project}
            index={index}
            isCompact={isCompact}
            scrollProgress={scrollYProgress}
            total={total}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        <a
          className="projects-more"
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all on GitHub →
        </a>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
