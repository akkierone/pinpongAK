let isGameStarted = false;
let score = 0;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ゲームの開始
export function startGame() {
    console.log("Game started");
    isGameStarted = true;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameOverMessage').style.display = 'none';
    document.getElementById('championMessage').style.display = 'none';
    resetGame();
    draw();
}

// ゲームのリセット
export function resetGame() {
    score = 0;
    document.getElementById('scoreDisplay').textContent = `スコア: ${score}`;
    // Canvasなどの初期化処理をここに記載
}

// ゲームの描画
function draw() {
    if (!isGameStarted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 画面クリア
    // ボールやバーの描画処理を記述
    updateScore();
}

function updateScore() {
    score += 1;  // スコアの更新
    document.getElementById('scoreDisplay').textContent = `スコア: ${score}`;
}
