const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverMessage = document.getElementById('gameOverMessage');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const playerNameInput = document.getElementById('playerName');
const submitButton = document.getElementById('submitButton');
const rankingDisplay = document.getElementById('rankingDisplay');
const rankingList = document.getElementById('rankingList');
const countdownDisplay = document.createElement('div');

let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 5;
let dy = -5;
let score = 0;
let isGameStarted = false;
let isGameOver = false;
let touchX = null;

countdownDisplay.id = 'countdown';
countdownDisplay.style.display = 'none';
document.body.appendChild(countdownDisplay);

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

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `スコア: ${score}`;
}

function draw() {
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

        // タッチ位置に従ってパドルを動かす
        if (touchX !== null) {
            paddleX = touchX - paddleWidth / 2;
        }

        requestAnimationFrame(draw); // アニメーションフレームを再描画
    }
}

function gameOver() {
    isGameOver = true;
    gameOverMessage.style.display = 'block';
    restartButton.style.display = 'block';
    document.getElementById('nameInputForm').style.display = 'block';
    isGameStarted = false;
}

function startCountdown() {
    let countdownValue = 3;
    countdownDisplay.textContent = countdownValue;
    countdownDisplay.style.display = 'block';

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

function startGame() {
    isGameStarted = true;
    isGameOver = false;
    startButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    restartButton.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `スコア: ${score}`;
    document.getElementById('nameInputForm').style.display = 'none';
    
    // ボールとパドルの位置を初期化
    resetGame();
    
    // 描画を開始
    draw();
}

function resetGame() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
}

// スマホタッチ用イベントリスナー
canvas.addEventListener('touchstart', handleTouchMove, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

// タッチ操作の処理
function handleTouchMove(e) {
    const rect = canvas.getBoundingClientRect();
    touchX = e.touches[0].clientX - rect.left; // タッチのX座標を取得
    e.preventDefault(); // デフォルトのスクロールなどの動作を防ぐ
}

// スコア送信機能とランキング表示機能
submitButton.addEventListener('click', submitScore);

function submitScore() {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const newScore = { name: playerName, score: score };
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        ranking.push(newScore);
        ranking.sort((a, b) => b.score - a.score); // スコアの降順に並べる
        ranking = ranking.slice(0, 5); // トップ5まで保存
        localStorage.setItem('ranking', JSON.stringify(ranking));

        displayRanking();
    }
}

function displayRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingList.innerHTML = ''; // 以前のランキングをクリア
    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        if (index === 0) {
            listItem.innerHTML = `<strong>1位: ${entry.name} - ${entry.score}</strong>`;
        } else {
            listItem.textContent = `${index + 1}位: ${entry.name}: ${entry.score}`;
        }
        rankingList.appendChild(listItem);
    });
    rankingDisplay.style.display = 'block';
}

startButton.addEventListener('click', startCountdown);
restartButton.addEventListener('click', startCountdown);

// ゲーム初期化
resetGame();
