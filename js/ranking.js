export function submitScore() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        const score = parseInt(document.getElementById('scoreDisplay').textContent.split(': ')[1]);
        const newScore = { name: playerName, score: score };
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        const previousTopScore = ranking[0] ? ranking[0].score : 0;

        ranking.push(newScore);
        ranking.sort((a, b) => b.score - a.score); // スコアの降順に並べる
        ranking = ranking.slice(0, 5); // トップ5まで保存
        localStorage.setItem('ranking', JSON.stringify(ranking));

        // 新しい1位なら「君がチャンピオンだ！」を表示
        if (newScore.score > previousTopScore) {
            document.getElementById('championMessage').style.display = 'block';
        }

        displayRanking();
        document.getElementById('nameInputForm').style.display = 'none';
        document.getElementById('rankingDisplay').style.display = 'block';
    }
}

export function displayRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';
    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}位: ${entry.name}: ${entry.score}`;
        rankingList.appendChild(listItem);
    });
}
