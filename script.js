let moveCounter = 0;
const moves = document.querySelector("#moves");
const matches = document.querySelector("#matches");
let matchCount = 0;
const difficulty = document.querySelector("#difficulty");
const board = document.querySelector("#board");
const numbers = [];
let flippedCards = [];
const restartBtn = document.querySelector("#restart");
const timerDisplay = document.querySelector("#timer");
let sec = 0;
let min = 0;
let timerInterval = null;
const images = [
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

// 🔹 Reset and generate board on difficulty change
difficulty.addEventListener("change", () => {
  board.innerHTML = "";
  resetGameState();
  checkDifficulty();
});

//restart game
restartBtn.addEventListener("click", () => {
  board.innerHTML = "";
  resetGameState();
  checkDifficulty();
});

checkDifficulty();

function checkDifficulty() {
  board.innerHTML = "";
  numbers.length = 0;
  resetGameState();

  let pairCount;

  if (difficulty.value === "easy") {
    pairCount = 6;
  } else if (difficulty.value === "medium") {
    pairCount = 8;
  } else if (difficulty.value === "hard") {
    pairCount = 12;
  }

  const imagesToUse = images.slice(0, pairCount);
  const doubleImages = [...imagesToUse, ...imagesToUse];

  //generate pairs
  for (let i = 1; i <= pairCount; i++) {
    numbers.push(i, i);
  }

  //shuffle
  for (let i = numbers.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    [doubleImages[i], doubleImages[j]] = [doubleImages[j], doubleImages[i]];
  }

  // create number of cards
  for (let i = 0; i < numbers.length; i++) {
    const divCard = document.createElement("div");
    divCard.className = "card";
    divCard.innerHTML = `<div class="card__inner">
      <div class="card__front">
        <img src="${doubleImages[i]}" class="icon-${numbers[i]}" alt="icon-${numbers[i]}">
      </div>
      <div class="card__back">
        <span class="logo">?</span>
      </div>
    </div>`;

    // const divCardInner = document.createElement("div");
    // divCardInner.className = "card__inner";

    // const divCardFront = document.createElement("div");
    // divCardFront.className = "card__front";

    // const img = document.createElement("img");
    // img.className = `icon-${numbers[i]}`;
    // img.alt = `icon-${numbers[i]}`;

    // const divCardBack = document.createElement("div");
    // divCardBack.className = "card__back";

    // const logo = document.createElement("span");
    // logo.className = "logo";
    // logo.textContent = "?";

    // divCardFront.appendChild(img);
    // divCardBack.appendChild(logo);
    // divCardInner.appendChild(divCardFront);
    // divCardInner.appendChild(divCardBack);
    // divCard.appendChild(divCardInner);
    board.appendChild(divCard);

    // Add flip behavior
    divCard.addEventListener("click", () => {
      const inner = divCard.querySelector(".card__inner");

      // Ignore if already flipped or two cards are waiting
      if (divCard.classList.contains("is-flipped") || flippedCards.length === 2)
        return;

      divCard.classList.add("is-flipped");
      flippedCards.push(divCard);
      countMove();
      startTimer();
    });
  }

  console.log("Difficulty: ", difficulty.value, " | Cards:", numbers.length);
}

function countMove() {
  moveCounter++;
  moves.textContent = moveCounter;
  
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    const firstIcon = firstCard.querySelector("img").src;
    const secondIcon = secondCard.querySelector("img").src;

    if (firstIcon === secondIcon) {
      matchCount++;
      matches.textContent = matchCount;
      firstCard.classList.add("is-matched");
      secondCard.classList.add("is-matched");

      flippedCards = [];

      // ✅ Check for game completion
      const totalPairs = numbers.length / 2;

      if (matchCount === totalPairs) {
        setTimeout(() => {
          alert("You win! All Pairs matched!");
          stopTimer();
        }, 300);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

//  Reset game state variables
function resetGameState() {
  moveCounter = 0;
  matchCount = 0;
  flippedCards = [];
  moves.textContent = moveCounter;
  matches.textContent = matchCount;
  resetTimer();
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    }

    const formattedMin = String(min).padStart(2, "0");
    const formattedSec = String(sec).padStart(2, "0");

    timerDisplay.textContent = `${formattedMin}:${formattedSec}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  sec = 0;
  min = 0;
  timerDisplay.textContent = "00:00";
}
