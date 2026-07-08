# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-07-08

### Added

- **SvelteKit SPA — Svelte 5 feature showcase** ([#1](../../pull/1))

  Bootstraps a client-side-only SvelteKit application using `adapter-static` with a `200.html`
  fallback for CSR routing. SSR is disabled globally via the root layout (`export const ssr = false`).

  Key highlights:
  - **`/counter`** — demonstrates `$state` / `$derived` runes alongside `writable` / `derived` stores
  - **`/todos`** — reactive list with filter tabs and `localStorage` persistence via `$effect`
  - **`/fetch`** — `onMount` data fetching from JSONPlaceholder with loading/error states
  - **`/transitions`** — `fade`, `fly`, `slide`, `scale` + `flip` list animation with `elasticOut` easing
  - Runes mode enforced outside `node_modules` via `compilerOptions` in `svelte.config.js`
