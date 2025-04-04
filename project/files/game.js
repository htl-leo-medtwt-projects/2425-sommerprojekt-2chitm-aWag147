// Klicker-Logik
let money = 0.0;
let followers = 0;
let clickCount = 0;
let currentLevel = 1;
let clicksForNextLevel = 100; 
let clicks = 1; 
const multiplier = 1.4; 
const clickMoneyElement = document.getElementById("money-counter");
const clickFollowerElement = document.getElementById("follower-counter");



document.addEventListener("DOMContentLoaded", () => {
    loadGameState(); // Laden des Spielstands
    document.getElementById("levelText").textContent = `Level ${currentLevel}`;
    updateUI();
});

// Speichern des Spielstands
function saveGameState() {
    localStorage.setItem('money', money);
    localStorage.setItem('followers', followers);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('currentLevel', currentLevel);
    localStorage.setItem('clicksForNextLevel', clicksForNextLevel);
    localStorage.setItem('upgradeCost', upgradeCostTeam);
    localStorage.setItem('incomePerSecond', incomePerSecond);
    localStorage.setItem('teamUpgradeActive', teamUpgradeActive);
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('upgradeCostCamera', upgradeCostCamera);
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
    const savedClicks = parseInt(localStorage.getItem('clicks'));
    const savedUpgradeCostCamera = parseInt(localStorage.getItem('upgradeCostCamera'));


    //KI Hilfe für isNan
    if (!isNaN(savedMoney)) money = savedMoney;
    if (!isNaN(savedFollowers)) followers = savedFollowers;
    if (!isNaN(savedClickCount)) clickCount = savedClickCount;
    if (!isNaN(savedCurrentLevel)) currentLevel = savedCurrentLevel;
    if (!isNaN(savedClicksForNextLevel)) clicksForNextLevel = savedClicksForNextLevel;
    if (!isNaN(savedUpgradeCost)) upgradeCostTeam = savedUpgradeCost;
    if (!isNaN(savedIncomePerSecond)) incomePerSecond = savedIncomePerSecond;
    if (!isNaN(savedClicks)) clicks = savedClicks;
    if (!isNaN(savedUpgradeCostCamera)) upgradeCostCamera = savedUpgradeCostCamera;

    teamUpgradeActive = savedTeamUpgradeActive === "true";
    loadUpgradeTeam();
}

// Klicker Logik
function clickPhone() {
    enlarge(document.getElementById('phone'));
    money += clicks;
    clickCount++;

    if (clickCount % 5 === 0) {
        followers += clicks;
    }

    clickMoneyElement.classList.add("animate");
    setTimeout(() => clickMoneyElement.classList.remove("animate"), 100);

    clickFollowerElement.classList.add("animate");
    setTimeout(() => clickFollowerElement.classList.remove("animate"), 100);

    moveBar();
    updateUI();
    saveGameState();
}

//W3-School Hilfe
function moveBar() {
    var elem = document.getElementById("myBar");   
    var levelText = document.getElementById("levelText");   
    let currentWidth = parseFloat(elem.style.width) || 0;
    
    let progressPerClick = 100 / clicksForNextLevel;
    elem.style.width = Math.min(currentWidth + progressPerClick, 100) + '%';
    
    levelText.textContent = `Level ${currentLevel}`;
    
    if (currentWidth + progressPerClick >= 100) {
        elem.style.width = '0%';  
        currentLevel++;
        clicksForNextLevel = Math.ceil(clicksForNextLevel * multiplier);
        levelText.textContent = `Level ${currentLevel}`;
    }
}

function updateUI() {
    if (money > 1000 && money < 1000000) {
        document.getElementById("money").textContent = (money / 1000).toFixed(2) + ' K';
    } else if (money >= 1000000) {
        document.getElementById("money").textContent = (money / 1000000).toFixed(2) + ' Mio';
    } else {
        document.getElementById("money").textContent = money;
    }

    if (followers > 1000 && followers < 1000000) {
        document.getElementById("followers").textContent = (followers / 1000).toFixed(2) + ' K';
    } else if (followers >= 1000000) {
        document.getElementById("followers").textContent = (followers / 1000000).toFixed(2) + ' Mio';
    } else {
        document.getElementById("followers").textContent = followers;
    }
}

// Klick Effekt
function enlarge(element) {
    element.classList.toggle('enlarged');
}

// Tooltip -> mit KI zur Optimierung
document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("tooltip");
    const elements = [
        { id: "camera", text: null },
        { id: "team", text: null },
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

        element.addEventListener("mouseenter", (event) => {
            let newText = item.id === "team" ? `Hire a camera-team for ${upgradeCostTeam}$.` : 
                           item.id === "camera" ? `Invest in equipment for ${upgradeCostCamera}$.` : 
                           item.id === "smartphone" ? `Upgrade your phone for ${upgradeCostCamera}$.` :
                           item.text;

            if (newText) {
                tooltip.textContent = newText;
                tooltip.style.display = "block";
            }

            let mouseX = event.pageX;
            let mouseY = event.pageY;
            let tooltipWidth = tooltip.offsetWidth;
            let screenWidth = window.innerWidth;

            tooltip.style.left = (mouseX + tooltipWidth + 20 > screenWidth) ? 
                `${mouseX - tooltipWidth - 15}px` : `${mouseX + 15}px`;

            tooltip.style.top = `${mouseY}px`;
        });

        element.addEventListener("mousemove", (event) => {
            let mouseX = event.pageX;
            let mouseY = event.pageY;
            let tooltipWidth = tooltip.offsetWidth;
            let screenWidth = window.innerWidth;

            tooltip.style.left = (mouseX + tooltipWidth + 20 > screenWidth) ? 
                `${mouseX - tooltipWidth - 15}px` : `${mouseX + 15}px`;

            tooltip.style.top = `${mouseY}px`;
        });

        element.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });
});

function resetGame(){
    //Autoklicks stoppen
    if (teamUpgradeInterval) {
        clearInterval(teamUpgradeInterval);
        teamUpgradeInterval = null;
    }

    // LocalStorage zurücksetzen
    localStorage.clear();

    // Seite neu laden
    location.reload();
}