function formatDigits(i) {
    return i.toString().padStart(2, '0');
}

function setClock() {
    clockEl = document.getElementById('clockTime');
    const now = new Date();
    clockEl.textContent = `${formatDigits(now.getHours())}:${formatDigits(now.getMinutes())}:${formatDigits(now.getSeconds())}`;
}

document.addEventListener('DOMContentLoaded', () => {
    setClock();
    setInterval(setClock, 1000);
    
});