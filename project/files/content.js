document.addEventListener("DOMContentLoaded", function () {
    const container3 = document.getElementById("container3");
    loadPurchasedMusic();
    loadPurchasedClickSounds();  
    loadPurchasedCursors();      

    function createGrid(category, items) {

        
        // Erstellt eine neue Section für jede Kategorie (ClickSounds, Cursor, Music)
        const section = document.createElement("section");
        section.classList.add("category-section");
        section.id = category.toLowerCase();
        section.style.display = "none"; // Standardmäßig versteckt

        const gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");

        items.forEach(({ name, price }) => {
            const box = document.createElement("div");
            box.classList.add("grid-item");

            const img = document.createElement("img");
            img.src = `media/img/shop/${name}.png`;
            img.alt = name;
            img.classList.add("grid-image");

            const label = document.createElement("p");
            label.textContent = name;
            label.classList.add("grid-label");

            const buyButton = document.createElement("button");
            const gradient = document.createElement("canvas");
            gradient.classList.add("canvas-basic");
            buyButton.textContent = `$ ${price}`;
            buyButton.classList.add("buy-button");
            buyButton.style.textAlign = "center";
            buyButton.style.whiteSpace = "pre-line";
            buyButton.dataset.name = name;
            buyButton.dataset.price = price; 
            buyButton.dataset.category = category.toLowerCase(); 

            // Add category-specific classes
            if (category === "Music") {
                buyButton.classList.add("music-button");
            } else if (category === "ClickSounds") {
                buyButton.classList.add("clicksounds-button");
            } else if (category === "Cursor") {
                buyButton.classList.add("cursor-button");
            }

            // Add click event listener that handles all categories
            buyButton.addEventListener("click", () => {
                const categoryName = category.toLowerCase();
                if (categoryName === "clicksounds") {
                    activateClickSound(name);
                } else if (categoryName === "cursor") {
                    activateCursor(name);
                } else if (categoryName === "music") {
                    playMusic(name);
                }
            });

            // Fügt Bild, Text und Button in die Box ein
            box.append(img, label, buyButton);

            // Fügt die Box dem Grid-Container hinzu
            gridContainer.appendChild(box);
        });

        // Fügt das Grid dem aktuellen Kategorien-Abschnitt hinzu
        section.appendChild(gridContainer);

        // Fügt die Section dem Hauptcontainer hinzu
        container3.appendChild(section);
    }

    const categories = {
        Music: [
            { name: "hip-hop", price: "10k" },
            { name: "lofi", price: "10k" },
            { name: "rock", price: "10k" },
            { name: "pop", price: "10k" },
            { name: "jazz", price: "10k" },
            { name: "classic", price: "10k" }
        ],
        Cursor: [
            { name: "blue", price: "1k" },
            { name: "wave", price: "20k" },
            { name: "ice", price: "50k" },
            { name: "rocket", price: "100k" },
            { name: "star", price: "1Mio" },
            { name: "diamond", price: "10Mio" }
        ],
        ClickSounds: [ 
            { name: "popcorn-click", price: "10k" },
            { name: "rubber-duck", price: "50k" },
            { name: "boing", price: "100k" },
            { name: "cat-meow", price: "500k" },
            { name: "meme-wow", price: "5Mio" },
            { name: "stop-the-cap", price: "10Mio" }
        ]
    };

    //Optimierung mit KI
    // Erstellt alle Kategorien dynamisch im Container
    Object.entries(categories).forEach(([category, items]) => createGrid(category, items));

    function switchCategory(activeId) {
        document.querySelectorAll(".category-section").forEach(section => {
            section.style.display = section.id === activeId ? "block" : "none";
        });

        // Button-Hintergrundfarben aktualisieren
        document.getElementById("music-button").style.backgroundColor = activeId === "music" ? "lightgray" : "rgba(255, 255, 255, 0.8)";
        document.getElementById("cursor-button").style.backgroundColor = activeId === "cursor" ? "lightgray" : "rgba(255, 255, 255, 0.8)";
        document.getElementById("clicksounds-button").style.backgroundColor = activeId === "clicksounds" ? "lightgray" : "rgba(255, 255, 255, 0.8)";
    }

    // Event-Listener für die Buttons, um die Kategorien zu wechseln
    document.getElementById("music-button").addEventListener("click", () => switchCategory("music"));
    document.getElementById("cursor-button").addEventListener("click", () => switchCategory("cursor"));
    document.getElementById("clicksounds-button").addEventListener("click", () => switchCategory("clicksounds"));

    switchCategory("music"); // Startet mit geöffneter Musik-Kategorie
});



function addLabelToContainer() {
    let container = document.getElementById("settings-box");
    container.innerHTML = ""; 

    // Stats-Box
    let statsBox = document.createElement("div");
    statsBox.className = "stats-box";
    statsBox.innerHTML = `
        <h3>📊 Stats Übersicht</h3>
        <ul>
            <li>💰 Geld: <span id="stats-money">0</span></li>
            <li>👥 Follower: <span id="stats-followers">0</span></li>
            <li>🎮 Upgrades: <span id="stats-upgrades">0</span></li>
            <li>📸 Kamera: <span id="stats-camera">0</span></li>
            <li>👥 Team: <span id="stats-team">0</span></li>
            <li>📱 Phone: <span id="stats-phone">0</span></li>
        </ul>
    `;

    container.appendChild(statsBox);

    updateStatsBox();
}

// Stats-Box updaten
function updateStatsBox() {
    if (!document.getElementById("stats-money")) return;
    document.getElementById("stats-money").textContent = formatNumberFixed(money);
    document.getElementById("stats-followers").textContent = formatNumberFixed(followers);
    document.getElementById("stats-upgrades").textContent = Object.values(upgradesOwned).reduce((a, b) => a + b, 0);
    document.getElementById("stats-camera").textContent = upgradesOwned.camera;
    document.getElementById("stats-team").textContent = upgradesOwned.team;
    document.getElementById("stats-phone").textContent = upgradesOwned.phone;
    document.getElementById("stats-youtube").textContent = upgradesOwned.youtube;
    document.getElementById("stats-chat").textContent = upgradesOwned.chat;
}

// Nach jedem relevanten Update aufrufen:
window.addEventListener('load', updateStatsBox);
document.addEventListener('DOMContentLoaded', updateStatsBox);
// Rufe updateStatsBox() auch nach Upgrades, Geld/Follower-Änderungen etc. auf!


function muteMusicToggle() {
    const muteMusic = document.getElementById("muteButton");
    if (muteMusic.innerText === "Mute Music") {
        muteMusic.innerText = "Play Music";
        currentMusic.volume = 0.0;
    } else {
        muteMusic.innerText = "Mute Music";
        currentMusic.volume = 0.1;
    }
}

// Funktion für Mute Clicks Button
function muteClicksToggle() {
    const muteClicks = document.getElementById("muteClicks");
    if (muteClicks.innerText === "Mute Clicks") {
        muteClicks.innerText = "Play Clicks";
        clickVolume = 0.0;
    } else {
        muteClicks.innerText = "Mute Clicks";
        clickVolume = 0.4;
    }
}