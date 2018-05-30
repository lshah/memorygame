// a list that holds all the cards in the deck
let cards = [
  "fa-birthday-cake",
  "fa-birthday-cake",
  "fa-paw",
  "fa-paw",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-anchor",
  "fa-anchor",
  "fa-heart",
  "fa-heart",
  "fa-bolt",
  "fa-bolt",
  "fa-code",
  "fa-code"
];

let allCards = [];
let matchedCards = [];

// generate card HTML
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// shuffle card deck
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// initialize game by displaying shuffled deck
function initGame() {
  let deck = document.querySelector(".deck");
  let cardHTML = shuffle(
    cards.map(function(card) {
      return generateCard(card);
    })
  );

  deck.innerHTML = cardHTML.join("");
  allCards = document.querySelectorAll(".card");
  matchedCards = [];
}

initGame();

// play game
function playGame() {
  let openCards = [];

  allCards.forEach(function(card) {
    card.addEventListener("click", function() {
      updateMoves();
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {
        openCards.push(card);
        card.classList.add("open", "show");

        // if 2 cards in array
        if (openCards.length == 2) {
          if (openCards[0].dataset.card == openCards[1].dataset.card) {
            matchedCards.push(card)[0];
            matchedCards.push(card)[1];

            openCards[0].classList.add("match");

            openCards[1].classList.add("match");

            openCards = [];
            gameOver();
          } else {
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
            }, 1000);
          }
        }
      }
    });
  });
}

playGame();

// restart the game
function restartGame() {
  let restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", function() {
    initGame();
    playGame();
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
    updateStars();

    console.log("restart button clicked");
  });
}

restartGame();

// update moves everytime user clicks on a card
let moves = 0;
function updateMoves() {
  moves += 1;
  document.querySelector(".moves").innerHTML = moves;
  updateStars();
}

// update stars based on number of moves made
function updateStars() {
  let stars = document.getElementsByClassName("star");
  if (moves <= 16) {
    stars[2].style.display = "inline-block";
    stars[1].style.display = "inline-block";
    console.log("3 stars");
  } else if (moves > 16 && moves <= 32) {
    stars[2].style.display = "none";
    console.log("2 stars");
  } else {
    console.log("1 star");
    stars[1].style.display = "none";
  }
}

// modal pop-up on Game Over
let popupText = document.querySelector(".pop-up-text");
function gameOver() {
  let cardsInDeck = allCards.length;
  let matchedCardsInDeck = matchedCards.length;

  let container = document.querySelector(".container");

  if (cardsInDeck == matchedCardsInDeck) {
    gameOverMessage = `<p class="modal-message">Game Over</p>
							<p>Total moves: ${moves}</p>
							<button class="reload" onclick="reloadPage()">Play Again</button>
							<button class="closeBtn" onclick="closeModal()">Close</button>`;
    popupText.style.visibility = "visible";
    popupText.innerHTML = gameOverMessage;
    container.style.opacity = "0.4";
    console.log("Game Over");
  }
}

// reload page -- used in modal
function reloadPage() {
  location.reload();
}

// close modal and refresh page -- used in modal
function closeModal() {
  popupText.style.visibility = "hidden";
  reloadPage();
}
