document.addEventListener("DOMContentLoaded", function () {
    const container3 = document.getElementById("container3");

    function createGrid(category, items) {
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
            buyButton.textContent = `Buy for \n $${price}$`;
            buyButton.classList.add("buy-button");
            buyButton.style.textAlign = "center";
            buyButton.style.whiteSpace = "pre-line";

            box.append(img, label, buyButton);
            gridContainer.appendChild(box);
        });

        section.appendChild(gridContainer);
        container3.appendChild(section);
    }

    const categories = {
        Music: [
            { name: "hip-hop", price: 20 },
            { name: "lofi", price: 15 },
            { name: "rock", price: 25 },
            { name: "pop", price: 18 },
            { name: "jazz", price: 22 },
            { name: "classic", price: 30 }
        ],
        Cursor: [ 
            { name: "blue", price: 5 },
            { name: "wave", price: 6 },
            { name: "ice", price: 8 },
            { name: "rocket", price: 5 },
            { name: "star", price: 7 },
            { name: "diamond", price: 9 }
        ],
        Themes: [
            { name: "sun", price: 10 },
            { name: "night", price: 10 },
            { name: "fog", price: 12 },
            { name: "rain", price: 12 },
            { name: "snow", price: 14 },
            { name: "gold", price: 15 }
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
        document.getElementById("themes-button").style.backgroundColor = activeId === "themes" ? "lightgray" : "rgba(255, 255, 255, 0.8)";
    }

    // Event-Listener für die Buttons, um die Kategorien zu wechseln
    document.getElementById("music-button").addEventListener("click", () => switchCategory("music"));
    document.getElementById("cursor-button").addEventListener("click", () => switchCategory("cursor"));
    document.getElementById("themes-button").addEventListener("click", () => switchCategory("themes"));

    switchCategory("music");
});