const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let isGameRunning = false;

canvas.width = 480;
canvas.height = 320;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener('mousemove', mouseMoveHandler, false);
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartGame);
document.getElementById('sendScoreButton').addEventListener('click', sendScore);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    document.getElementById('score').innerText = score;
}

function resetGame() {
    score = 0;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            isGameRunning = false;
            document.getElementById('statusMessage').innerText = 'ゲームオーバー！';
            document.getElementById('restartButton').style.display = 'inline-block';
            document.getElementById('sendScoreButton').style.display = 'inline-block';
            return;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if (isGameRunning) {
        requestAnimationFrame(draw);
    }
}

function startGame() {
    isGameRunning = true;
    document.getElementById('statusMessage').innerText = '';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('sendScoreButton').style.display = 'none';
    resetGame();
    draw();
}

function restartGame() {
    isGameRunning = true;
    document.getElementById('statusMessage').innerText = '';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('sendScoreButton').style.display = 'none';
    resetGame();
    draw();
}

function sendScore() {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        addScoreToRanking(playerName, score);
        updateRankingList();
        document.getElementById('playerName').value = '';
    }
}
