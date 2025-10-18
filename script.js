// 🎮 Memory Card Game
// -------------------
// Handles dynamic board creation, difficulty levels, timer, move/match tracking

// 🔹 DOM Elements
const board = document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const matchesDisplay = document.querySelector("#matches");
const difficultySelect = document.querySelector("#difficulty");
const restartBtn = document.querySelector("#restart");
const timerDisplay = document.querySelector("#timer");

// 🔹 Game State
let moveCount = 0;
let matchCount = 0;
let flippedCards = [];
let timerInterval = null;
let seconds = 0;
let minutes = 0;
let doubleImages = [];

// 🔹 Image Set
const IMAGES = [
  "img/img-1.png",
  "img/img-2.png",
  "img/img-3.png",
  "img/img-4.png",
  "img/img-5.png",
  "img/img-6.png",
  "img/img-7.png",
  "img/img-8.png",
  "img/img-9.png",
  "img/img-10.png",
  "img/img-11.png",
  "img/img-12.png",
];

// -------------------
// 🔹 Event Listeners
// -------------------

// Regenerate board on difficulty change
difficultySelect.addEventListener("change", () => {
  resetGame();
  setupBoard();
});

// Restart game
restartBtn.addEventListener("click", () => {
  resetGame();
  setupBoard();
});

// Initialize default difficulty
setupBoard();

// -------------------
// 🔹 Game Setup
// -------------------

function setupBoard() {
  board.innerHTML = "";
  resetGameState();

  const pairCount = getPairCount(difficultySelect.value);
  const selectedImages = IMAGES.slice(0, pairCount);
  doubleImages = shuffle([...selectedImages, ...selectedImages]);

  doubleImages.forEach((imagePath) => {
    const card = createCard(imagePath);
    board.appendChild(card);
  });
}

function getPairCount(level) {
  switch (level) {
    case "medium": return 8;
    case "hard": return 12;
    default: return 6; // easy
  }
}

// -------------------
// 🔹 Card Creation
// -------------------

function createCard(imagePath) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card__inner">
      <div class="card__front">
        <img src="${imagePath}" class="icon" alt="icon">
      </div>
      <div class="card__back">
        <span class="logo">?</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => handleCardFlip(card));
  return card;
}

// -------------------
// 🔹 Game Logic
// -------------------

function handleCardFlip(card) {
  if (card.classList.contains("is-flipped") || flippedCards.length === 2) return;

  card.classList.add("is-flipped");
  flippedCards.push(card);

  incrementMoveCount();
  startTimer();

  if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
  const [first, second] = flippedCards;
  const firstSrc = first.querySelector("img").src;
  const secondSrc = second.querySelector("img").src;

  if (firstSrc === secondSrc) {
    matchCount++;
    matchesDisplay.textContent = matchCount;

    first.classList.add("is-matched");
    second.classList.add("is-matched");
    flippedCards = [];

    // ✅ Win condition
    if (matchCount === doubleImages.length / 2) {
      setTimeout(() => {
        alert("🎉 You win! All pairs matched!");
        stopTimer();
      }, 300);
    }
  } else {
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
      flippedCards = [];
    }, 1000);
  }
}

// -------------------
// 🔹 Game State Helpers
// -------------------

function incrementMoveCount() {
  moveCount++;
  movesDisplay.textContent = moveCount;
}

function resetGame() {
  board.innerHTML = "";
  resetGameState();
}

function resetGameState() {
  moveCount = 0;
  matchCount = 0;
  flippedCards = [];
  movesDisplay.textContent = moveCount;
  matchesDisplay.textContent = matchCount;
  resetTimer();
}

// -------------------
// 🔹 Timer
// -------------------

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    const min = String(minutes).padStart(2, "0");
    const sec = String(seconds).padStart(2, "0");
    timerDisplay.textContent = `${min}:${sec}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  timerDisplay.textContent = "00:00";
}

// -------------------
// 🔹 Utility
// -------------------

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
