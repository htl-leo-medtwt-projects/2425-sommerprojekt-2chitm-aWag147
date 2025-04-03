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
    loadGameState(); //Laden des Spielstands
    document.getElementById("levelText").textContent = `Level ${currentLevel}`;
    updateUI();
});

//Speichern des Spielstandes
function saveGameState() {
    localStorage.setItem('money', money);
    localStorage.setItem('followers', followers);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('currentLevel', currentLevel);
    localStorage.setItem('clicksForNextLevel', clicksForNextLevel);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('incomePerSecond', incomePerSecond);
    localStorage.setItem('teamUpgradeActive', teamUpgradeActive);
}

// Laden des Spielstands
function loadGameState() {
    const savedMoney = parseFloat(localStorage.getItem('money'));
    const savedFollowers = parseInt(localStorage.getItem('followers'));
    const savedClickCount = parseInt(localStorage.getItem('clickCount'));
    const savedCurrentLevel = parseInt(localStorage.getItem('currentLevel'));
    const savedClicksForNextLevel = parseInt(localStorage.getItem('clicksForNextLevel'));
    const savedUpgradeCost = parseInt(localStorage.getItem('upgradeCost'));
    const savedIncomePerSecond = parseInt(localStorage.getItem('incomePerSecond'));
    const savedTeamUpgradeActive = localStorage.getItem('teamUpgradeActive');
    

    if (!isNaN(savedMoney)) money = savedMoney;
    if (!isNaN(savedFollowers)) followers = savedFollowers;
    if (!isNaN(savedClickCount)) clickCount = savedClickCount;
    if (!isNaN(savedCurrentLevel)) currentLevel = savedCurrentLevel;
    if (!isNaN(savedClicksForNextLevel)) clicksForNextLevel = savedClicksForNextLevel;
    if (!isNaN(savedUpgradeCost)) upgradeCost = savedUpgradeCost;
    if (!isNaN(savedIncomePerSecond)) incomePerSecond = savedIncomePerSecond;
    teamUpgradeActive = savedTeamUpgradeActive === "true";
    loadUpgrade();
}

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

    //Speichern
    saveGameState();
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
    if(money > 1000 && money < 1000000){
        document.getElementById("money").textContent = (money / 1000).toFixed(2) + ' K';
    }else{
        if(money > 1000000){
            document.getElementById("money").textContent = (money / 1000000).toFixed(2) + ' Mio';
        }else{
            document.getElementById("money").textContent = money;
            
        }
    }
    
    if(followers > 1000 && followers < 1000000){
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


