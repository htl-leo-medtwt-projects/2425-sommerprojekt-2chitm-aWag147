// Upgrades & Kosten

// Team
let teamUpgradeActive = false;
let teamUpgradeInterval;
let upgradeCostTeam = 100;
let incomePerSecond = 2;

// Kamera
let upgradeCostCamera = 100;

// Phone
let upgradeCostPhone = 10000;

// YouTube
let upgradeCostYoutube = 50000;

// LiveChat
let upgradeCostChat = 100000;
let liveIsOn = false;

// Upgrade-Zähler
let upgradesOwned = {
    team: 0,
    camera: 0,
    phone: 0,
    youtube: 0,
    chat: 0
};

// Upgrade-Profil-UI

function updateUpgradeProfile() {
    const list = document.getElementById('upgradeList');
    if (!list) return; // Verhindere Fehler, falls HTML fehlt
    list.innerHTML = `
        <li>👥 Team: ${upgradesOwned.team}</li>
        <li>📸 Kamera: ${upgradesOwned.camera}</li>
        <li>📱 Phone: ${upgradesOwned.phone}</li>
        <li>▶️ YouTube: ${upgradesOwned.youtube}</li>
        <li>💬 Chat: ${upgradesOwned.chat}</li>
    `;
}

// Upgrade-Funktionen
// Team Upgrade
function teamUpgrade() {
    if (money >= upgradeCostTeam) {  
        money -= upgradeCostTeam;
        
        if (!teamUpgradeActive) {
            teamUpgradeActive = true;
            teamUpgradeInterval = setInterval(() => {
                money += incomePerSecond;
                followers += incomePerSecond / 2;
                updateUI();
                saveGameState();
            }, 1000);
        }

        upgradeCostTeam *= 2;
        incomePerSecond *= 2;
        autoClicksPerSecond = incomePerSecond;

        upgradesOwned.team++;
        updateUpgradeProfile();
        saveUpgradeState();
        highlightStatsBox();

        updateUI();
        saveGameState();
        showNotification("Team-Upgrade aktiviert!");
    }
}

function loadUpgradeTeam() {
    if (teamUpgradeActive && !teamUpgradeInterval) {
        teamUpgradeInterval = setInterval(() => {
            money += incomePerSecond;
            followers += incomePerSecond / 2;
            updateUI();
            saveGameState();
        }, 1000);
    }
    updateUI();
}

// Kamera Upgrade
function cameraUpgrade() {
    if (money >= upgradeCostCamera) {  
        money -= upgradeCostCamera;
        
        clicks *= 2;
        clicksPerClick = clicks;
        upgradeCostCamera *= 3;

        upgradesOwned.camera++;
        updateUpgradeProfile();
        saveUpgradeState();
        highlightStatsBox();

        updateUI();
        saveGameState();
        showNotification("Camera-Upgrade aktiviert!");
    }
}

// Phone Upgrade
function phoneUpgrade() {
    if (money >= upgradeCostPhone) {  
        money -= upgradeCostPhone;

        clicks *= 5;
        clicksPerClick = clicks;
        upgradeCostPhone *= 3;

        upgradesOwned.phone++;
        updateUpgradeProfile();
        saveUpgradeState();
        highlightStatsBox();

        updateUI();
        saveGameState();
        showNotification("Phone-Upgrade aktiviert!");
    }
}

// YouTube Upgrade
function youtubeUpgrade() {
    if (money >= upgradeCostYoutube) {  
        money -= upgradeCostYoutube;

        incomePerSecond *= 10;
        autoClicksPerSecond = incomePerSecond;
        upgradeCostYoutube *= 2;

        upgradesOwned.youtube++;
        updateUpgradeProfile();
        saveUpgradeState();
        highlightStatsBox();

        updateUI();
        saveGameState();
        showNotification("YouTube-Upgrade aktiviert!");
    }
}

// LiveChat Upgrade
function liveChat() {
    if (money >= upgradeCostChat) {  
        money -= upgradeCostChat;

        liveIsOn = true;
        document.getElementById('chatContainer').style.display = 'block';
        document.getElementById('livechat').style.display = 'none';

        upgradesOwned.chat++;
        updateUpgradeProfile();
        saveUpgradeState();
        highlightStatsBox();

        updateUI();
        saveGameState();
        showNotification("LiveChat aktiviert!");
    }
}

// Beim Laden der Seite
window.addEventListener('load', () => {
    updateUpgradeProfile();
});

// Upgrade-Zustand speichern & laden

function saveUpgradeState() {
    localStorage.setItem('upgradesOwned', JSON.stringify(upgradesOwned));
}

function loadUpgradeState() {
    const savedUpgrades = localStorage.getItem('upgradesOwned');
    if (savedUpgrades) {
        upgradesOwned = JSON.parse(savedUpgrades);
        updateUpgradeProfile();
    }
}

window.addEventListener('load', () => {
    loadUpgradeState();     // Upgrade-Zähler laden
    updateUpgradeProfile(); // Profilanzeige updaten
});

//Highlighten der Box
function highlightStatsBox() {
  const statsBox = document.getElementById('upgradeProfile');
  if (!statsBox) return;

  statsBox.classList.add('highlight');

  setTimeout(() => {
    statsBox.classList.remove('highlight');
  }, 1000);
}

