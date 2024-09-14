let ranking = [];

function updateRanking(name, score) {
    ranking.push({ name: name, score: score });
    ranking.sort((a, b) => b.score - a.score);  // スコア順にソート
    displayRanking();
}

function displayRanking() {
    const rankingElement = document.getElementById('ranking');
    rankingElement.innerHTML = '';
    ranking.forEach((entry, index) => {
        const rank = document.createElement('p');
        rank.innerText = `${index + 1}位: ${entry.name} - スコア: ${entry.score}`;
        rankingElement.appendChild(rank);
    });
}

document.getElementById('scoreSubmit').addEventListener('click', function() {
    const playerName = document.getElementById('playerName').value;
    updateRanking(playerName, score);
});
