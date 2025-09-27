# Project Setup - YINI Homepage

Here you'll find some info for install/setup/directory structure.

## Pre-requisites
- `nvm` (Node Version Manager)

**Only if Windows:**
- `Git Bash`

---

## 🏗 Main Techs
- **Astro**
- **React**
- **TypeScript** - Core language for the parser and API
- **Node.js** - Uses CommonJS (CJS) for compatibility (as opposed to ESM (ECMAScript Modules))
- **Prettier / ESLint** - Code formatting and linting tools
  
---

Notes:
- The parser currently uses CommonJS (CJS module format) module format for maximum compatibility with Jest and Node.js.

In `package.json`, this line must be present:
```json
"type": "module"
```

---

## Project Overview
Brief overview of the directory structure in this project:

```txt
yini-lang.org/
├─ public/
│  ├─ favicon.ico
│  ├─ site.webmanifest
│  ├─ ...
│  └─ robots.txt
└─ src/
   ├─ assets/  // Any gfx that is imported in components/pages.
   │  ├─ dot-logo.svg  // .yini wordmark
   │  ├─ ...
   │  └─ logo.png  // YINI wordmark.
   ├─ layouts/
   │  └─ BaseLayout.astro
   └─ pages/
      └─ index.astro
```
