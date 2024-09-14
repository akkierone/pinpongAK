import { updateScore, gameOver } from './ranking.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverMessage = document.getElementById('gameOverMessage');
const championMessage = document.getElementById('championMessage');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const nameInputForm = document.getElementById('nameInputForm');
const countdownDisplay = document.getElementById('countdown');

let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 5;
let dy = -5;
let touchX = null;
let isGameOver = false;
let score = 0;
let speedIncreaseFactor = 0.2;
let isGameStarted = false;

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.9, 600);
    canvas.height = canvas.width * 0.6;
    paddleWidth = canvas.width / 6;
    paddleX = (canvas.width - paddleWidth) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - 10, paddleWidth, 10);
    ctx.fillStyle = "#00FFDD";
    ctx.fill();
    ctx.closePath();
}

export function draw() {
    if (!isGameOver && isGameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                updateScore();
            } else {
                gameOver();
            }
        }

        x += dx;
        y += dy;

        if (touchX !== null) {
            paddleX = touchX - paddleWidth / 2;
        }

        requestAnimationFrame(draw);
    }
}

export function startCountdown() {
    countdownDisplay.style.display = 'block';
    let countdownValue = 3;
    countdownDisplay.textContent = countdownValue;
    const countdownInterval = setInterval(() => {
        countdownValue -= 1;
        countdownDisplay.textContent = countdownValue;
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.style.display = 'none';
            startGame();
        }
    }, 1000);
}

export function startGame() {
    isGameOver = false;
    isGameStarted = true;
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    nameInputForm.style.display = 'none';
    championMessage.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `スコア: ${score}`;
    resetGame();
    draw();
}

export function restartGame() {
    isGameOver = false;
    isGameStarted = true;
    restartButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    nameInputForm.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `スコア: ${score}`;
    dx = 5;
    dy = -5;
    resetGame();
    draw();
}

function resetGame() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
}
