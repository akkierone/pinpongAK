const rankingList = document.getElementById('rankingList');
const championMessage = document.getElementById('championMessage');

// スコア送信機能
export function submitScore() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        const newScore = { name: playerName, score: score };
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        const previousTopScore = ranking[0] ? ranking[0].score : 0;

        ranking.push(newScore);
        ranking.sort((a, b) => b.score - a.score); // スコアの降順に並べる
        ranking = ranking.slice(0, 5); // トップ5まで保存
        localStorage.setItem('ranking', JSON.stringify(ranking));

        // 新しい1位なら「君がチャンピオンだ！」を表示
        if (newScore.score > previousTopScore) {
            championMessage.style.display = 'block';
        }

        displayRanking();
    }
}

// ランキング表示機能
export function displayRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingList.innerHTML = '';
    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}位: ${entry.name}: ${entry.score}`;
        rankingList.appendChild(listItem);
    });
}

export function updateScore() {
    score += 1;
    scoreDisplay.textContent = `スコア: ${score}`;
}
