# Arabic Adventure Kids

A complete interactive educational web app for children (ages 5–12) to learn Arabic through games, listening, vocabulary, quizzes, memory tasks, and progress rewards.

## Features

### Main screens
- Home
- Learn Arabic
- Alphabet
- Vocabulary
- Listening
- Memory Game
- Quiz / Trivia
- Puzzle
- Leaderboard
- Progress
- Parent / Teacher Dashboard

### Arabic learning content
- Arabic alphabet with pronunciation buttons
- Example words per letter
- Child-friendly vocabulary cards with emoji pictures
- Transliteration + English + Russian translation
- Basic phrases for children
- Categories: letters, greetings, colors, animals, fruits, family, school objects, numbers, daily expressions

### Educational game activities
- Alphabet exploration with trace-style interaction area
- Vocabulary matching practice
- Listening recognition challenge
- Memory matching game
- Quiz/trivia with multiple formats
- Puzzle word-building via drag-and-drop letters
- Speaking confidence using “repeat after audio” prompts

### Rewards and progress
- XP points, stars, level progress, streak, activity log
- Daily reward button
- Badge display
- Progress screen with recent activity

### Leaderboard
- Rank, player, score, level, badges, lessons completed, quiz accuracy, games played
- Sorting and level filtering
- Top 3 highlight

### Parent/Teacher dashboard
- Completed lessons
- Quiz result snapshot
- Vocabulary learned
- Weak areas and strongest categories
- Daily and weekly learning time

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript (no build step)
- Browser localStorage for progress persistence

## Folder structure

```
Arabic-Alphabet/
├── index.html
├── styles.css
├── js/
│   ├── app.js
│   └── data.js
└── README.md
```

## Run locally

1. Open the project folder.
2. Start a local server (recommended):

```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000` in your browser.

> You can also open `index.html` directly, but a local server is better for consistent behavior.

## Accessibility and UX notes
- Large readable fonts and touch-friendly controls
- Bright child-friendly colors and clear contrast
- Sound on/off toggle
- Friendly encouraging messages:
  - Great job!
  - Excellent!
  - Well done!
  - Try again!
  - Let’s learn more Arabic!

## Notes
- No math content included.
- Focus is Arabic language learning and confidence building only.
- Uses browser speech synthesis for audio pronunciation.
