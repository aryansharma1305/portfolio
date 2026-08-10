# Aryan Sharma — Portfolio

> Personal portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — utility styles
- **Framer Motion** — animations & scroll effects
- **Kanit** — Google Fonts typeface

## Features

- Custom magnetic cursor with purple glow
- Sticky glass navbar with scroll-spy, scroll progress bar & mobile menu
- Full-viewport hero with rotating role badge
- Scroll-driven animated text (character by character)
- **Live GitHub project sync** — projects auto-update from new / updated repos
- Sticky stacking project cards with scale effect + Live Demo buttons
- Animated skill bars with scroll trigger
- Achievements & recognition section
- Responsive across all screen sizes
- One-click resume download

## GitHub Sync

The Projects section fetches public repos from the GitHub API
(`https://api.github.com/users/AryanSharma1305/repos`) on page load and caches
them in `localStorage` for 10 minutes, so new repos and pushes show up
automatically without a redeploy.

- Hand-designed cards (in `src/sections/ProjectsSection.tsx`) are matched to known repos by name.
- Any other repo gets a generated card from its metadata (language color, topics, stars, last push).
- Forked repos are excluded; cards are sorted by most recently pushed.
- If the API is unreachable (or rate-limited), the section falls back to the curated cards.
- Repos with a `homepage` set get a **Live Demo** button next to **View on GitHub**.

## Sections

| Section | Description |
|---|---|
| Hero | Intro with magnetic 3D avatar |
| About | Animated bio + stats (9.96 CGPA, 4+ internships) |
| Skills | Animated bars across 4 categories + achievements |
| Services | Full-Stack, Mobile, AI/ML, CV, Accessibility |
| Projects | 6 sticky-stacking cards (ScholarX, Articulyze, Kathanam…) |
| Contact | CTA + GitHub, LinkedIn, Email links |

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

---

Made by [Aryan Sharma](https://linkedin.com/in/aryan-sharma-175abb24a) · [sharmaaryan237@gmail.com](mailto:sharmaaryan237@gmail.com)
