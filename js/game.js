let isGameStarted = false;
let score = 0;

export function startGame() {
    isGameStarted = true;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameOverMessage').style.display = 'none';
    document.getElementById('championMessage').style.display = 'none';
    resetGame(); // ゲームの初期化
    draw(); // ゲームの描画を開始
}

export function resetGame() {
    score = 0;
    document.getElementById('scoreDisplay').textContent = `スコア: ${score}`;
    // ゲームの初期状態にリセットする処理を追加
}

function draw() {
    if (!isGameStarted) return;
    // ゲームの描画処理を記述
    // プレイヤーの操作、ボールの動きなど
    updateScore();
}

function updateScore() {
    score += 1; // スコアを更新
    document.getElementById('scoreDisplay').textContent = `スコア: ${score}`;
}
