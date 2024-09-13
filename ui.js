import { startGame, resetBallAndPaddle, draw } from './game.js';
import { displayRanking } from './ranking.js';

const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverMessage = document.getElementById('gameOverMessage');
const championMessage = document.getElementById('championMessage');
const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const nameInputForm = document.getElementById('nameInputForm');
let score = 0;

export function updateScore() {
    score += 1;
    scoreDisplay.textContent = `スコア: ${score}`;
}

export function gameOver() {
    gameOverMessage.style.display = 'block';
    restartButton.style.display = 'block';
    nameInputForm.style.display = 'block';
    isGameOver = true;
}

export function resetGame() {
    score = 0;
    scoreDisplay.textContent = `スコア: ${score}`;
    gameOverMessage.style.display = 'none';
    restartButton.style.display = 'none';
    nameInputForm.style.display = 'none';
    championMessage.style.display = 'none';
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

export function handleTouchMove(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    touchX = e.touches[0].clientX - rect.left;
}
