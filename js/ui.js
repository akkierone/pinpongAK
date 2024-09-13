import { startGame } from './game.js';

export function startCountdown() {
    console.log("Countdown started");  // デバッグ用のログを追加
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
            startGame(); // カウントダウン終了後にゲームを開始
        }
    }, 1000);
}

export function restartGame() {
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('gameOverMessage').style.display = 'none';
    startCountdown(); // ゲームを再スタート
}
