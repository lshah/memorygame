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

let seconds = 0;
let minutes = 0;
let time;
let clockTick = setInterval(startTime,1000);

function startTime(){
if(seconds < 10){
    seconds = '0'+seconds;
  }
  
  time = minutes + ":" + seconds;
  seconds++;
  if(seconds>60){
    seconds = 0;
    minutes++;
    
  }

  document.querySelector('.time').innerText = time;
}

function stopTime(){
  let finalTime = time;
  clearInterval(clockTick);
  console.log(finalTime);
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
  clockTick;
}

initGame();

// play game
function playGame() {
  let openCards = [];

  allCards.forEach(function(card) {
    card.addEventListener("click", function() {
      
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {
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
    seconds = 0;
    minutes = 0;
    moves = 0;
    initGame();
    playGame();
    document.querySelector(".moves").innerHTML = moves;
    updateStars();
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

let stars = document.getElementsByClassName("star");
let ratings = 3;
function updateStars(){


  if(moves <= 12){
    // do nothing
  }

  else if(moves > 12 && moves <= 20){
  stars[2].classList.remove("show-star");  
  ratings = 2;  
    
  }
  else {
    stars[2].classList.remove("show-star");
    stars[1].classList.remove("show-star");
    ratings = 1;
  }

}

// modal pop-up on Game Over
let popupText = document.querySelector(".pop-up-text");
let container = document.querySelector("[inert]");

function gameOver() {

  let cardsInDeck = allCards.length;
  let matchedCardsInDeck = matchedCards.length;
  
  if (cardsInDeck == matchedCardsInDeck) {
    stopTime();

    let createStar = `<li class="star show-star"><i class="fa fa-star"></i></li>`;
    let finalRating = createStar.repeat(ratings);

    gameOverMessage = 
            `<h1 class="modal-message">Congratulations!</h1>
							<p>Total moves: ${moves}</p>
              <div class="ratings"><ul>${finalRating}</i></li></ul></div>
              <div class="totalTime">Time: ${time}</div>
							<button class="reload" onclick="reloadPage()">Play Again</button>
							<button class="closeBtn" onclick="closeModal()">Close</button>`

    popupText.style.visibility = "visible";
    popupText.innerHTML = gameOverMessage;
    container.style.opacity = "0.5";
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
  document.getElementsByClassName('ratings').visibility = "hidden";
}


