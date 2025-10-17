let moveCounter = 0;
let cardInners;
const moves = document.querySelector("#moves");
let picks = [];
const matches = document.querySelector("#matches");
let matchCount = 0;
const difficulty = document.querySelector("#difficulty");
const board = document.querySelector("#board");
const numbers = [];
let flippedCards = [];

console.log(numbers);

difficulty.addEventListener("change", () => {
  board.innerHTML = "";
  checkDifficulty();
});

function checkDifficulty() {
  board.innerHTML = "";
  numbers.length = 0;

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
    for (let i = 12; i > 0; i--) {
      const divCard = document.createElement("div");
      divCard.className = "card";

      const divCardInner = document.createElement("div");
      divCardInner.className = "card__inner";

      const divCardFront = document.createElement("div");
      divCardFront.className = "card__front";

      const img = document.createElement("img");
      img.className = `icon-${numbers[i - 1]}`;
      img.alt = `icon-${numbers[i - 1]}`;

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
  console.log("Difficulty: ", difficulty.value);
}
checkDifficulty();
