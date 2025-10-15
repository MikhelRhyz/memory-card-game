const cardInners = document.querySelectorAll(".card__inner");
let moveCounter = 0;
const moves = document.querySelector("#moves");
let picks = [];
const matches = document.querySelector("#matches");
let matchCount = 0;

cardInners.forEach((item) =>
  item.addEventListener("click", () => {
    item.closest(".card").classList.toggle("is-flipped");
    moveCounter++;
    moves.textContent = moveCounter;
    picks.push(item.querySelector("img").className)

    if (moveCounter % 2 === 0) {
      setTimeout(() => {
        cardInners.forEach((card) =>
          card.closest(".card").classList.remove("is-flipped")
        );
      }, 800);

      if(picks[0] === picks[1]){
        matchCount++;
        matches.textContent = matchCount;

        picks = [];
      }
    }

    console.log(picks)
  })
);
