const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = generateFood();
let intervalId;
let score = 0;

function createGameBoard() {
  const gameBoard = document.getElementById('game-board');

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameBoard.appendChild(cell);
    }
  }
}

function updateGameBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('snake-head', 'snake-body', 'food'));

  snake.forEach((segment, index) => {
    const cellIndex = segment.x + segment.y * boardSize;
    if (index === 0) {
      cells[cellIndex].classList.add('snake-head');
    } else {
      cells[cellIndex].classList.add('snake-body');
    }
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function generateFood() {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return { x, y };
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y = (head.y - 1 + boardSize) % boardSize;
      break;
    case 'down':
      head.y = (head.y + 1) % boardSize;
      break;
    case 'left':
      head.x = (head.x - 1 + boardSize) % boardSize;
      break;
    case 'right':
      head.x = (head.x + 1) % boardSize;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    score++;
    updateScore();
  } else {
    snake.pop();
  }

  if (checkCollision()) {
    clearInterval(intervalId);
    showGameOverMessage();
  }

  updateGameBoard();
}

function checkCollision() {
  const head = snake[0];
  return (
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y) ||
    head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize
  );
}

function showGameOverMessage() {
  const gameOverMessage = document.getElementById('game-over-message');
  gameOverMessage.textContent = `¡Game Over! Puntuación: ${score}`;
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Puntuación: ${score}`;
}

function changeSpeed() {
  const speedSelector = document.getElementById('speed-selector');
  clearInterval(intervalId);
  speed = parseInt(speedSelector.value);
  intervalId = setInterval(moveSnake, speed);
}

document.addEventListener('keydown', handleKeyPress);

createGameBoard();
intervalId = setInterval(moveSnake, speed);