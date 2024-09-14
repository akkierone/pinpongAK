export function handleTouchMove(e) {
    e.preventDefault();
    const rect = document.getElementById('gameCanvas').getBoundingClientRect();
    touchX = e.touches[0].clientX - rect.left;
}
