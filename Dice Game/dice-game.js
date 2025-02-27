'use strict'

/* "EL" = "Element" */

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnWins = document.querySelector('.btn--wins');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    btnWins.classList.remove('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function (){
    if (playing){
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6)+1;
    
        // 2. Display dice
        btnWins.classList.add('hidden');
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        // 3. Check for rolled:1, if true : switch to next player
         if (dice !== 1){
            // Add dice to current score
            currentScore += dice;
            /* current0El.textContent = currentScore; */
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
         } else {
            // Switch to the next player
            switchPlayer();
         }
    }
});

btnHold.addEventListener('click', function () {
    if (playing){
    // 1. Active current score to active player's score
    scores[activePlayer] += currentScore;
    /* scores[1] = scores[1] + currentScore; */

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    btnWins.classList.add('hidden');

    // 2. Check if player's score is >= 50
    if(scores[activePlayer] >= 50){
        // Finish the game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`#name--${activePlayer}`).textContent = '🎉 Winner 🏅'
    } else {
        // 3. Switch to the next player 
        switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
