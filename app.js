// все все переменные глобал скоупа

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
let randomNum;
setTheRandomNum();
let scorepointsFirst = 0;
let scorepointsSecond = 0;
let numOfFOP = 0;
let numOfSOP = 0;

// удаляем классы, чтобы они не картинки не накладывались друг на друга и все корректно отображалось

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

// показываем изображение кубика согласно рандомному числу

function addClassToUnhideDice() {
  for (let i = 0; i < dice.length; i++) {
    if (dice[i].classList.contains(String(randomNum))) {
      dice[i].classList.remove("hidden");
      dice[i].classList.add("dice-position-active");
    }
  }
}

// создаем рандомное число

function setTheRandomNum() {
  randomNum = Math.ceil(Math.random() * 6);
}

// функционал смены игрока

function swapPlayers() {
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle("actual");
    players[i].classList.toggle("inactive");
  }
}

// устанавливаем 0 очков в табле с очками

function setZeroPoints() {
  for (let i = 0; i < players.length; i++) {
    firstActualScorepoints.textContent = 0;
    scorepointsFirst = 0;
    secondActualScorepoints.textContent = 0;
    scorepointsSecond = 0;
  }
}

// начисляем очки

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

// добавляем очки из табла в "оверол"

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

// проверка на выигрыш

function check() {
  if (Number(firstOverallPoints.textContent) >= 100) {
    gameOver.textContent = "Первый игрок победил!";
    showModalWindow();
  } else if (Number(secondOverallPoints.textContent) >= 100) {
    gameOver.textContent = "Второй игрок победил!";
    showModalWindow();
  }
}

// новая игра

function newGame() {
  location.reload();
}

// показываем модальное окно

function showModalWindow() {
  for (let i = 0; i < showModal.length; i++) {
    showModal[i].classList.remove("hidden-window");
  }
}

// навешиваем ивентхендлер на нашу кнопку кинуть кубик и добавляем все нужные функции, описанные выше

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

// навешиваем ивентхендлер на нашу кнопку оставить очки и добавляем все нужные функции, описанные выше

btnSwap.addEventListener("click", () => {
  sumThePoints();
  check();
  setZeroPoints();
  swapPlayers();
  setTheRandomNum();
});

// навешиваем ивентхендлер на нашу кнопку новая игра и добавляем все нужные функции, описанные выше

btnNewGame.addEventListener("click", () => {
  newGame();
});

// просто вторая кнопка в модалке

secondBtnNewGame.addEventListener("click", () => {
  newGame();
});
