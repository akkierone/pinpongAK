let score = 0;

function startGame() {
    // デバッグ用メッセージ表示
    document.getElementById('statusMessage').innerText = 'ゲームが開始されました！';
    
    // スコアリセット
    score = 0;
    document.getElementById('score').innerText = 'スコア: ' + score;

    // ゲームのメインロジック（仮）
    alert('ゲームが開始されました！');  // デバッグ用のアラート
    runGameLoop();  // 実際のゲームのロジックを走らせる
}

function runGameLoop() {
    // ゲームの進行処理を書く場所
}

document.getElementById('startButton').addEventListener('click', function(event) {
    event.preventDefault();  // デフォルト動作の無効化
    event.stopPropagation(); // イベント伝播を止める
    startGame();
});
