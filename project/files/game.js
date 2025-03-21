// Klicker-Logik
let money = 0.0;
let followers = 0;
let clickCount = 0;

function clickPhone() {
    // Vergrößern oder verkleinern des Bildes
    enlarge(document.getElementById('phone'));
    
    // Geld und Follower erhöhen
    money += 0.25;
    clickCount++;

    if (clickCount % 4 === 0) {
        followers += 1;
    }

    // Fortschrittsleiste aktualisieren alle 10 Klicks
    if (clickCount % 10 === 0) {
        moveBar();
    }

    updateUI();
}

let currentLevel = 1; // Startlevel

//Mit W3 Shool
function moveBar() {
    var elem = document.getElementById("myBar");   
    var levelText = document.getElementById("levelText");   
    let currentWidth = parseFloat(elem.style.width) || 0;

    if (currentWidth < 100) {
        elem.style.width = (currentWidth + 10) + '%';
        levelText.textContent = currentLevel; // Zeigt aktuelles Level
    } else {
        console.log("Balken ist voll! Neues Level erreicht.");
        
        // Fortschrittsbalken resetten
        elem.style.width = '0%';  
        
        // Level erhöhen
        currentLevel++;
        levelText.textContent = currentLevel;
    }
}

function updateUI() {
    document.getElementById("money").textContent = money.toFixed(1);
    document.getElementById("followers").textContent = followers;
}

// Klick Effekt, Mit Hilfe
function enlarge(element) {
    if (element.classList.contains('enlarged')) {
        element.classList.remove('enlarged'); 
    } else {
        element.classList.add('enlarged'); 
    }
}

// Tooltip, Hilfe von KI
document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("tooltip");

    const items = [
        { id: "camera", text: "Invest in better equipment." },
        { id: "team", text: "Hire a camera-team." },
        { id: "smartphone", text: "Upgrade your phone." },
        { id: "shop", text: "Buy fun things in the shop." },
        { id: "settings", text: "Change your settings." },
        { id: "youtube", text: "Make another account." },
        { id: "livechat", text: "Watch your livechat." },
        { id: "follower-counter", text: "Your followers." },
        { id: "money-counter", text: "Your money." }
    ];

    items.forEach(item => {
        const element = document.getElementById(item.id);

        element.addEventListener("mouseover", (event) => {
            tooltip.textContent = item.text;
            tooltip.style.display = "block";

            // Maus-Position
            let mouseX = event.pageX;
            let mouseY = event.pageY;
            let tooltipWidth = tooltip.offsetWidth;
            let screenWidth = window.innerWidth;

            // Prüfen, ob genug Platz nach rechts ist
            if (mouseX + tooltipWidth + 20 > screenWidth) {
                tooltip.style.left = `${mouseX - tooltipWidth - 15}px`; 
            } else {
                tooltip.style.left = `${mouseX + 15}px`; 
            }

            tooltip.style.top = `${mouseY}px`;
        });

        element.addEventListener("mousemove", (event) => {
            let mouseX = event.pageX;
            let mouseY = event.pageY;
            let tooltipWidth = tooltip.offsetWidth;
            let screenWidth = window.innerWidth;

            // Dynamisch die Position anpassen
            if (mouseX + tooltipWidth + 20 > screenWidth) {
                tooltip.style.left = `${mouseX - tooltipWidth - 15}px`;
            } else {
                tooltip.style.left = `${mouseX + 15}px`;
            }

            tooltip.style.top = `${mouseY}px`;
        });

        element.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });
});
