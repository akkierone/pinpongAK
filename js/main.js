import { startCountdown, restartGame } from './game.js';
import { submitScore, displayRanking } from './ranking.js';
import './ui.js';

// ページ読み込み時にランキングを表示
window.onload = displayRanking;
