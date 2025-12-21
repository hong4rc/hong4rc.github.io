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

SvelteKit portfolio site with static adapter for GitHub Pages. Features:
- **Full-page sections** with CSS scroll-snap (5 pages)
- **Catppuccin theme** (4 variants)
- **Vim-style keyboard navigation**
- **Blog with markdown support** (mdsvex)

### Key Files

- `src/lib/config.ts` - Central config for personal info, experience, tech stack, fun facts
- `src/lib/stores/theme.ts` - Theme state with localStorage persistence
- `src/lib/blog/posts.ts` - Blog post loader from markdown files
- `src/app.css` - Catppuccin color palette as CSS variables
- `svelte.config.js` - SvelteKit + mdsvex configuration

### Page Structure (5 Full-Page Sections)

1. **Hero** - Name, typewriter bio, social links
2. **Experience** - Work timeline with playful descriptions
3. **Tech + Open Source** - Tech stack icons + pinned GitHub repos
4. **Tools + Fun Facts** - Tools I use + personality facts
5. **GitHub + Contact + Status** - Stats, contact links, availability

### Components

| Component | Description |
|-----------|-------------|
| `Hero.svelte` | Name with highlighted "4", typewriter bio effect |
| `Experience.svelte` | Timeline with hover effects on dots |
| `TechStack.svelte` | Colored tech icons using devicon CDN |
| `OpenSource.svelte` | Fetches pinned repos from GitHub profile |
| `Tools.svelte` | Categorized tools with external links |
| `FunFacts.svelte` | Personality facts (Colemak, Split Keyboard, etc.) |
| `GitHubStats.svelte` | GitHub stats with colored icons |
| `Contact.svelte` | Contact links |
| `Availability.svelte` | Current status (Open to work, etc.) |
| `CommandPalette.svelte` | Vim-style keybindings and search |
| `SectionNav.svelte` | Left sidebar with 5-page progress indicator |
| `ThemeToggle.svelte` | Theme switcher dropdown |
| `TechFooter.svelte` | Footer with tech stack info |

### Blog

Uses **mdsvex** for markdown processing. Blog posts are in `src/posts/`.

**Adding a new post:**

1. Create `src/posts/your-post-slug.md`
2. Add frontmatter:
```markdown
---
title: Post Title
description: Short description for preview
date: '2024-12-20'
tags:
  - tag1
  - tag2
readTime: 5 min
published: true
---

Your markdown content here...
```
3. Set `published: true` to show, `false` to hide

**Blog routes:**
- `/blog` - Blog listing with timeline, tags
- `/blog/[slug]` - Individual post page

### Vim Keybindings (Home Page Only)

Navigation:
- `j` / `k` - Next/previous page
- `w` / `b` - Next/previous page (alternative)
- `gg` - Go to first page
- `G` - Go to last page
- `0` / `^` - First page
- `$` - Last page

Scrolling:
- `Ctrl+d` / `Ctrl+u` - Half page down/up
- `Ctrl+f` / `Ctrl+b` - Full page down/up

Commands:
- `Space` - Open which-key popup
- `Space Space` - Open search
- `/` - Open search
- `?` - Show all keybindings
- `Tab` - Next section
- `Shift+Tab` - Previous section

Go-to keys (after `g`):
- `h` - Home (page 1)
- `e` - Experience (page 2)
- `t` - Tech Stack (page 3)
- `l` - Tools (page 4)
- `g` - GitHub Stats (page 5)

### Theming

Theme applied via `data-theme` attribute on `<html>`:
- `latte` - Light theme
- `frappe` - Default dark
- `macchiato` - Darker
- `mocha` - Darkest

Inline script in `app.html` prevents flash of wrong theme. Theme syncs with localStorage key `theme`.

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to main.

For user site (username.github.io): `BASE_PATH` should be empty.
For project site: Set `BASE_PATH` to repository name.
