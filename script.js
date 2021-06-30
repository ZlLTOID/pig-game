'use strict';
let activePlayer = 0;
let currentScore = 0;
let score0 = 0;
let score1 = 0;

let playerScore = document.querySelector(`#score--${activePlayer}`);
let playerCurrentScore = document.querySelector(`#current--${activePlayer}`);
let playerBackground = document.querySelector(`.player--${activePlayer}`);
playerBackground.classList.add('player--active');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
dice.hidden = true;

function switchPlayer() {
    playerBackground = document.querySelector(`.player--${activePlayer}`);
    playerBackground.classList.toggle('player--active');
    activePlayer = activePlayer ? 0 : 1;
    playerCurrentScore = document.querySelector(`#current--${activePlayer}`);
    playerBackground = document.querySelector(`.player--${activePlayer}`);
    playerBackground.classList.toggle('player--active');
    playerScore = document.querySelector(`#score--${activePlayer}`);
    currentScore = 0;
}

const generateRandomNumber = () => Math.floor(Math.random() * (7 - 1) + 1);

function rollsDice() {
    dice.hidden = false;
    let randomNumber = generateRandomNumber();

    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
        currentScore += randomNumber;
        playerCurrentScore.innerHTML = currentScore;
    } else {
        currentScore = 0;
        playerCurrentScore.innerHTML = currentScore;
        switchPlayer();
    }
}

function holdScore() {
    if (activePlayer === 0) {
        score0 += parseInt(playerCurrentScore.innerHTML);
        playerScore.innerHTML = score0;
        playerCurrentScore.innerHTML = 0;
        playerScore.innerHTML >= 100? playerWins(): switchPlayer();
    } else {
        score1 += parseInt(playerCurrentScore.innerHTML);
        playerScore.innerHTML = score1;
        playerCurrentScore.innerHTML = 0;
        playerScore.innerHTML >= 100? playerWins(): switchPlayer();
    }
}

function playerWins() {
    playerBackground = document.querySelector(`.player--${activePlayer}`);
    playerBackground.classList.add('player--winner');
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
}

function newGame() {
    currentScore = 0;
    score0 = 0;
    score1 = 0;
    dice.hidden = true;
    rollDiceButton.disabled = false;
    holdButton.disabled = false;
    playerScore = document.querySelectorAll('.score');
    playerCurrentScore = document.querySelectorAll('.current-score');
    playerScore[0].innerHTML = 0;
    playerScore[1].innerHTML = 0;
    playerCurrentScore[0].innerHTML = 0;
    playerCurrentScore[1].innerHTML = 0;
    playerBackground = document.querySelector(`.player--${activePlayer}`);
    playerBackground.classList.remove('player--winner');
    playerBackground.classList.toggle('player--active');
    activePlayer = activePlayer ? 0 : 1;
    playerBackground = document.querySelector(`.player--${activePlayer}`);
    playerBackground.classList.toggle('player--active');
    playerScore = document.querySelector(`#score--${activePlayer}`);
    playerCurrentScore = document.querySelector(`#current--${activePlayer}`);
}

rollDiceButton.addEventListener('click', rollsDice);
holdButton.addEventListener('click', holdScore);
newGameButton.addEventListener('click', newGame);


