# Mirrorwalker — AI Text Adventure · Project Showcase

A static showcase site for **Mirrorwalker**, an AI-driven narrative adventure game designed at the **Shanghai Innovation Institute AI Summer Camp (Jul–Aug 2025)**. The site presents the game's concept, its three story worlds inspired by *The Devotion of Suspect X*, *Cyberpunk 2077*, and *The Truman Show*, and the choice-based MBTI profiling engine — including a playable 5-choice teaser that scores the visitor live and shows how the adaptive narrator works.


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
