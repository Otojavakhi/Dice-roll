'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

//Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Invisible dice on starting position
dice.classList.add('hidden');

// Starting Contidions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

currentScore0El.textContent = currentScore;
currentScore1El.textContent = currentScore;
score0El.textContent = 0;
score1El.textContent = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// add functionality to the Roll Dice Button
btnRoll.addEventListener('click', function () {
  if (playing) {
    const score = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${score}.png`;
    if (score !== 1) {
      currentScore += score;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Button Hold saves all scores
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Button new game resets all conditions
btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;
});
