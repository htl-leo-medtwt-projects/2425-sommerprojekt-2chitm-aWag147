//Upgrades

//Team
let teamUpgradeActive = false;
let teamUpgradeInterval;
let upgradeCostTeam = 100;
let incomePerSecond = 2;

//Camera
let upgradeCostCamera = 100;
let cameraUpgradeActive = false;


function teamUpgrade() {
    if (money >= upgradeCostTeam) {  
        money -= upgradeCostTeam;
        
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
        upgradeCostTeam *= 2;
        incomePerSecond *= 2;

        // UI aktualisieren
        updateUI();
        
        //Speichern
        saveGameState();
    }
}

//Das Upgrade wird auch aus dem Localstorage geladen
function loadUpgradeTeam() {
    if (teamUpgradeActive) {
        if (!teamUpgradeInterval) { 
            teamUpgradeInterval = setInterval(() => {
                money += incomePerSecond;
                followers += incomePerSecond / 2;
                updateUI();
                saveGameState();
            }, 1000);
        }
    }

    updateUI();
}

function cameraUpgrade(){
    if (money >= upgradeCostCamera) {  
        money -= upgradeCostCamera;
        
        // Falls noch kein Interval läuft, starte es
        if (!cameraUpgradeActive) {
            cameraUpgradeActive = true;

            clicks *= 2;
            updateUI();
        }

        // Upgrade-Kosten und Einkommen verdoppeln
        clicks *= 2;
        upgradeCostCamera *= 3;
        

        // UI aktualisieren
        updateUI();
        
        //Speichern
        saveGameState();
    }
}