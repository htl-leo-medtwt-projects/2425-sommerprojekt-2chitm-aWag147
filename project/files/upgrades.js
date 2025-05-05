// Upgrades
//Team
let teamUpgradeActive = false;
let teamUpgradeInterval;
let upgradeCostTeam = 100;
let incomePerSecond = 2;

//Team
let upgradeCostCamera = 100;

//Phone
let upgradeCostPhone = 10000;

//Youtube
let upgradeCostYoutube = 50000;

//LiveChat
let upgradeCostChat = 100000;
let liveIsOn = false;

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
        upgradeCostCamera *= 3;

        updateUI();
        saveGameState();
        showNotification("Camera-Upgrade aktiviert!");
    }

    
}


//Phone Upgrade
function phoneUpgrade(){
    if (money >= upgradeCostPhone) {  
        money -= upgradeCostPhone;

        clicks *= 5;
        upgradeCostPhone *= 3;

        updateUI();
        saveGameState();
        showNotification("Phone-Upgrade aktiviert!");
    }

    
}


// Second YouTube Channel
function youtubeUpgrade() {
    if (money >= upgradeCostYoutube) {  
        money -= upgradeCostYoutube;

        incomePerSecond *= 10;

        upgradeCostYoutube *= 2;

        updateUI();
        saveGameState();
        showNotification("YouTube-Upgrade aktiviert!");
    }

    
}


//Live-Chat
function liveChat(){
    if (money >= upgradeCostChat) {  
        money -= upgradeCostChat;

        liveIsOn = true;
        document.getElementById('chatContainer').style.display = 'block';
        document.getElementById('livechat').style.display = 'none';

        updateUI();
        saveGameState();

        showNotification("LiveChat aktiviert!");
    }
}