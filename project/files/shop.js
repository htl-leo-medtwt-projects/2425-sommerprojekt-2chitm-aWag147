//Musik
let boughtMusic = JSON.parse(localStorage.getItem('boughtMusic')) || {};  // Laden aus localStorage oder leeres Objekt, mit KI
let currentMusic = null;

//ClickSound
let boughtClickSounds = JSON.parse(localStorage.getItem('boughtClickSounds')) || {};
let currentClickSound = null;
let clickVolume = 0.4;

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
    // Update both money displays
    const moneyElements = document.querySelectorAll("#money, #money-shop");
    moneyElements.forEach(el => {
        const formattedMoney = (money >= 1_000_000)
            ? (money / 1_000_000).toFixed(2) + "Mio"
            : (money >= 1_000)
                ? (money / 1000).toFixed(2) + "k"
                : money.toFixed(2);
        el.textContent = formattedMoney;
    });
    
    // Save money to localStorage
    localStorage.setItem('money', money);
}

//Musik

function playMusic(name) {
    const button = document.querySelector(`.music-button[data-name="${name}"]`);
    if (!button) return;

    const price = formatMoneyString(button.dataset.price);
    
    if (boughtMusic[name]) {
        switchMusic(name);
        return;
    }

    if (money < price) {
        showNotification('Not enough money!');
        return;
    }

    money -= price;
    localStorage.setItem('money', money);
    boughtMusic[name] = true;
    localStorage.setItem('boughtMusic', JSON.stringify(boughtMusic));
    updateMoneyUI();

    button.textContent = "Select";
    button.dataset.bought = 'true';
    button.style.cursor = 'pointer';

    switchMusic(name);
}

// Gekaufte Musik laden
function loadPurchasedMusic() {
    const musicButtons = document.querySelectorAll('.music-button');
    musicButtons.forEach(button => {
        const musicName = button.dataset.name;
        const price = formatMoneyString(button.dataset.price);
        
        if (boughtMusic[musicName]) {
            button.textContent = 'Select';
            button.dataset.bought = 'true';
            button.style.cursor = 'pointer';
        } else {
            button.textContent = `$ ${button.dataset.price}`;
            button.removeAttribute('data-bought');
            if (money < price) {
                button.style.cursor = 'not-allowed';
            } else {
                button.style.cursor = 'pointer';
            }
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
    const button = document.querySelector(`.clicksounds-button[data-name="${name}"]`);
    if (!button) return;

    const price = formatMoneyString(button.dataset.price);
    
   
    if (boughtClickSounds[name]) {
        selectClickSound(name);
        return;
    }


    if (money < price) {
       
        showNotification('Not enough money!');
        return;
    }

    money -= price;
    localStorage.setItem('money', money);
    boughtClickSounds[name] = true;
    localStorage.setItem('boughtClickSounds', JSON.stringify(boughtClickSounds));
    updateMoneyUI();

    button.textContent = "Select";
    button.dataset.bought = 'true';

    selectClickSound(name);
}

function selectClickSound(name) {
    currentClickSound = new Audio(`media/clicksounds/${name}.mp3`);
    localStorage.setItem("currentClickSound", name);
}

function loadPurchasedClickSounds() {
    const clickButtons = document.querySelectorAll('.clicksounds-button');  
    clickButtons.forEach(button => {
        const soundName = button.dataset.name;
        const price = formatMoneyString(button.dataset.price);
        
        if (boughtClickSounds[soundName]) {
            button.textContent = 'Select';
            button.dataset.bought = 'true';
      
            button.style.cursor = 'pointer';
        } else {
            button.textContent = `$ ${button.dataset.price}`;
            button.removeAttribute('data-bought');
       
            if (money < price) {
                button.style.cursor = 'not-allowed';
            } else {
                button.style.cursor = 'pointer';
            }
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

//Per Klick Sound abspielen
document.addEventListener('click', () => {
    if (currentClickSound) {
        let sound = new Audio(currentClickSound.src);
        sound.volume = clickVolume;
        sound.play();
    }
});


//Cursors
function activateCursor(name) {
    const button = document.querySelector(`.cursor-button[data-name="${name}"]`);
    if (!button) return;

    const price = formatMoneyString(button.dataset.price);

    if (boughtCursors[name]) {
        selectCursor(name);
        return;
    }

    if (money < price) {
        button.style.cursor = 'not-allowed';
        setTimeout(() => button.style.cursor = '', 1000);
        return;
    }

    money -= price;
    localStorage.setItem('money', money);
    boughtCursors[name] = true;
    localStorage.setItem('boughtCursors', JSON.stringify(boughtCursors));
    updateMoneyUI();


    button.textContent = "Select";

    selectCursor(name);
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
    const cursorButtons = document.querySelectorAll('.cursor-button');
    cursorButtons.forEach(button => {
        const name = button.dataset.name;
        const price = formatMoneyString(button.dataset.price);
        
        if (boughtCursors[name]) {
            button.textContent = 'Select';
            button.dataset.bought = 'true';
            button.style.cursor = 'pointer';
        } else {
            button.textContent = `$ ${button.dataset.price}`;
            button.removeAttribute('data-bought');
            if (money < price) {
                button.style.cursor = 'not-allowed';
            } else {
                button.style.cursor = 'pointer';
            }
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