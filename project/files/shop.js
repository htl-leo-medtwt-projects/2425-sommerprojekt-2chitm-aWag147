//Musik
let boughtMusic = JSON.parse(localStorage.getItem('boughtMusic')) || {};  // Laden aus localStorage oder leeres Objekt, mit KI
let currentMusic = null;


//ClickSound
let boughtClickSounds = JSON.parse(localStorage.getItem('boughtClickSounds')) || {};
let currentClickSound = null;


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

//Musik

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
    currentMusic.volume = 0.1;
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

//Klick Sound

function activateClickSound(name) {
    const clickSoundPrice = contentClickSoundPrices[name];
    if (!clickSoundPrice) return;

    if (boughtClickSounds[name]) {
        selectClickSound(name);
        return;
    }

    const price = formatMoneyString(clickSoundPrice);
    if (money >= price) {
        money -= price;
        boughtClickSounds[name] = true;
        localStorage.setItem('boughtClickSounds', JSON.stringify(boughtClickSounds));
        updateMoneyUI();

        loadPurchasedClickSounds();

        selectClickSound(name);
    } 
}

function selectClickSound(name) {
    currentClickSound = new Audio(`media/clicksounds/${name}.mp3`);
    localStorage.setItem("currentClickSound", name);
}

function loadPurchasedClickSounds() {
    const clickButtons = document.querySelectorAll('.clicksounds-section .buy-button');  
    const savedClick = localStorage.getItem('currentClickSound'); // aktuelle Auswahl

    clickButtons.forEach(button => {
        const soundName = button.getAttribute('data-name');
        if (boughtClickSounds[soundName]) {
            button.textContent = (soundName === savedClick) ? 'Selected' : 'Select';
        }
    });
}



const contentClickSoundPrices = {
    "popcorn-click": "10k",
    "rubber-duck": "50k",
    "boing": "100k",
    "cat-meow": "500k",
    "meme-wow": "5Mio",
    "stop-the-cap": "10Mio" 
};

//Laden von Musik und Sounds
document.addEventListener('DOMContentLoaded', function() {
    loadPurchasedMusic();  // Lade gekaufte Musikstücke beim Start

    // Lade die zuletzt abgespielte Musik und spiele sie ab, wenn vorhanden
    const savedMusic = localStorage.getItem('currentMusic');
    if (savedMusic && boughtMusic[savedMusic]) {
        switchMusic(savedMusic);
    }

    loadPurchasedClickSounds();

    const savedClick = localStorage.getItem('currentClickSound');
    if (savedClick && boughtClickSounds[savedClick]) {
        selectClickSound(savedClick);
    }

    loadPurchasedCursors();

    const savedCursor = localStorage.getItem('currentCursor');
    if (savedCursor && boughtCursors[savedCursor]) {
        selectCursor(savedCursor);
    }

});


//Per Klick Sound abspielen
document.addEventListener('click', () => {
    if (currentClickSound) {
        const sound = new Audio(currentClickSound.src); // Damit es mehrfach schnell abspielbar ist
        sound.volume = 0.4;
        sound.play();
    }
});


//Cursors

function activateCursor(name) {
    const cursorPrice = formatMoneyString(cursorPrices[name]);
    if (boughtCursors[name]) {
        selectCursor(name);
        return;
    }

    if (money >= cursorPrice) {
        money -= cursorPrice;
        boughtCursors[name] = true;
        localStorage.setItem('boughtCursors', JSON.stringify(boughtCursors));
        updateMoneyUI();

        loadPurchasedCursors();

        selectCursor(name);
    } 
}

function selectCursor(name) {
    document.documentElement.style.setProperty('--custom-cursor', `url('media/cursors/${name}.png'), auto`); //KI Hilfe
    localStorage.setItem('currentCursor', name);

    // Buttons aktualisieren
    const buttons = document.querySelectorAll('.cursor-section .buy-button');
    buttons.forEach(btn => {
        const btnName = btn.dataset.name;
        if (btnName === name) {
            btn.textContent = "Selected";
        } else if (boughtCursors[btnName]) {
            btn.textContent = "Select";
        }
    });
}

function loadPurchasedCursors() {
    const cursorButtons = document.querySelectorAll('.cursor-section .buy-button');
    const savedCursor = localStorage.getItem('currentCursor'); // aktuelle Auswahl

    cursorButtons.forEach(button => {
        const name = button.dataset.name;
        if (boughtCursors[name]) {
            button.textContent = (name === savedCursor) ? 'Selected' : 'Select';
        }
    });
}



//Localstorage
let boughtCursors = JSON.parse(localStorage.getItem('boughtCursors')) || {};
const cursorPrices = {
    "blue": "1k",
    "wave": "20k",
    "ice": "50k",
    "rocket": "100k",
    "star": "1Mio",
    "diamond": "10Mio"
};
