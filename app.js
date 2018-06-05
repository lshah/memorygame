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
let openCards = [];
let matchedCards = [];
let moves = 0;
let seconds = 0;
let minutes = 0;
let time;
let stars = document.getElementsByClassName("star");
let ratings = 3;
let container = document.querySelector("[inert]");
let popupText = document.querySelector(".pop-up-text");
let createStar = `<li class="star show-star"><i class="fa fa-star"></i></li>`;
let clockTick = setInterval(startTime, 1000);

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

// start timer for game
function startTime() {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  time = minutes + ":" + seconds;
  seconds++;
  if (seconds > 60) {
    seconds = 0;
    minutes++;
  }

  document.querySelector(".time").innerText = time;
}

// stop timer for game
function stopTime() {
  let finalTime = time;
  clearInterval(clockTick);
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

  seconds = 0;
  minutes = 0;
  startTime();

  moves = 0;
  ratings = 3;

  updateStars();
}

initGame();


let autoCloseTimeout;


function clearCards(){
  openCards.forEach(function(card){
    card.classList.remove("open","show");
  });
  openCards = [];
}


// play game
function playGame() {
  // let openCards = [];

  allCards.forEach(function(card) {
    card.addEventListener("click", function() {
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {

        if (openCards.length == 2) {
          clearInterval(autoCloseTimeout);
          clearCards();
        }

        openCards.push(card);
        card.classList.add("open", "show");

        // if 2 cards in array
        if (openCards.length == 2) {
          

          updateMoves();
          if (openCards[0].dataset.card == openCards[1].dataset.card) {
            
            matchedCards.push(card)[0];
            matchedCards.push(card)[1];
            openCards[0].classList.add("match");

            openCards[1].classList.add("match");

            openCards = [];
            motivation();
            gameOver();
          } else {
            autoCloseTimeout = setTimeout(clearCards,1000);
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
    let clockTick = setInterval(startTime, 1000);
    initGame();
    playGame();
    document.querySelector(".moves").innerHTML = moves;
  });
}

restartGame();

// update moves everytime user clicks on a card
function updateMoves() {
  moves += 1;
  document.querySelector(".moves").innerHTML = moves;
  updateStars();
}

// update stars based on number of moves made
function updateStars() {
  if (moves <= 10) {
    ratings = 3;
  } else if (moves > 10 && moves <= 20) {
    ratings = 2;
  } else {
    ratings = 1;
  }

  let starRating = createStar.repeat(ratings);
  let gameRating = document.querySelector(".score-panel ul");
  gameRating.innerHTML = starRating;
}

// modal pop-up on Game Over
function gameOver() {
  let cardsInDeck = allCards.length;
  let matchedCardsInDeck = matchedCards.length;

  if (cardsInDeck == matchedCardsInDeck) {
    stopTime();

    popupText.style.visibility = "visible";
    container.style.opacity = "0.5";

    let modalMoves = document.querySelector(".modal-message span");
    modalMoves.innerHTML = moves;

    let finalRating = createStar.repeat(ratings);
    let modalRating = document.querySelector(".ratings ul");
    modalRating.innerHTML = finalRating;

    let modalTime = document.querySelector(".totalTime span");
    modalTime.innerHTML = time;
  }
}

// reload page -- used in modal
function reloadPage() {
  location.reload();
}

// close modal and refresh page -- used in modal
function closeModal() {
  popupText.style.visibility = "hidden";
  container.style.opacity = "1";
  let modalRating = document.querySelector(".ratings");
  let modalUl = document.querySelector(".ratings ul");
  modalRating.removeChild(modalUl);
}

//random messages that will display some times when the cards match
function motivation(){
  let matchingCards = matchedCards.length;
  let messageList = document.getElementsByClassName("messages").length;
  
  let messageNumber = Math.floor(Math.random()*messageList);
  
  let message = document.getElementsByClassName('messages')[messageNumber];

  if(matchingCards >= 2){
    message.classList.add("show-message");
  }
}