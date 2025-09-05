# Book Finder — Alex (Standalone)

**User persona:** Alex — college student who needs a fast, simple book search tool for research and reading.

**API:** Open Library Search API — https://openlibrary.org/search.json?title={bookTitle}

## What this package contains
- Minimal React app (frontend-only) that searches the Open Library API.
- Features: search by title, results grid with cover, title, authors, first publish year, link to Open Library, and "save favorite" localStorage support.
- Small, focused, and easy to deploy to CodeSandbox or StackBlitz.

## How this satisfies assignment levels
1. **Level 1 (50%) — Working with AI**: Use the ChatGPT conversation as proof of AI assistance. Include the ChatGPT conversation link when submitting (this thread).
2. **Level 2 (30%) — Working application**: Deploy on CodeSandbox or StackBlitz. See instructions below.
3. **Level 3 (20%) — Code & README**: This ZIP contains the full source and this README.

## Run locally (quick)
1. Ensure Node.js is installed.
2. In the project folder:
   ```bash
   npm install
   npm start
   ```
The app uses a tiny React setup compatible with Create React App tooling in CodeSandbox/StackBlitz.

## Deploy on CodeSandbox (recommended)
- Go to https://codesandbox.io/s/ and choose **Create Sandbox → From ZIP** (upload this zip), or create a new React sandbox and paste `src` files.
- Or import from GitHub if you push this repo there.

## Files
- `package.json` — minimal metadata for sandboxing
- `public/index.html` — HTML shell
- `src/index.js`, `src/App.js` — React app
- `src/styles.css` — small styles

## Notes
- This app performs client-side calls to the Open Library API — no API key required.
- For Level 1 proof, include the ChatGPT conversation link with your submission.
