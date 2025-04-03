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
        
        //Speichern
        saveGameState();
    }
}

//Das Upgrade wird auch aus dem Localstorage geladen
function loadUpgrade() {
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