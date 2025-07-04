const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container3 = document.getElementById('container3');
const container4 = document.getElementById('container4');



document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {

        container1.style.animation = 'fade-out-up 1s forwards';
        setTimeout(() => {
            container1.style.visibility = 'hidden';
            container1.style.position = 'absolute';
            container2.style.display = 'flex';
            container2.style.animation = 'fade-in 1s forwards';

            // Musik automatisch abspielen, falls vorhanden und noch nicht aktiv
            const savedMusic = localStorage.getItem("currentMusic");

            if (savedMusic && (!currentMusic || currentMusic.paused)) {
                switchMusic(savedMusic);
            }
        }, 1000);
    }
    
});

//Musik spielen bei seiten-reload
window.addEventListener("load", () => {
    const savedMusic = localStorage.getItem("currentMusic");
    if (savedMusic) {
        switchMusic(savedMusic);
    }
});


function shop() {
    container3.classList.add("slide-up");
    container3.classList.remove("slide-down");
    document.getElementById("money-counter-shop").innerHTML = `💰 ${money.toFixed(2)}`;
}



function back() {
    container3.classList.add("slide-down");
    container3.classList.remove("slide-up");
}

function settings() {
    container4.classList.add("slide-up");
    container4.classList.remove("slide-down");
    console.log(container4.classList);
    addLabelToContainer();
}

function settingsBack(){
    container4.classList.add("slide-down");
    container4.classList.remove("slide-up");
}

// Responsive Alert
function checkIfMobileOrSmallScreen() {
    const mobileWarning = document.getElementById("mobile-warning");
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 1000;

    if (isMobileDevice || isSmallScreen) {
        mobileWarning.style.display = "flex";
        document.body.style.overflow = "hidden"; 
        blockInput(true);
    } else {
        mobileWarning.style.display = "none";
        document.body.style.overflow = "";
        blockInput(false);
    }
}

function blockInput(shouldBlock) {
    if (shouldBlock) {
        window.addEventListener("keydown", preventAllKeys, true);
        window.addEventListener("keypress", preventAllKeys, true);
        window.addEventListener("keyup", preventAllKeys, true);
    } else {
        window.removeEventListener("keydown", preventAllKeys, true);
        window.removeEventListener("keypress", preventAllKeys, true);
        window.removeEventListener("keyup", preventAllKeys, true);
    }
}

function preventAllKeys(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

window.addEventListener("load", checkIfMobileOrSmallScreen);
window.addEventListener("resize", checkIfMobileOrSmallScreen);

