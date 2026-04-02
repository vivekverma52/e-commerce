# e-commerce 
a small React e-commerce app.

## Quick checklist

- Node.js version 16 or above  and npm installed
- Clone or create a GitHub repo (instructions below)
- Install dependencies: `npm install`
- Start dev server: `npm start`
- Run unit tests: `npm test`
- Run Cypress E2E: `npm run cypress:open` (interactive) or `npm run cypress:run` (headless)

---

## Setup (local)

1. Clone the repo (or skip if you already have the code locally):

```powershell
git clone https://github.com/vivekverma52/e-commerce.git
cd e-commerce
```

2. Install dependencies:

```powershell
npm install
```

3. Start the dev server (default: http://localhost:3000):

```powershell
npm start
```

Open http://localhost:3000 in your browser.

## Tests

Unit tests (Create React App/Jest):

```powershell
npm test
```

Cypress end-to-end tests:

- Interactive (open the Cypress test runner):

```powershell
npm run cypress:open
```

- Headless (runs all specs and prints a summary):

```powershell
npm run cypress:run
```

Note: Cypress E2E expects the dev server to be running at http://localhost:3000 (this is configured in `cypress.config.ts`).

## Create a GitHub repo and push (PowerShell)

Option A — Using Git and GitHub web UI:

1. Create a new empty repository on GitHub via the website (e.g. `https://github.com/vivekverma52/e-commerce.git`).
2. In your local project folder run:

```powershell
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/vivekverma52/e-commerce.git
git push -u origin main
```

Replace `USERNAME` and `REPO` with your GitHub account and repo name.

Option B — Using the GitHub CLI (recommended if installed):

```powershell
gh repo create USERNAME/REPO --public --source=. --remote=origin --push
```

This creates the repo on GitHub, adds `origin`, and pushes your local code.

## Troubleshooting

- If `npm install` fails, ensure you have a compatible Node.js version and a stable network connection.
- If the app doesn't appear on :3000, check for other processes using that port or errors in the terminal where `npm start` runs.
- If Cypress tests fail, open the runner (`npm run cypress:open`) to interactively debug the failing spec.

## Useful files

- `cypress/` — Cypress tests and support files
- `src/` — React app source
- `package.json` — scripts and dependencies

---
