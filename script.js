let playboard = document.querySelector(".play-board");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");

let foodx;
let foody;
let snakex = 5;
let snakey = 10;
let snakeBody = [];
let velocityx = 0,
  velocityy = 0;
let gameOver = false;
let setIntervalId;
let score = 0; 


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;


const randomfood = () => {
  foodx = Math.floor(Math.random() * 30) + 1;
  foody = Math.floor(Math.random() * 30) + 1;
};

const HandleGameOver = () => {
  alert("Game Over! Press OK to replay...");
  clearInterval(setIntervalId);
  location.reload();
};

const changeDirection = (e) => {
  if (e.key === "ArrowRight" && velocityy !=-1 ) {
    velocityx = 0;
    velocityy = 1;
  } else if (e.key === "ArrowLeft" && velocityy !=1) {
    velocityx = 0;
    velocityy = -1;
  } else if (e.key === "ArrowUp" && velocityx !=1) {
    velocityx = -1;
    velocityy = 0;
  } else if (e.key === "ArrowDown" && velocityx != -1) {
    velocityx = 1;
    velocityy = 0;
  }
};

const initGame = () => {
  if (gameOver) return HandleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodx} / ${foody}"></div>`;

  if (snakex === foodx && snakey === foody) {
    randomfood();
    snakeBody.push([foodx, foody]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score" , highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakex, snakey];

  snakex += velocityx;
  snakey += velocityy;

  if (snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  playboard.innerHTML = htmlMarkup;
};

randomfood();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
