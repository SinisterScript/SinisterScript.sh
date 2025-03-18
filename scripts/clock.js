function formatDigits(i) {
    return i.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', () => {
    clockEl = document.getElementById('clockTime');
    setInterval(() => {
        const now = new Date();
        clockEl.textContent = `${formatDigits(now.getHours())}:${formatDigits(now.getMinutes())}:${formatDigits(now.getSeconds())}`;
    });
    
});