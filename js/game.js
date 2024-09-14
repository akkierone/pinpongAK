let ballSpeedX = 2;
let ballSpeedY = 4;
let ballX = 150;
let ballY = 200;
let paddleX = 125;
const paddleWidth = 100;
const paddleHeight = 10;
const canvasWidth = window.innerWidth - 40; // スマホの幅に最適化
const canvasHeight = window.innerHeight - 200; // スマホの高さに最適化
let isGameRunning = false;

function startGame() {
    document.getElementById('statusMessage').innerText = 'ゲームが開始されました！';
    resetGame();
    isGameRunning = true;
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.width = canvasWidth;
    gameArea.height = canvasHeight;

    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
    ballSpeedX = 2;
    ballSpeedY = 4;
    paddleX = (canvasWidth - paddleWidth) / 2;

    // 初期状態でボールとバーを描画
    drawGameArea();
}

function drawGameArea() {
    const gameArea = document.getElementById('gameArea');
    const context = gameArea.getContext('2d');

    // 画面クリア
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // ボールを描画
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();

    // パドルを描画
    context.fillStyle = 'cyan';
    context.fillRect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
}

function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 左右の壁でバウンド
    if (ballX + 10 > canvasWidth || ballX - 10 < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // 上の壁でバウンド
    if (ballY - 10 < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // パドルに当たる
    if (
        ballY + 10 > canvasHeight - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // ボールが下に落ちたらゲームオーバー
    if (ballY + 10 > canvasHeight) {
        isGameRunning = false;
        document.getElementById('statusMessage').innerText = 'ゲームオーバー！';
        document.getElementById('retryButton').style.display = 'block';
    }
}

function movePaddleTouch(event) {
    const canvas = document.getElementById('gameArea');
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;

    if (touchX - paddleWidth / 2 > 0 && touchX + paddleWidth / 2 < canvasWidth) {
        paddleX = touchX - paddleWidth / 2;
    }
}

function gameLoop() {
    if (isGameRunning) {
        drawGameArea();
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    }
}

// イベントリスナー追加
document.getElementById('gameArea').addEventListener('touchmove', movePaddleTouch); // タッチ操作の追加
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('retryButton').style.display = 'none';
    startGame();
});
