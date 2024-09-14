import { startGame, restartGame, startCountdown, draw } from './game.js';
import { submitScore, displayRanking } from './ranking.js';
import { handleTouchMove } from './ui.js';

const canvas = document.getElementById('gameCanvas');
const playerNameInput = document.getElementById('playerName');

// ページ読み込み時にランキングを表示
window.onload = displayRanking;

// タッチ操作の設定
canvas.addEventListener('touchstart', handleTouchMove, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

draw();
