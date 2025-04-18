let boughtMusic = {};
let currentMusic = null;


//KI für formatMoneyString(), updateMoneyUI
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
        updateMoneyUI();

       
        const button = document.querySelector(`.music-button[data-name="${name}"]`);
        if (button) button.textContent = "Select";

        switchMusic(name);
    } else {
        alert("Nicht genug Geld!");
    }
}


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
