const state = {
  currentScreen: 'home',
  soundOn: true,
  xp: Number(localStorage.getItem('xp') || APP_DATA.user.xp),
  stars: Number(localStorage.getItem('stars') || APP_DATA.user.stars),
  streak: Number(localStorage.getItem('streak') || APP_DATA.user.streak),
  lessonsCompleted: Number(localStorage.getItem('lessonsCompleted') || APP_DATA.user.lessonsCompleted),
  gamesPlayed: Number(localStorage.getItem('gamesPlayed') || APP_DATA.user.gamesPlayed),
  activityLog: JSON.parse(localStorage.getItem('activityLog') || '[]')
};

const container = document.getElementById('screenContainer');
const toast = document.getElementById('toast');

function saveProgress() {
  Object.keys(state).forEach((key) => {
    if (["xp", "stars", "streak", "lessonsCompleted", "gamesPlayed", "activityLog"].includes(key)) {
      localStorage.setItem(key, JSON.stringify(state[key]));
    }
  });
}

function speak(text) {
  if (!state.soundOn || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function reward(points = 20, stars = 1, note = 'Lesson reward') {
  state.xp += points;
  state.stars += stars;
  state.lessonsCompleted += 1;
  state.activityLog.unshift({ note, date: new Date().toLocaleString(), points });
  state.activityLog = state.activityLog.slice(0, 12);
  saveProgress();
  showToast(`${randomEncouragement()} +${points} XP ⭐+${stars}`);
}

function gameReward(points = 35, stars = 2, note = 'Game completed') {
  state.xp += points;
  state.stars += stars;
  state.gamesPlayed += 1;
  state.activityLog.unshift({ note, date: new Date().toLocaleString(), points });
  state.activityLog = state.activityLog.slice(0, 12);
  saveProgress();
  showToast(`${randomEncouragement()} +${points} XP`);
}

function randomEncouragement() {
  return APP_DATA.encouragement[Math.floor(Math.random() * APP_DATA.encouragement.length)];
}

function getProgressPercent() {
  return Math.min(100, Math.floor((state.xp / 2500) * 100));
}

function renderHome() {
  return `
    <section class="card hero">
      <h2>Welcome, ${APP_DATA.user.name}! 👋</h2>
      <p>Practice letters, words, listening, and speaking confidence with colorful Arabic games.</p>
      <div class="stats-grid">
        <article><h3>${state.xp}</h3><p>XP points</p></article>
        <article><h3>${state.stars}</h3><p>Stars</p></article>
        <article><h3>${state.streak} days</h3><p>Streak</p></article>
        <article><h3>Lv ${APP_DATA.user.level + Math.floor(state.xp / 800)}</h3><p>Level</p></article>
      </div>
      <div class="progress-wrap"><span style="width:${getProgressPercent()}%"></span></div>
      <p class="encourage">${randomEncouragement()}</p>
    </section>
    <section class="grid-2">
      <article class="card">
        <h3>Today’s challenge</h3>
        <ul>
          <li>Learn 3 new vocabulary words</li>
          <li>Finish one listening challenge</li>
          <li>Play one memory round</li>
        </ul>
      </article>
      <article class="card">
        <h3>Practice categories</h3>
        <div class="tags">${[...new Set(APP_DATA.vocabulary.map(v => v.category))].map(c => `<span>${c}</span>`).join('')}</div>
      </article>
    </section>`;
}

function renderLearn() {
  return `
    <section class="card">
      <h2>Learn Arabic</h2>
      <p>Simple phrases with transliteration and translation.</p>
      ${APP_DATA.phrases.map((p) => `
        <article class="phrase-row">
          <div class="arabic">${p.arabic}</div>
          <div>${p.transliteration}</div>
          <div>${p.english}</div>
          <button class="small" onclick="speak('${p.arabic}')">🔊 Listen</button>
        </article>
      `).join('')}
      <button class="primary" onclick="reward(30,2,'Phrase lesson completed')">Mark lesson as completed</button>
    </section>`;
}

function renderAlphabet() {
  return `
    <section class="card">
      <h2>Arabic Alphabet</h2>
      <p>Tap a letter to hear pronunciation and practice tracing style motion.</p>
      <div class="alphabet-grid">
        ${APP_DATA.letters.map((l) => `
          <button class="letter-card" onclick="speak('${l.letter}');showToast('${l.name} - ${l.example} (${l.translation})')">
            <span class="arabic big">${l.letter}</span>
            <small>${l.name} • ${l.transliteration}</small>
            <small>${l.example} (${l.translation})</small>
          </button>`).join('')}
      </div>
      <div class="trace-box" id="traceBox">Trace here with your finger or mouse ✍️</div>
    </section>`;
}

function renderVocabulary() {
  const items = APP_DATA.vocabulary;
  return `
    <section class="card">
      <h2>Vocabulary Playground</h2>
      <p>Tap each word to hear pronunciation. Match word with emoji picture.</p>
      <div class="vocab-grid">
        ${items.map((w, i) => `
          <article class="vocab-card">
            <div class="emoji">${w.emoji}</div>
            <div class="arabic">${w.arabic}</div>
            <p>${w.transliteration}</p>
            <p>${w.english} / ${w.russian}</p>
            <button class="small" onclick="speak('${w.arabic}')">🔊 Hear</button>
            <button class="small" onclick="checkVocab(${i})">Match</button>
          </article>
        `).join('')}
      </div>
    </section>`;
}

function renderListening() {
  const word = APP_DATA.vocabulary[Math.floor(Math.random() * APP_DATA.vocabulary.length)];
  const options = shuffle([...APP_DATA.vocabulary]).slice(0, 4);
  if (!options.find(o => o.arabic === word.arabic)) options[0] = word;
  return `
    <section class="card">
      <h2>Listening Challenge</h2>
      <p>Listen carefully and select the correct word.</p>
      <button class="primary" onclick="speak('${word.arabic}')">▶️ Play sound</button>
      <div class="options">${shuffle(options).map(o => `<button onclick="listenAnswer('${o.arabic}','${word.arabic}')">${o.arabic}</button>`).join('')}</div>
      <p class="encourage">Repeat after audio: <strong>${word.transliteration}</strong></p>
    </section>`;
}

function renderMemory() {
  const pairs = APP_DATA.vocabulary.slice(0, 6).map(v => ({ key: v.arabic, value: v.emoji }));
  const cards = shuffle([...pairs.map(p => ({ id: p.key, content: p.key })), ...pairs.map(p => ({ id: p.key, content: p.value }))]);
  return `
    <section class="card">
      <h2>Memory Game</h2>
      <p>Match Arabic words with pictures. Easy-to-hard challenge with timer feeling!</p>
      <div class="memory-grid" id="memoryGrid">
      ${cards.map((c, idx) => `<button class="memory-card" data-id="${c.id}" data-content="${c.content}" onclick="flipCard(this)">?</button>`).join('')}
      </div>
      <button class="small" onclick="gameReward(45,3,'Memory game finished')">Finish memory level</button>
    </section>`;
}

function renderQuiz() {
  const q = APP_DATA.quiz[Math.floor(Math.random() * APP_DATA.quiz.length)];
  return `
    <section class="card">
      <h2>Quiz / Trivia</h2>
      <p>Timed challenge mode: answer quickly!</p>
      <article class="quiz-box">
        <h3>${q.question}</h3>
        ${q.type === 'listen' ? `<button class="small" onclick="speak('${q.audioWord}')">🔊 Listen</button>` : ''}
        <div class="options">${q.options.map(o => `<button onclick="quizAnswer('${o}','${q.answer}')">${o}</button>`).join('')}</div>
      </article>
    </section>`;
}

function renderPuzzle() {
  const puzzle = APP_DATA.puzzleWords[Math.floor(Math.random() * APP_DATA.puzzleWords.length)];
  return `
    <section class="card">
      <h2>Puzzle Builder</h2>
      <p>Reorder letters and build the Arabic word.</p>
      <div class="letters-row">
        ${shuffle(puzzle.letters).map(l => `<button class="draggable" draggable="true" ondragstart="drag(event)" id="letter-${Math.random()}">${l}</button>`).join('')}
      </div>
      <div class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">Drop letters here</div>
      <button class="small" onclick="checkPuzzle('${puzzle.arabic}')">Check word</button>
      <div class="hint">Hint: means ${APP_DATA.vocabulary.find(v => v.arabic.startsWith(puzzle.arabic[0]))?.english || 'a word'}</div>
    </section>`;
}

function renderLeaderboard() {
  const rows = [...APP_DATA.leaderboard].sort((a, b) => b.score - a.score);
  return `
    <section class="card">
      <h2>Leaderboard</h2>
      <p>Top players this week.</p>
      <label>Filter level: <input id="levelFilter" type="number" min="1" placeholder="e.g. 6" oninput="filterBoard(this.value)"/></label>
      <table>
        <thead><tr><th>Rank</th><th>Player</th><th>Score</th><th>Level</th><th>Badges</th><th>Lessons</th><th>Accuracy</th><th>Games</th></tr></thead>
        <tbody id="boardBody">
          ${rows.map((p, i) => `<tr class="${i < 3 ? 'top' : ''}"><td>#${i + 1}</td><td>${p.name}</td><td>${p.score}</td><td>${p.level}</td><td>${p.badges}</td><td>${p.lessons}</td><td>${p.accuracy}%</td><td>${p.games}</td></tr>`).join('')}
        </tbody>
      </table>
    </section>`;
}

function renderProgress() {
  return `
    <section class="card">
      <h2>My Progress</h2>
      <div class="stats-grid">
        <article><h3>${state.xp}</h3><p>XP</p></article>
        <article><h3>${state.stars}</h3><p>Stars</p></article>
        <article><h3>${state.lessonsCompleted}</h3><p>Lessons</p></article>
        <article><h3>${state.gamesPlayed}</h3><p>Games</p></article>
      </div>
      <h3>Badges</h3>
      <div class="tags">${APP_DATA.user.badges.map(b => `<span>🏅 ${b}</span>`).join('')}</div>
      <h3>Recent activity</h3>
      <ul>${state.activityLog.map(a => `<li>${a.date} - ${a.note} (+${a.points} XP)</li>`).join('') || '<li>Start learning to build your history!</li>'}</ul>
    </section>`;
}

function renderDashboard() {
  const u = APP_DATA.user;
  return `
    <section class="card">
      <h2>Parent / Teacher Dashboard</h2>
      <div class="grid-2">
        <article class="subcard">
          <h3>Performance Snapshot</h3>
          <ul>
            <li>Completed lessons: ${state.lessonsCompleted}</li>
            <li>Quiz results (avg): ${Math.round((APP_DATA.leaderboard[0].accuracy + 82) / 2)}%</li>
            <li>Vocabulary learned: ${u.vocabularyLearned}</li>
            <li>Time spent today: ${u.dailyMinutes} minutes</li>
            <li>Time spent this week: ${u.weeklyMinutes} minutes</li>
          </ul>
        </article>
        <article class="subcard">
          <h3>Learning analysis</h3>
          <p><strong>Strongest:</strong> ${u.strongest.join(', ')}</p>
          <p><strong>Needs support:</strong> ${u.weakAreas.join(', ')}</p>
          <p>Recommendation: Review colors and listening challenge before next quiz.</p>
        </article>
      </div>
    </section>`;
}

function renderScreen(screen) {
  state.currentScreen = screen;
  const map = {
    home: renderHome,
    learn: renderLearn,
    alphabet: renderAlphabet,
    vocabulary: renderVocabulary,
    listening: renderListening,
    memory: renderMemory,
    quiz: renderQuiz,
    puzzle: renderPuzzle,
    leaderboard: renderLeaderboard,
    progress: renderProgress,
    dashboard: renderDashboard
  };
  container.innerHTML = (map[screen] || renderHome)();
  bindTraceBox();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function checkVocab(index) {
  const word = APP_DATA.vocabulary[index];
  const answer = prompt(`Type the English meaning of ${word.arabic}`);
  if ((answer || '').toLowerCase().trim() === word.english.toLowerCase()) {
    reward(20, 1, 'Vocabulary match');
  } else {
    showToast('Try again!');
  }
}

let firstCard = null;
function flipCard(button) {
  if (button.classList.contains('matched')) return;
  button.textContent = button.dataset.content;
  button.classList.add('open');
  if (!firstCard) {
    firstCard = button;
    return;
  }
  if (firstCard.dataset.id === button.dataset.id && firstCard !== button) {
    button.classList.add('matched');
    firstCard.classList.add('matched');
    firstCard = null;
    showToast('Excellent!');
  } else {
    const previous = firstCard;
    firstCard = null;
    setTimeout(() => {
      previous.textContent = '?';
      button.textContent = '?';
      previous.classList.remove('open');
      button.classList.remove('open');
    }, 650);
  }
}

function quizAnswer(choice, answer) {
  if (choice === answer) {
    gameReward(40, 2, 'Quiz success');
  } else {
    showToast('Try again!');
  }
  renderScreen('quiz');
}

function listenAnswer(choice, answer) {
  if (choice === answer) {
    gameReward(30, 2, 'Listening challenge');
  } else {
    showToast('Listen carefully and try again!');
  }
  renderScreen('listening');
}

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData('text', ev.target.id); }
function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData('text');
  const letter = document.getElementById(id);
  ev.target.appendChild(letter);
}

function checkPuzzle(target) {
  const zone = document.querySelector('.drop-zone');
  const built = [...zone.querySelectorAll('button')].map(b => b.textContent).join('');
  if (built === target) {
    gameReward(50, 3, 'Puzzle solved');
  } else {
    showToast('Try again! Fix the spelling.');
  }
}

function filterBoard(levelValue) {
  const lvl = Number(levelValue);
  const body = document.getElementById('boardBody');
  const rows = [...APP_DATA.leaderboard]
    .filter(p => !lvl || p.level >= lvl)
    .sort((a, b) => b.score - a.score)
    .map((p, i) => `<tr class="${i < 3 ? 'top' : ''}"><td>#${i + 1}</td><td>${p.name}</td><td>${p.score}</td><td>${p.level}</td><td>${p.badges}</td><td>${p.lessons}</td><td>${p.accuracy}%</td><td>${p.games}</td></tr>`)
    .join('');
  body.innerHTML = rows;
}

function bindTraceBox() {
  const box = document.getElementById('traceBox');
  if (!box) return;
  let drawing = false;
  box.addEventListener('pointerdown', () => drawing = true);
  box.addEventListener('pointerup', () => drawing = false);
  box.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.style.left = `${e.offsetX}px`;
    dot.style.top = `${e.offsetY}px`;
    box.appendChild(dot);
  });
  box.addEventListener('dblclick', () => box.innerHTML = 'Trace here with your finger or mouse ✍️');
}

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderScreen(btn.dataset.screen);
  });
});

document.getElementById('soundToggle').addEventListener('click', (e) => {
  state.soundOn = !state.soundOn;
  e.target.textContent = state.soundOn ? '🔊 Sound On' : '🔇 Sound Off';
  showToast(state.soundOn ? 'Sound enabled' : 'Sound muted');
});

document.getElementById('dailyReward').addEventListener('click', () => {
  state.streak += 1;
  reward(60, 4, 'Daily practice reward');
  saveProgress();
});

renderScreen('home');
window.speak = speak;
window.showToast = showToast;
window.checkVocab = checkVocab;
window.flipCard = flipCard;
window.quizAnswer = quizAnswer;
window.listenAnswer = listenAnswer;
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.checkPuzzle = checkPuzzle;
window.filterBoard = filterBoard;
