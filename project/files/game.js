
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

let autoClicksPerSecond = 0;
let clicksPerClick = 1;




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
    localStorage.setItem('upgradeCostPhone', upgradeCostPhone);
    localStorage.setItem('upgradeCostYoutube', upgradeCostYoutube);
    localStorage.setItem('liveIsOn', liveIsOn);
    localStorage.setItem('autoClicksPerSecond', autoClicksPerSecond);
    localStorage.setItem('clicksPerClick', clicksPerClick);

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
    const savedUpgradeCostPhone = parseInt(localStorage.getItem('upgradeCostPhone'));
    const savedUpgradeCostYoutube = parseInt(localStorage.getItem('upgradeCostYoutube'))
    const savedLiveIsOn = localStorage.getItem('liveIsOn');
        liveIsOn = savedLiveIsOn === "true";

    if (liveIsOn) {
        document.getElementById('chatContainer').style.display = 'block';
        document.getElementById('livechat').style.display = 'none';
    }
    const savedAutoClicksPerSecond = parseFloat(localStorage.getItem('autoClicksPerSecond'));
    const savedClicksPerClick = parseFloat(localStorage.getItem('clicksPerClick'));


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
    if (!isNaN(savedUpgradeCostPhone)) upgradeCostPhone = savedUpgradeCostPhone;
    if (!isNaN(savedUpgradeCostYoutube)) upgradeCostYoutube = savedUpgradeCostYoutube;
    if (!isNaN(savedAutoClicksPerSecond)) autoClicksPerSecond = savedAutoClicksPerSecond;
    if (!isNaN(savedClicksPerClick)) clicksPerClick = savedClicksPerClick;

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
    document.getElementById("money").textContent = formatNumberFixed(money);
    document.getElementById("followers").textContent = formatNumberFixed(followers);
    document.getElementById("money-shop").textContent = formatNumberFixed(money);
    document.getElementById("autoClicksDisplay").textContent = `Auto-Clicks/sec: ${autoClicksPerSecond}`;
    document.getElementById("clicksPerClickDisplay").textContent = `Clicks per Click: ${clicksPerClick}`;

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
        { id: "smartphone", text: null },
        { id: "shop", text: "Buy fun things in the shop." },
        { id: "settings", text: "Change your settings." },
        { id: "youtube", text: null },
        { id: "livechat", text: null },
        { id: "follower-counter", text: "Your followers." },
        { id: "money-counter", text: "Your money." }
    ];

    elements.forEach(item => {
        const element = document.getElementById(item.id);
        if (!element) return;

        element.addEventListener("mouseenter", (event) => {
            let newText = item.id === "team" ? `Hire a camera-team for $${formatNumber(upgradeCostTeam)}` : 
                           item.id === "camera" ? `Invest in equipment for $${formatNumber(upgradeCostCamera)}` : 
                           item.id === "smartphone" ? `Upgrade phone for $${formatNumber(upgradeCostPhone)}` :
                           item.id === "youtube" ? `2nd Account for $${formatNumber(upgradeCostYoutube)}` :
                           item.id === "livechat" ? `Go live for $${formatNumber(upgradeCostChat)}` :
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

function formatNumberFixed(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + ' B'; 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + ' M';  
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + ' K'; 
    } else {
        return num;
    }
}


function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';  
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';  
    } else {
        return num;
    }
}


//Chat
const messages = [
    "User123: That was insane!",
    "NightBot: Remember to like and subscribe!",
    "GamerGirl: Let's goooo 🔥🔥🔥",
    "NoScopeKing: CLUTCH!!!",
    "Moderator: Please be respectful in chat.",
    "Viewer42: I can’t believe that just happened",
    "StreamerFan99: You’re cracked bro 😂",
    "CamperSlayer: RIP enemies 💀",
    "WackyWaffles: Pog moment!",
    "NightBot: Join our Discord: discord.gg/xyz",
    "User123: I'm clipping that for sure",
    "SpeedyG: Fastest round ever",
    "ProGamer: That was so clean!",
    "StreamerFan99: Love this stream fr 💯",
    "User42: When's the next collab?",
    "NoScopeKing: MVP plays all day Cigany😎",
    "Moderator: Chill with the spam, please.",
    "NightBot: Follow on Twitter @StreamerXYZ",
    "GamerGirl: What a W!"
  ];

  const chatContainer = document.getElementById("chatContainer");
  let msgIndex = 0;

  function addMessage() {
    if (msgIndex >= messages.length) {
      msgIndex = 0; // Loop if needed
    }

    const bubble = document.createElement("div");
    bubble.classList.add("message");
    bubble.textContent = messages[msgIndex];
    chatContainer.appendChild(bubble);

    // Auto-scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    msgIndex++;
    setTimeout(addMessage, 1200); // New message every 1.2 sec
  }

  addMessage();