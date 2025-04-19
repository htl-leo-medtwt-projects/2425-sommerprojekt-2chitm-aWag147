let boughtMusic = JSON.parse(localStorage.getItem('boughtMusic')) || {};  // Laden aus localStorage oder leeres Objekt, mit KI
let currentMusic = null;

// KI für formatMoneyString(), updateMoneyUI
function formatMoneyString(str) {
    const multiplier = {
        "k": 1000,
        "Mio": 1_000_000,
        "M": 1_000_000 
    };

    let match = str.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)$/);
    if (!match) return parseFloat(str);

    let value = parseFloat(match[1]);
    let suffix = match[2];

    return value * (multiplier[suffix] || 1);
}

function updateMoneyUI() {
    const moneyElements = document.querySelectorAll("#money, #money-shop");
    moneyElements.forEach(el => {
        el.textContent = (money >= 1_000_000)
            ? (money / 1_000_000).toFixed(2) + "Mio"
            : (money >= 1_000)
                ? (money / 1000).toFixed(2) + "k"
                : money.toFixed(2);
    });
}

function playMusic(name) {
    const musicPrice = contentMusicPrices[name];

    if (!musicPrice) return;

    if (boughtMusic[name]) {
        switchMusic(name);
        return;
    }

    const price = formatMoneyString(musicPrice);

    if (money >= price) {
        money -= price;
        boughtMusic[name] = true;
        localStorage.setItem('boughtMusic', JSON.stringify(boughtMusic));  // Speichern im LocalStorage, JSON.tringify(boughtMusic)) mit KI
        updateMoneyUI();

        const button = document.querySelector(`.music-button[data-name="${name}"]`);
        if (button) button.textContent = "Select";

        switchMusic(name);
    } else {
        alert("Nicht genug Geld!");
    }
}

// Gekaufte Musik laden
function loadPurchasedMusic() {
    const musicButtons = document.querySelectorAll('.music-button');
    musicButtons.forEach(button => {
        const musicName = button.getAttribute('data-name');
        if (boughtMusic[musicName]) {
            button.textContent = 'Select';
        }
    });
}

// Musik wechseln
function switchMusic(name) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    currentMusic = new Audio(`media/music/${name}.mp3`);
    currentMusic.loop = true;
    currentMusic.volume = 0.3;
    currentMusic.play();
    localStorage.setItem("currentMusic", name);
}

// Alle Preise wie in content.js
const contentMusicPrices = {
    "hip-hop": "10k",
    "lofi": "10k",
    "rock": "10k",
    "pop": "10k",
    "jazz": "10k",
    "classic": "10k"
};

document.addEventListener('DOMContentLoaded', function() {
    loadPurchasedMusic();  // Lade gekaufte Musikstücke beim Start

    // Lade die zuletzt abgespielte Musik und spiele sie ab, wenn vorhanden
    const savedMusic = localStorage.getItem('currentMusic');
    if (savedMusic && boughtMusic[savedMusic]) {
        switchMusic(savedMusic);
    }
});
