/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-birthday-cake','fa-birthday-cake',
				'fa-paw','fa-paw',
				'fa-leaf','fa-leaf',
				'fa-bicycle','fa-bicycle',
				'fa-anchor','fa-anchor',
				'fa-heart','fa-heart',
				'fa-bolt','fa-bolt',
				'fa-code','fa-code'
			];

// generate card HTML
function generateCard(card){
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// shuffle card deck
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
function initGame (){
	let deck = document.querySelector('.deck');
	let cardHTML = shuffle(cards.map(function(card){
		return generateCard(card);
	}));

	deck.innerHTML = cardHTML.join('');

}

initGame();

let allCards = document.querySelectorAll('.card');
let matchedCards = [];

// play game
function playGame(){
	let openCards = [];

	allCards.forEach(function(card){
		card.addEventListener('click', function(){
			updateMoves();
			if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
				
				openCards.push(card);
				card.classList.add('open','show');

				// if 2 cards in array
				if(openCards.length == 2){

					if(openCards[0].dataset.card == openCards[1].dataset.card){
					matchedCards.push(card)[0];
					matchedCards.push(card)[1];

					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');
					
					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');

					
					openCards = [];
					gameOver();


				} else {
						setTimeout(function(){
							openCards.forEach(function(card){
								card.classList.remove('open','show');
								
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

function restartGame(){
	let restartBtn = document.querySelector('.restart');
	restartBtn.addEventListener('click',function(){
	initGame();
	playGame();
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
		updateStars();

	console.log("restart button clicked");
});
}

restartGame();

let moves = 0;
function updateMoves(){
		
		moves += 1;
		document.querySelector('.moves').innerHTML = moves;
		updateStars();
};

function updateStars(){
	let stars = document.getElementsByClassName('star');
		if(moves <= 16){
			stars[2].style.display = "inline-block";
			stars[1].style.display = "inline-block";
			console.log("3 stars");
		}
		else if (moves >16 && moves <=32){
			stars[2].style.display = "none";
			console.log("2 stars");
		}
		else {
			console.log("1 star");
			stars[1].style.display = "none";
}
}

function gameOver(){
	let cardsInDeck = allCards.length;
	let matchedCardsInDeck = matchedCards.length;
	if(cardsInDeck == matchedCardsInDeck){
		alert("Game Over" + " Moves: " + moves);
		console.log("Game Over");
	}
}

