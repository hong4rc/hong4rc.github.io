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

This is a SvelteKit portfolio site using the static adapter for GitHub Pages deployment. Features Catppuccin theme and vim-style keyboard navigation.

### Key Files

- `src/lib/config.ts` - Central configuration for personal info, SEO, analytics, feature flags, and keybindings
- `src/lib/stores/theme.ts` - Svelte store for theme state with localStorage persistence
- `src/app.css` - Catppuccin color palette (Latte, Frappé, Macchiato, Mocha) as CSS variables

### Components

| Component | Description |
|-----------|-------------|
| `Hero.svelte` | Name with highlighted "4", typewriter bio effect |
| `TechStack.svelte` | Tech icons using devicon CDN |
| `Skills.svelte` | Skills with brand colors |
| `Experience.svelte` | Timeline with hover effects on dots |
| `OpenSource.svelte` | Fetches top GitHub repos via API |
| `Tools.svelte` | Categorized tools with external links |
| `GitHubStats.svelte` | GitHub stats with colored icons |
| `Contact.svelte` | Contact links |
| `AvailabilityGuestbook.svelte` | Split section: status + Giscus comments |
| `CommandPalette.svelte` | Vim-style keybindings and search |
| `SectionNav.svelte` | Left sidebar with progress indicator |
| `ThemeToggle.svelte` | Theme switcher dropdown |

### Feature Flags

In `config.ts`, toggle sections visibility:
- `features.showProjects` - Projects section
- `features.showBlog` - Blog section
- `features.showExperience` - Experience timeline
- `features.showGitHubStats` - GitHub statistics
- `features.showSkills` - Skills section
- `features.showOpenSource` - Open source repos
- `features.showTools` - Tools I Use
- `features.showAvailability` - Status banner
- `features.showGuestbook` - Guestbook comments
- `features.enableAnalytics` - Google Analytics

### Vim Keybindings

Navigation:
- `w` / `b` - Next/previous section
- `gg` - Go to top
- `G` - Go to bottom
- `0` / `^` - First section
- `$` - Last section
- `zz` - Center current section
- `↑` / `↓` - Navigate sections

Scrolling:
- `Ctrl+d` / `Ctrl+u` - Half page down/up
- `Ctrl+f` / `Ctrl+b` - Full page down/up

Commands:
- `Space` - Open which-key popup
- `Space Space` - Open search
- `/` - Open search
- `?` - Show all keybindings
- `Tab` - Cycle themes
- `g + key` - Go to section (e.g., `gt` for tech)

Section keys (after `Space` or `g`):
- `h` - Home
- `t` - Tech Stack
- `s` - Skills
- `e` - Experience
- `o` - Open Source
- `l` - Tools
- `g` - GitHub
- `c` - Contact
- `a` - Availability

### Theming

Theme is applied via `data-theme` attribute on `<html>`. Four Catppuccin variants:
- `latte` - Light theme (white background)
- `frappe` - Default dark
- `macchiato` - Darker
- `mocha` - Darkest

The inline script in `app.html` prevents flash of wrong theme on load. Theme store syncs with localStorage under key `theme`.

### Guestbook Setup

Uses Giscus (GitHub Discussions). To enable:
1. Enable Discussions on the repo
2. Install Giscus app: https://github.com/apps/giscus
3. Create "Guestbook" category
4. Get repo-id and category-id from https://giscus.app
5. Update `AvailabilityGuestbook.svelte` with the IDs

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to main. Set `BASE_PATH` env var for subdirectory deployment.
