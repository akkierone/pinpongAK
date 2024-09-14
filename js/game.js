export function startCountdown() {
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
            startGame();
        }
    }, 1000);
}

export function startGame() {
    // ゲームのロジック...
    // スタート処理をここに書く
}

export function restartGame() {
    // リスタート処理
}
