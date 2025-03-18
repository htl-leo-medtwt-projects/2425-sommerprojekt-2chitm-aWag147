document.addEventListener("DOMContentLoaded", function () {
    const container3 = document.getElementById("container3");
    

    function createGrid(category, items) {
        const section = document.createElement("section");
        section.classList.add("category-section");
        section.id = category.toLowerCase().replace(" ", "-");
        section.style.display = "none";

        const gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");

        items.forEach(item => {
            const box = document.createElement("div");
            box.classList.add("grid-item");

            const img = document.createElement("img");
            img.src = `media/img/shop/${item.name}.png`;
            img.alt = item.name;
            img.classList.add("grid-image");

            const label = document.createElement("p");
            label.textContent = item.name;
            label.style.fontStyle = "italic"; 
            label.style.fontWeight  = "light";

            const price = document.createElement("p");
            price.textContent = `$${item.price}`;
            price.classList.add("price");

            // Kauf-Button 
            const buyButton = document.createElement("button");
            buyButton.textContent = "Kaufen";
            buyButton.classList.add("buy-button");
            buyButton.style.display = "none"; 

            // Hover-Effekt
            box.addEventListener("mouseenter", () => {
                buyButton.style.display = "block";
            });

            box.addEventListener("mouseleave", () => {
                buyButton.style.display = "none";
            });

            box.appendChild(img);
            box.appendChild(label);
            box.appendChild(price);
            box.appendChild(buyButton); 
            gridContainer.appendChild(box);
        });

        section.appendChild(gridContainer);
        container3.appendChild(section);
    }

    createGrid("Music", [
        { name: "hip-hop", price: 20 },
        { name: "lofi", price: 15 },
        { name: "rock", price: 25 },
        { name: "pop", price: 18 },
        { name: "jazz", price: 22 },
        { name: "classic", price: 30 }
    ]);

    createGrid("Click-Effects", [
        { name: "blue", price: 5 },
        { name: "wave", price: 6 },
        { name: "ice", price: 8 },
        { name: "rocket", price: 5 },
        { name: "star", price: 7 },
        { name: "diamond", price: 9 }
    ]);

    createGrid("Themes", [
        { name: "sun", price: 10 },
        { name: "night", price: 10 },
        { name: "fog", price: 12 },
        { name: "rain", price: 12 },
        { name: "snow", price: 14 },
        { name: "gold", price: 15 }
    ]);

    // Kategorie-Wechsel Buttons
    document.querySelector("button[onclick='music()']").addEventListener("click", function() {
        document.getElementById("music-button").style.backg = "lightgray";
        document.getElementById("click-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("themes-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("music").style.display = "block";
        document.getElementById("click-effects").style.display = "none";
        document.getElementById("themes").style.display = "none";
        document.getElementById("shop-h1").style.display = "none";
        document.getElementById("shop-p").style.display = "none";
    });

    document.querySelector("button[onclick='cursors()']").addEventListener("click", function() {
        document.getElementById("click-button").style.backgroundColor = "lightgray";
        document.getElementById("music-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("themes-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("music").style.display = "none";
        document.getElementById("click-effects").style.display = "block";
        document.getElementById("themes").style.display = "none";
        document.getElementById("shop-h1").style.display = "none";
        document.getElementById("shop-p").style.display = "none";
    });

    document.querySelector("button[onclick='themes()']").addEventListener("click", function() {
        document.getElementById("themes-button").style.backgroundColor = "lightgray";
        document.getElementById("click-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("music-button").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        document.getElementById("music").style.display = "none";
        document.getElementById("click-effects").style.display = "none";
        document.getElementById("themes").style.display = "block";
        document.getElementById("shop-h1").style.display = "none";
        document.getElementById("shop-p").style.display = "none";
    });
});
