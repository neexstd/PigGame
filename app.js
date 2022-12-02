const btnNewGame = document.querySelector(".btn-newgame");
const btnThrow = document.querySelector(".btn-dish");
const btnSwap = document.querySelector(".btn-stay");
const secondBtnNewGame = document.querySelector(".newgamebtn");
const dice = document.querySelectorAll(".dice");
const players = document.querySelectorAll(".game__player-item");
const firstActualScorepoints = document.querySelector(".scoreboard-first");
const secondActualScorepoints = document.querySelector(".scoreboard-second");
const firstOverallPoints = document.querySelector(".scorepoints-first");
const secondOverallPoints = document.querySelector(".scorepoints-second");
const closeModal = document.querySelector(".close-modal-window");
const showModal = document.querySelectorAll(".hidden-window");
const gameOver = document.querySelector(".gameover");
let randomNum = Math.ceil(Math.random() * 6);
let scorepointsFirst = 0;
let scorepointsSecond = 0;
let numOfFOP = 0;
let numOfSOP = 0;

function setClassesToRemoveDice() {
  for (let i = 0; i < dice.length; i++) {
    if (
      !dice[i].classList.contains("hidden") &&
      dice[i].classList.contains("dice-position-active")
    ) {
      dice[i].classList.add("hidden");
      dice[i].classList.remove("dice-position-active");
    }
  }
}

function addClassToUnhideDice() {
  for (let i = 0; i < dice.length; i++) {
    if (dice[i].classList.contains(String(randomNum))) {
      dice[i].classList.remove("hidden");
      dice[i].classList.add("dice-position-active");
    }
  }
}

function setTheRandomNum() {
  randomNum = Math.ceil(Math.random() * 6);
}

function swapPlayers() {
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle("actual");
  }
}

function setZeroPoints() {
  for (let i = 0; i < players.length; i++) {
    firstActualScorepoints.textContent = 0;
    scorepointsFirst = 0;
    secondActualScorepoints.textContent = 0;
    scorepointsSecond = 0;
  }
}

function pointsEarn() {
  for (let i = 0; i < players.length; i++) {
    if (
      players[i].classList.contains("actual") &&
      players[i].classList.contains("first")
    ) {
      scorepointsFirst += randomNum;
      firstActualScorepoints.textContent = scorepointsFirst;
    } else if (
      players[i].classList.contains("actual") &&
      players[i].classList.contains("second")
    ) {
      scorepointsSecond += randomNum;
      secondActualScorepoints.textContent = scorepointsSecond;
    }
  }
}

function sumThePoints() {
  for (let i = 0; i < players.length; i++) {
    if (
      players[i].classList.contains("actual") &&
      players[i].classList.contains("first")
    ) {
      numOfFOP += Number(firstActualScorepoints.textContent);
      firstOverallPoints.textContent = String(numOfFOP);
    } else if (
      players[i].classList.contains("actual") &&
      players[i].classList.contains("second")
    ) {
      numOfSOP += Number(secondActualScorepoints.textContent);
      secondOverallPoints.textContent = String(numOfSOP);
    }
  }
}

function check() {
  if (Number(firstOverallPoints.textContent) >= 100) {
    gameOver.textContent = "Первый игрок победил!";
    showModalWindow();
  } else if (Number(secondOverallPoints.textContent) >= 100) {
    gameOver.textContent = "Второй игрок победил!";
    showModalWindow();
  }
}

function newGame() {
  location.reload();
}

function showModalWindow() {
  for (let i = 0; i < showModal.length; i++) {
    showModal[i].classList.remove("hidden-window");
  }
}

btnThrow.addEventListener("click", () => {
  switch (randomNum) {
    case 1:
      setClassesToRemoveDice();
      addClassToUnhideDice();
      setZeroPoints();
      swapPlayers();
      setTheRandomNum();
      break;
    default:
      setClassesToRemoveDice();
      addClassToUnhideDice();
      pointsEarn();
      setTheRandomNum();
  }
});

btnSwap.addEventListener("click", () => {
  sumThePoints();
  check();
  setZeroPoints();
  swapPlayers();
  setTheRandomNum();
});

btnNewGame.addEventListener("click", () => {
  newGame();
});

secondBtnNewGame.addEventListener("click", () => {
  newGame();
});

// closeModal.addEventListener("click", () => {
//   for (let i = 0; i < showModal.length; i++) {
//     showModal[i].classList.add("hidden-window");
//   }
// });
