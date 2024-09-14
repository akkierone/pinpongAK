document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('statusMessage').innerText = 'スタートボタンが押されました！';
    startGame();
});

function startGame() {
    // スコアのリセットとゲームの開始メッセージ
    document.getElementById('score').innerText = 'スコア: 0';
    document.getElementById('statusMessage').innerText = 'ゲームが開始されました！';
    runGame();
}

function runGame() {
    // ゲームのメイン処理
}
