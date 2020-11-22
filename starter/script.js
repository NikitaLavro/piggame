'use strict';

//Selecting  elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//Selecting dice element
const diceEl = document.querySelector('.dice');
//Selecting buttons elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const gameStartText = document.getElementById('gameStartText');

//Seting score valules for both player to 0
score0El.textContent = 0;
score1El.textContent = 0;
//Hiding dice icon
diceEl.classList.add('hidden');

//Current score value// Cannot be set in the funtion itself because everytime we would call the function the score would be reset back to 0
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
//Used for then someone won the game in order to stop executing the code.
let playing = true;

const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //if the class is there - then remove/ if not there - then add
  player1El.classList.toggle('player--active');
};

//Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;
    //3. Check if rolled 1: true, if so then switch to the next player and loose curent points
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to another player/Set current player`s score to 0/ Changing background
      swithPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player total score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + curretScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score >= 100
    //finish the gme
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add('hidden');
    } else {
      swithPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  for (let i = 0; i <= 1; i++) {
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove(`player--winner`);
  }
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  activePlayer = 0;
  playing = true;
});
