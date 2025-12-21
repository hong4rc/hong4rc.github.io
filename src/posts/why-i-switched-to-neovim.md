---
title: Why I Switched to Neovim
description: 4 years of VS Code, then LazyVim happened. Week 1 was pain, week 4 I couldn't go back.
date: '2024-12-15'
tags:
  - neovim
  - tools
  - productivity
readTime: 5 min
published: true
---

# Why I Switched to Neovim

After 4 years of VS Code, I finally made the jump to Neovim. Here's why and how it went.

## The Problem with VS Code

Don't get me wrong - VS Code is great. But:

- **It's slow** - Opening a large project? Time for coffee.
- **Resource hungry** - Electron gonna Electron
- **Mouse dependency** - I kept reaching for the mouse

## Enter LazyVim

I didn't start from scratch. [LazyVim](https://www.lazyvim.org/) gave me a fully configured Neovim setup that just works.

```lua
-- My only customization at first
vim.opt.relativenumber = true
```

## The Learning Curve

Week 1: *"Why did I do this to myself?"*

Week 2: *"Okay, `ciw` is actually pretty cool"*

Week 3: *"I can't go back"*

Week 4: *"Let me add this site's vim keybindings"*

## What I Love

### 1. Speed
Everything is instant. Opening files, searching, navigating - it's all immediate.

### 2. Keyboard-first
My hands never leave the keyboard. It's not just faster, it's more comfortable.

### 3. Customization
Every single thing can be customized. And with Lua, it's actually pleasant.

### 4. Lazygit integration
`<leader>gg` opens lazygit. Chef's kiss.

## My Current Setup

- **LazyVim** as base
- **Catppuccin** theme (same as this site!)
- **Telescope** for fuzzy finding
- **LSP** for TypeScript, Go, Rust
- **Copilot** because I'm lazy

## Tips for Switching

1. Use LazyVim or AstroNvim - don't configure from scratch
2. Keep VS Code installed for the first month
3. Learn one new motion per day
4. Use `vimtutor` - it's actually good

## Was It Worth It?

Absolutely. I'm faster, my wrists are happier, and I actually enjoy coding more.

The initial investment is real, but the returns are worth it.
