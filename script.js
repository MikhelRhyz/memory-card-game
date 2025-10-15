let cardInners = document.querySelectorAll(".card__inner");
let moveCounter = 0;
const moves = document.querySelector("#moves");
let picks = [];
const matches = document.querySelector("#matches");
let matchCount = 0;
const difficulty = document.querySelector("#difficulty");
const board = document.querySelector("#board");
cardInners.forEach((item) =>
  item.addEventListener("click", () => {
    item.closest(".card").classList.toggle("is-flipped");
    countMove(item);
  })
);
function countMove(item) {
  moveCounter++;
  moves.textContent = moveCounter;
  picks.push(item.querySelector("img").className);
  if (moveCounter % 2 === 0) {
    setTimeout(() => {
      cardInners.forEach((card) =>
        card.closest(".card").classList.remove("is-flipped")
      );
    }, 800);
    if (picks[0] === picks[1]) {
      matchCount++;
      matches.textContent = matchCount;
      picks = [];
    }
  }
  console.log(moveCounter);
}
difficulty.addEventListener("change", () => {
  if (difficulty.value === "easy") {
    for (let i = 10; i > 0; i--) {
      const divCard = document.createElement("div");
      divCard.className = "card";
      divCard.role = "button";
      divCard.tabIndex = "0";
      divCard.ariaPressed = "false";
      const divCardInner = document.createElement("div");
      divCardInner.className = "card__inner";
      const divCardFront = document.createElement("div");
      divCardFront.className = "card__front";
      divCardFront.ariaHidden = "true";
      const img = document.createElement("img");
      img.className = "icon-2";
      img.alt = "icon-2";
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
      divCard.addEventListener("click", () => {
        divCard.classList.toggle("is-flipped");
        countMove(divCardInner);
      });
    }
    cardInners = document.querySelectorAll(".card__inner");
  }
  console.log(difficulty.value);
});
