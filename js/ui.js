import { startGame } from './game.js';

export function startCountdown(event) {
    event.preventDefault();  // デフォルト動作をキャンセル
    event.stopPropagation();  // イベント伝播を防止
    console.log("Countdown started");

    const countdownDisplay = document.getElementById('countdown');
    countdownDisplay.style.display = 'block';
    let countdownValue = 3;
    countdownDisplay.textContent = countdownValue;

    const countdownInterval = setInterval(() => {
        countdownValue -= 1;
        countdownDisplay.textContent = countdownValue;
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.style.display = 'none';
            startGame();  // カウントダウン終了後にゲーム開始
        }
    }, 1000);
}

export function restartGame() {
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('gameOverMessage').style.display = 'none';
    startCountdown();
}
