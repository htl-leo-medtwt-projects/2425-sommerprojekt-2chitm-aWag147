// Upgrades
//Team
let teamUpgradeActive = false;
let teamUpgradeInterval;
let upgradeCostTeam = 100;
let incomePerSecond = 2;

//Team
let upgradeCostCamera = 100;
let cameraUpgradeActive = false;


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

        if (!cameraUpgradeActive) {
            cameraUpgradeActive = true;
            clicks *= 2;
        }

        clicks *= 2;
        upgradeCostCamera *= 3;

        updateUI();
        saveGameState();
    }
}