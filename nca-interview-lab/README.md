# NCA Commercial Practitioner Interview Lab

A Vite + React + Tailwind app with all 5 prep modules (flashcards, skills radar,
CV sift auditor, STAR story bank with PDF export, and a voice mock interview
studio). The two AI-powered features — STAR "AI Polish" and the mock
interview panel's live replies — call a small serverless function
(`/api/claude.js`) rather than Anthropic's API directly, so your API key
never reaches the browser.

## Deploy to Vercel (recommended path)

1. **Push this folder to a GitHub repo** (Vercel deploys from Git).
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. **Import the repo in Vercel** — vercel.com → Add New → Project → select
   the repo. Vercel auto-detects Vite; you don't need to touch build settings.
3. **Add your API key before the first deploy** — Project Settings →
   Environment Variables → add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com/settings/keys
   - Environment: Production (and Preview, if you want previews to work too)
4. **Deploy.** Vercel builds the Vite frontend and automatically turns
   `api/claude.js` into a serverless function at `/api/claude` — no extra
   config needed.
5. **Test it live**: open the deployed URL, go to the STAR Story Bank tab,
   and click "AI Polish to HEO Grade 4" on a story with some text in it. If
   it comes back polished, the key is wired up correctly. If you instead see
   the offline fallback text, check step 3 (env var name/value) and redeploy.

If you'd rather deploy without Git, install the Vercel CLI (`npm i -g
vercel`) and run `vercel` from this folder, then `vercel env add
ANTHROPIC_API_KEY` followed by `vercel --prod`.

## Local development

```
npm install
cp .env.example .env      # then paste your real key into .env
npm i -g vercel            # only needed once, for local serverless functions
vercel dev                 # runs both the Vite frontend AND /api/claude.js
```

Plain `npm run dev` (Vite only, no `vercel dev`) will run the UI fine but
the two AI features will fail to reach `/api/claude` and fall back to the
built-in canned responses — that's expected, since Vite alone doesn't run
serverless functions.

## Changing the model

`api/claude.js` calls `claude-sonnet-5`. Swap the `model` value there for
any other current Claude model string if you'd prefer a different one.

## What still won't work anywhere except this repo's own domain

Speech recognition (`SpeechRecognition`/`webkitSpeechRecognition`) and
`speechSynthesis` are standard browser APIs with no server dependency, so
they work the same on Vercel as anywhere else — but browser support varies
(Chrome is most reliable; some browsers restrict microphone access on
non-HTTPS origins, which Vercel's default `*.vercel.app` domain already
satisfies).
