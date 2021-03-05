const regions = document.querySelectorAll(`.land`)
const mapContainer = document.getElementById('mapContainer');
const startButton = document.getElementById('startGame');
const regionLabel = document.getElementById('regionLabel');
const scoreLabel = document.getElementById('score');
let gameStarted = false;
let targetRegionNumber = null;
let score = 0;
let maxInARow = 0;

function pickRandomRegion() {
    return regions[Math.random() * regions.length | 0].dataset.number;
} 

function askForRandomRegion() {
    let region = null;
    while (!region || (region && region.dataset && region.dataset.found === true)) {
        targetRegionNumber = pickRandomRegion();
        region = getRegion(targetRegionNumber);
    };
    regionLabel.textContent = `${region.dataset.name} ?`;
}

function getRegion(number) {
    return document.querySelector(`.land[data-number="${number}"]`);
}

document.addEventListener('click', (e) => {
    if (!gameStarted) return;
    if (!e.target.classList.contains('land')) return;

    document.querySelectorAll(`.land`).forEach(f => {
        f.classList.remove('missed');
    });
    const target = document.querySelector(`path[data-number="${targetRegionNumber}"]`);
    if (e.target.dataset.number === targetRegionNumber) {
        score += 1;
        target.classList.add('found');
        target.dataset.found = true;
    } else {
        score = 0;
        target.classList.add('missed');
    }
    askForRandomRegion();
    maxInARow = Math.max(score, maxInARow);
    scoreLabel.textContent = `(${maxInARow}) ${score}`;
});

startButton.addEventListener ('click', () => {
    if (!gameStarted) gameStarted = true;
    startButton.style.display = 'none';
    mapContainer.dataset.started = true;

    askForRandomRegion();
});


