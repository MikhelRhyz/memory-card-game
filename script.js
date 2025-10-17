let moveCounter = 0;
const moves = document.querySelector("#moves");
const matches = document.querySelector("#matches");
let matchCount = 0;
const difficulty = document.querySelector("#difficulty");
const board = document.querySelector("#board");
const numbers = [];
let flippedCards = [];

// 🔹 Reset and generate board on difficulty change
difficulty.addEventListener("change", () => {
  board.innerHTML = "";
  resetGameState();
  checkDifficulty();
});

checkDifficulty();

function checkDifficulty() {
  board.innerHTML = "";
  numbers.length = 0;
  resetGameState();

  if (difficulty.value === "easy") {
    //generatae pairs 1 - 6
    for (let i = 1; i <= 6; i++) {
      numbers.push(i, i);
    }

    //shuffle
    for (let i = numbers.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    //create 12 cards
    for (let i = 0; i < 12; i++) {
      const divCard = document.createElement("div");
      divCard.className = "card";

      const divCardInner = document.createElement("div");
      divCardInner.className = "card__inner";

      const divCardFront = document.createElement("div");
      divCardFront.className = "card__front";

      const img = document.createElement("img");
      img.className = `icon-${numbers[i]}`;
      img.alt = `icon-${numbers[i]}`;

      const divCardBack = document.createElement("div");
      divCardBack.className = "card__back";

      const logo = document.createElement("span");
      logo.className = "logo";
      logo.textContent = "?";

      divCardFront.appendChild(img);
      divCardBack.appendChild(logo);
      divCardInner.appendChild(divCardFront);
      divCardInner.appendChild(divCardBack);
      divCard.appendChild(divCardInner);
      board.appendChild(divCard);

      // inside checkDifficulty() after generating each card
      divCard.addEventListener("click", () => {
        const inner = divCard.querySelector(".card__inner");

        // Ignore if already flipped or two cards are waiting
        if (
          divCard.classList.contains("is-flipped") ||
          flippedCards.length === 2
        )
          return;

        divCard.classList.add("is-flipped");
        flippedCards.push(divCard);
        countMove(inner);
      });
    }
  }
}

function countMove(){
  moveCounter++;
  moves.textContent = moveCounter;

  if(flippedCards.length === 2){
    const [firstCard, secondCard] = flippedCards;
    const firstIcon = firstCard.querySelector("img").className;
    const secondIcon = secondCard.querySelector("img").className;

    if(firstIcon === secondIcon){
      matchCount++;
      matches.textContent = matchCount;

      flippedCards = [];
       
      // ✅ Check for game completion
      const totalPairs = numbers.length / 2;

      if(matchCount === totalPairs){
        setTimeout(() => {
          alert("You win! All Pairs matched!")
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
function resetGameState(){
  moveCounter = 0;
  matchCount = 0;
  flippedCards = [];
  moves.textContent = moveCounter;
  matches.textContent = matchCount;
}