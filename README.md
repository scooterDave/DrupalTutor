# Drupal Tutor

A multiple-choice quiz app that tests your knowledge of **Drupal 10 & 11** architecture. Questions range from site-building basics to advanced topics like the Plugin system, dependency injection, and performance tuning.

![Drupal Tutor](https://img.shields.io/badge/Drupal-10%20%7C%2011-0678BE?style=flat-square&logo=drupal)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)

---

## Features

- **55+ questions** covering Drupal 10 & 11 concepts
- **Difficulty levels:** Developer, Mid-Level, and Senior
- **Flexible quiz modes:**
  - **All (Easy → Hard)** — Start with Developer questions and progress to Senior
  - **Single level** — Focus only on Developer, Mid-Level, or Senior questions
- **Immediate feedback** — Correct/incorrect answers with brief explanations
- **Score tracking** — Live score and tier breakdown on the results screen
- **Responsive design** — Works on desktop and mobile
- **Dark theme** — Drupal-inspired color palette with Drupal blue (#0678BE)

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/scooterDave/DrupalTutor.git
cd DrupalTutor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running with Docker

```bash
# Build and run the container
docker build -t drupal-tutor .
docker run -p 5173:5173 drupal-tutor
```

For live-reload during development (mount the project directory):

```bash
docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules drupal-tutor
```

---

## Build for Production

```bash
npm run build
```

The built files are output to the `dist/` directory. Serve them with any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

---

## Deployment

### Netlify

1. Push to [GitHub](https://github.com/scooterDave/DrupalTutor)
2. Connect the repo in [Netlify](https://netlify.com) → **Add new site** → **Import an existing project**
3. Netlify detects the Vite config from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### Vercel

1. Connect the repo at [vercel.com](https://vercel.com)
2. Vercel auto-detects Vite and builds the project

### Other Platforms

- **GitHub Pages:** Use `gh-pages` to deploy the `dist` folder
- **Cloudflare Pages:** Connect GitHub and deploy; Vite is auto-detected

---

## Project Structure

```
DrupalTutor/
├── DrupalTutor.jsx    # Main React app (questions + UI)
├── src/
│   ├── main.jsx       # Entry point
│   └── index.css      # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml       # Netlify build config
├── Dockerfile
├── .gitignore
├── SECURITY.md        # Security policy and reporting
└── README.md
```

---

## Adding Custom Questions

Questions live in the `QUESTIONS` array in `DrupalTutor.jsx`. Each question object follows this structure:

```javascript
{
  id: number,
  difficulty: "developer" | "mid-level" | "senior",
  topic: string,
  question: string,
  options: { A: string, B: string, C: string, D: string },
  correct: "A" | "B" | "C" | "D",
  explanation: string  // 1–3 sentences explaining why the answer is correct
}
```

**Difficulty levels:**
- **Developer** — Core concepts, Views, Site Building, theming basics
- **Mid-Level** — Custom modules, hooks, services, Twig, REST API, migrations, caching
- **Senior** — Plugins, event subscribers, DI, performance, multisite, security

---

## Embedding in an Existing Drupal Site

### Option 1: Via Netlify/Vercel + iframe

1. Deploy the app to Netlify or Vercel (see [Deployment](#deployment))
2. Create a Drupal node (e.g., Basic Page)
3. Set the Body field to **Full HTML** (restrict this format to trusted editors only)
4. Add:

```html
<iframe 
  src="https://your-app.netlify.app" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  style="border-radius: 12px;">
</iframe>
```

### Option 2: Progressive Decoupling (Drupal-native)

1. Run `npm run build` locally
2. Copy the built files from `dist/` into your theme or module (e.g., `sites/default/files/drupal-tutor/`)
3. In `your_theme.libraries.yml`:

```yaml
drupal_tutor:
  version: 1.0
  css:
    theme:
      /path/to/index.css: {}
  js:
    /path/to/index.js: {}
```

4. Add `<div id="root"></div>` in a Twig template or node body
5. Attach the library: `{{ attach_library('your_theme/drupal_tutor') }}`

---

## Security

- **Client-side only** — No backend, database, or API; no user data is collected or stored
- **No secrets** — No API keys, credentials, or environment variables required
- **React escaping** — All rendered content is safely escaped; no `dangerouslySetInnerHTML` or raw HTML
- **Dependencies** — Run `npm audit` periodically and keep packages updated

See [SECURITY.md](SECURITY.md) for vulnerability reporting and security considerations.

---

## Tech Stack

- **React 18** — UI
- **Vite 5** — Build tooling and dev server
- **Tailwind CSS 3** — Styling
- **Lucide React** — Icons

---

## License

MIT
