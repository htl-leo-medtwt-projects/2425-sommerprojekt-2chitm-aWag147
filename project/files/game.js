// Klicker-Logik
let money = 0.0;
let followers = 0;
let clickCount = 0;
let currentLevel = 1;
let clicksForNextLevel = 100; 
const multiplier = 1.4; 
const clickMoneyElement = document.getElementById("money-counter");
const clickFollowerElement = document.getElementById("follower-counter");



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("levelText").textContent = `Level ${currentLevel}`;
});

//Klicker Logik

function clickPhone() {
    // Vergrößern oder verkleinern des Bildes
    enlarge(document.getElementById('phone'));
    
    // Geld und Follower erhöhen
    money ++;
    clickCount++;

    if (clickCount % 5 === 0) {
        followers += 1;
    }

    clickMoneyElement.classList.add("animate");

    setTimeout(() => {
        clickMoneyElement.classList.remove("animate");
    }, 100); 

    clickFollowerElement.classList.add("animate");

    setTimeout(() => {
        clickFollowerElement.classList.remove("animate");
    }, 100); 

    
    // Fortschrittsleiste aktualisieren
    moveBar();
    updateUI();
}

function moveBar() {
    var elem = document.getElementById("myBar");   
    var levelText = document.getElementById("levelText");   
    let currentWidth = parseFloat(elem.style.width) || 0;
    
    let progressPerClick = 100 / clicksForNextLevel; // Dynamische Fortschrittssteigerung
    elem.style.width = Math.min(currentWidth + progressPerClick, 100) + '%';
    
    // Level korrekt anzeigen
    levelText.textContent = `Level ${currentLevel}`;
    
    if (currentWidth + progressPerClick >= 100) {
        console.log("Balken ist voll! Neues Level erreicht.");
        
        // Fortschrittsbalken resetten
        elem.style.width = '0%';  
        
        // Level erhöhen und Anforderung anpassen
        currentLevel++;
        clicksForNextLevel = Math.ceil(clicksForNextLevel * multiplier);
        levelText.textContent = `Level ${currentLevel}`;
    }
}


function updateUI() {
    if(money > 1000){
        document.getElementById("money").textContent = (money / 1000).toFixed(2) + ' K';
    }else{
        if(money > 1000000){
            document.getElementById("money").textContent = (money / 1000000).toFixed(2) + ' Mio';
        }else{
            document.getElementById("money").textContent = money;
            
        }
    }
    
    if(followers > 1000){
        document.getElementById("followers").textContent = (followers / 1000).toFixed(2) + ' K';
    }else{
        if(followers > 1000000){
            document.getElementById("followers").textContent = (followers / 1000000).toFixed(2) + ' Mio';
        }else{
            document.getElementById("followers").textContent = followers;
            
        }
    }
    
    
}

// Klick Effekt, Mit Hilfe
function enlarge(element) {
    if (element.classList.contains('enlarged')) {
        element.classList.remove('enlarged'); 
    } else {
        element.classList.add('enlarged'); 
    }
}


//Upgrades
let teamUpgradeActive = false;
let teamUpgradeInterval;
let upgradeCost = 100;
let incomePerSecond = 2;

function teamUpgrade() {
    if (money >= upgradeCost) {  
        money -= upgradeCost;
        
        // Falls noch kein Interval läuft, starte es
        if (!teamUpgradeActive) {
            teamUpgradeActive = true;

            teamUpgradeInterval = setInterval(() => {
                money += incomePerSecond;
                followers += incomePerSecond / 2;
                updateUI();
            }, 1000);
        }

        // Upgrade-Kosten und Einkommen verdoppeln
        upgradeCost *= 2;
        incomePerSecond *= 2;

        // UI aktualisieren
        updateUI();
        updateUpgradeText();  // Tooltip aktualisieren
    }
}

function teamUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;

        if (!teamUpgradeActive) {
            teamUpgradeActive = true;
            teamUpgradeInterval = setInterval(() => {
                money += incomePerSecond;
                followers += incomePerSecond;
                updateUI();
                moveBar();
                updateUI();
            }, 1000);
        }

        upgradeCost *= 2;
        incomePerSecond *= 2;

        updateUI();
    }
}

//Mit Hilfe, um den text ständig upzudaten.

document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("tooltip");

    const elements = [
        { id: "camera", text: "Invest in better equipment." },
        { id: "team", text: null }, // Der Text für "team" wird separat behandelt
        { id: "smartphone", text: "Upgrade your phone." },
        { id: "shop", text: "Buy fun things in the shop." },
        { id: "settings", text: "Change your settings." },
        { id: "youtube", text: "Make another account." },
        { id: "livechat", text: "Watch your livechat." },
        { id: "follower-counter", text: "Your followers." },
        { id: "money-counter", text: "Your money." }
    ];

    elements.forEach(item => {
        const element = document.getElementById(item.id);
        if (!element) return;

        // Event listener für "mouseenter" zum Anzeigen des Tooltips
        element.addEventListener("mouseenter", (event) => {
            let newText = item.id === "team" ? `Hire a camera-team for ${upgradeCost}$.` : item.text;
            if (tooltip.textContent !== newText) {
                tooltip.textContent = newText;
            }

            tooltip.style.display = "block";
            
            // Initiale Position basierend auf der Maus
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

        // Event listener für "mousemove" für dynamische Tooltip-Position
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

        // Event listener für "mouseleave" zum Ausblenden des Tooltips
        element.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });
});


