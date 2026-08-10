// Live GitHub repo sync for the portfolio.
// Fetches the user's public repos from the GitHub API, caches them in
// localStorage for 10 minutes so the page is instant and doesn't burn
// the unauthenticated rate limit (60 req/hr per IP).

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  pushed_at: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
};

export const GITHUB_USER = 'AryanSharma1305';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;

const CACHE_KEY = 'aryan-github-repos-v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

type CacheEntry = { fetchedAt: number; repos: GitHubRepo[] };

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!Array.isArray(entry.repos) || typeof entry.fetchedAt !== 'number') return null;
    return entry;
  } catch {
    return null;
  }
}

function writeCache(repos: GitHubRepo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), repos }));
  } catch {
    // Storage unavailable (private mode / quota) — ignore, fetch will retry next time.
  }
}

/** Returns repos from cache when fresh, otherwise fetches from the GitHub API. */
export async function fetchGitHubRepos(max = 8): Promise<{ repos: GitHubRepo[]; fromCache: boolean }> {
  const cached = readCache();
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return { repos: cached.repos.slice(0, max), fromCache: true };
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&direction=desc&per_page=100`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

  const all = (await res.json()) as GitHubRepo[];
  // Cache every non-fork repo so a later change to `max` reuses the cache.
  const repos = all.filter((r) => !r.fork);
  writeCache(repos);
  return { repos: repos.slice(0, max), fromCache: false };
}

/** "2026-08-10T12:00:00Z" -> "2d ago" */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.max(0, (Date.now() - then) / 1000);
  if (seconds < 45) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
}

// GitHub language colors (subset) — fallback accent for generated visuals.
const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Java: '#B07219',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  'C++': '#F34B7D',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#E34C26',
  CSS: '#663399',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'C#': '#178600',
  PHP: '#4F5D95',
  Shell: '#89E051',
  Swift: '#F05138',
  Ruby: '#701516',
  Vue: '#41B883',
  React: '#61DAFB',
};

export function languageColor(language: string | null): string | null {
  if (!language) return null;
  return LANGUAGE_COLORS[language] ?? null;
}
