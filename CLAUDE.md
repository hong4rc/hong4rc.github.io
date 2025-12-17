# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build static site to /build
npm run preview  # Preview production build
npm run check    # Type-check with svelte-check
```

## Architecture

This is a SvelteKit portfolio site using the static adapter for GitHub Pages deployment.

### Key Files

- `src/lib/config.ts` - Central configuration for personal info, SEO, analytics, and feature flags
- `src/lib/stores/theme.ts` - Svelte store for theme state with localStorage persistence
- `src/app.css` - Catppuccin color palette (Latte, Frappé, Macchiato, Mocha) as CSS variables

### Feature Flags

In `config.ts`, toggle sections visibility:
- `features.showProjects` - Projects section
- `features.showBlog` - Blog section
- `features.enableAnalytics` - Google Analytics (requires `analytics.googleAnalyticsId`)

### Theming

Theme is applied via `data-theme` attribute on `<html>`. The inline script in `app.html` prevents flash of wrong theme on load. Theme store syncs with localStorage under key `theme`.

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to main. Set `BASE_PATH` env var for subdirectory deployment.
