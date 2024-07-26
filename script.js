

  let score = 0;
  let wrongGuesses = 0;
  let timerInterval;
  let remainingTime = 60;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Added return statement
  }
  document.getElementById("score").style.display = "none";
  function startGame() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("score").style.display = "block";

    score = 0;
    wrongGuesses = 0;
    remainingTime = 60;
    // Make the timer visible
    document.getElementById("timer").style.display = "block";
    updateTimerDisplay();
    startTimer();
    startRound();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      remainingTime--;
      updateTimerDisplay();
      if (remainingTime === 0) {
        endGame(); // Call endGame function when the time is up
      }
    }, 1000);
  }

  function restartGame() {
    document.getElementById("gameOverScreen").style.display = "none";
    score = 0;
    wrongGuesses = 0;
    remainingTime = 60;
    updateTimerDisplay(); // Calling the new function to update the timer display
    resetHeartDisplay();
    clearInterval(timerInterval);
    startTimer();
    startRound();
  }

  function evaluateGuess(guess) {
    if (guess === correctAnswer) {
      score++;
    } else {
      wrongGuesses++;
    }

    if (wrongGuesses === 3 || remainingTime === 0) {
      endGame(); // Call endGame function when the game is over
      return;
    }

    updateLivesDisplay();

    startRound();
  }

  function updateLivesDisplay() {
    const hearts = document.querySelectorAll(".heart");
    for (let i = 0; i < wrongGuesses; i++) {
      hearts[i].classList.add("inactive");
    }
  }

  function resetHeartDisplay() {
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((heart) => heart.classList.remove("inactive"));
  }

  function startRound() {
    if (wrongGuesses === 3) {
      alert("Game over!");
      return;
    }
    shuffle(flagImages);
    correctAnswer = Math.floor(Math.random() * 3);
    document.getElementById("flagName").innerHTML =
      flagImages[correctAnswer].name;
    for (let i = 0; i < 3; i++) {
      const flagDiv = document.getElementsByClassName(`flag${i + 1}`)[0];
      const img =
        flagDiv.getElementsByTagName("img")[0] || document.createElement("img");
      img.src = flagImages[i].image;
      img.onclick = function () {
        evaluateGuess(i);
      };
      flagDiv.appendChild(img);
    }
  }

  function updateTimerDisplay() {
    document.getElementById(
      "timer"
    ).innerHTML = `Time: ${remainingTime} seconds`;
  }

  function endGame() {
    clearInterval(timerInterval);
    document.getElementById("gameOverScreen").style.display = "flex";
    document.getElementById("correctGuesses").innerText = score;
  }

  updateTimerDisplay();


let correctGuessesInRow = 0;
let lives = 3;

function updateHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.remove('inactive');
        } else {
            heart.classList.add('inactive');
        }
    });
}

function correctGuess() {
    correctGuessesInRow++;
    document.getElementById('correctGuesses').textContent = correctGuessesInRow;
    if (correctGuessesInRow % 3 === 0) {
        lives++;
        updateHearts();
    }
}

function resetStreak() {
    correctGuessesInRow = 0;
    document.getElementById('correctGuesses').textContent = correctGuessesInRow;
}

document.addEventListener('DOMContentLoaded', () => {
    updateHearts();
});


