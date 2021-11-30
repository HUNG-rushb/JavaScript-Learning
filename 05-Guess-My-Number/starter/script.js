'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;

let score = 20;
let highScore = 0;

// Check handler
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // Score > 0 => playable
  if (score > 0) {
    // When there is no input
    if (!guess) {
      //   document.querySelector('.number').textContent = 'Guess your number!';
      document.querySelector('.message').textContent =
        '👈😡 There is no number!';
    }

    // When player win
    else if (guess === secretNumber) {
      document.querySelector('.message').textContent =
        '🎉Correct Number! YAY!🎉';

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '80rem';

      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.status-title').textContent = 'You win!!! :D';

      setHighScore();
    }

    // Guess wrong
    // When guess is too high
    else if (guess > secretNumber) {
      displayMessage(
        guess > 20
          ? '📈Too high❌. Below 20 plz...'
          : '📈Too high❌. Lower plz...'
      );
      score--;
      document.querySelector('.score').textContent = score;
    }
    // When guess is too low
    else if (guess < secretNumber) {
      displayMessage(
        guess < +1
          ? '📉Too low❌. Above 1 plz...'
          : '📉Too low❌. Higher plz...'
      );
      score--;
      document.querySelector('.score').textContent = score;
    }
  }

  // Score == 0 => Lose
  if (score === 0) {
    document.querySelector('.message').textContent = '☠ You lost the game';

    document.querySelector('body').style.backgroundColor = '#e62e00';
    document.querySelector('.number').style.width = '80rem';

    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.status-title').textContent = 'You lost... :P';
  }
});

// Play again
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = secretNumber;
  //   document.querySelector('.number').textContent = '?';

  score = 20;
  document.querySelector('.score').textContent = score;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.status-title').textContent = 'Guess My Number!';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// Set highscore
function setHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}
