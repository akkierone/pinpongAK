let ranking = [];

export function submitScore() {
    const playerName = document.getElementById('playerName').value;
    const score = parseInt(document.getElementById('scoreDisplay').textContent.replace('スコア: ', ''), 10);
    ranking.push({ name: playerName, score: score });

    // スコア順にソート
    ranking.sort((a, b) => b.score - a.score);

    // ランキング表示を更新
    updateRankingDisplay();
}

function updateRankingDisplay() {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';  // 現在のランキングをクリア

    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}位: ${entry.name}: ${entry.score}`;
        rankingList.appendChild(listItem);
    });

    // 1位のスコアを更新した場合にチャンピオンメッセージを表示
    if (ranking.length > 0 && ranking[0].score === score) {
        document.getElementById('championMessage').style.display = 'block';
    }
}
