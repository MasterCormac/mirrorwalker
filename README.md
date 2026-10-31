# Mirrorwalker — AI Text Adventure · Project Showcase

A static showcase site for **Mirrorwalker**, an AI-driven narrative adventure game designed at the **Shanghai Innovation Institute AI Summer Camp (Jul–Aug 2025)**. The site presents the game's concept, its three story worlds inspired by *The Devotion of Suspect X*, *Cyberpunk 2077*, and *The Truman Show*, and the choice-based MBTI profiling engine — including a playable 5-choice teaser that scores the visitor live and shows how the adaptive narrator works.

Built as a zero-dependency static site (HTML/CSS/vanilla JS) so it can be hosted directly on GitHub Pages.

## Live versions

- **Full interactive app (frontend + backend scoring engine, session persistence, global Mirror Census stats):** https://acnvygmh0c81.feishu.link/app/app_17h1zzgh4bs
- **Static showcase (this repo, via GitHub Pages):** https://mastercormac.github.io/mirrorwalker/

The full version moves the script and MBTI scoring to the server so choice values are never exposed to the browser, persists every playthrough, and shows aggregate stats across all players. This repo contains the confirmed front-end experience in static form.

## Structure

```
index.html        — single-page showcase (hero, concept, three worlds, MBTI engine, teaser, credits)
css/style.css     — dark "mirror" visual system, responsive layout
js/teaser.js      — playable teaser: 5 scored choices → live MBTI profile read
js/ambient.js     — ambient canvas background (drifting mirror shards)
```

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Credits

- **Game concept, gameplay structure, themes, story content, MBTI choice system:** project designer (this site's author)
- **Dify-based technical implementation:** teammates at the AI Summer Camp
