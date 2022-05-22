const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const board = document.querySelector("#board");
let time = 0;
let score = 0;
// let clicks = 0;
// let accuracy = 0;
const colors = [
  "#5F464B",
  "#8E4A49",
  "#7DAA92",
  "#80FFEC",
  "#C2FBEF",
  "#ff7f50",
  "#FC0FC0",
];
const timeEl = document.querySelector("#time");
const timeList = document.querySelector("#time-list");
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});
// board.addEventListener("click", (event) => {
//   if (event.target.classList.contains("board")) {
//     clicks++;
//   }
// });

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Score: <span class = "primary">${score}</span><br>`;
  // board.innerHTML = `<h2>Точность: <span class = "primary"></span></h2>`
  timeEl.parentNode.classList.add("hide");
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  setColor(circle);
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(element) {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 14px ${color}`;
}

// function getAccuracy() {
//   accuracy = score / clicks;
//   return Math.floor(accuracy * 100);
// }
