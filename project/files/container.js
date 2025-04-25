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
    switchCategory("music");

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

//Library
// Erstelle Granim-Instanzen für jeden Button
document.querySelectorAll('.buy-button').forEach(button => {
    // Erstelle Canvas-Element
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-basic';
    button.prepend(canvas); // Füge Canvas dem Button hinzu
    
    // Initialisiere Granim für diesen Canvas
    new Granim({
        element: canvas,
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#ff9966', '#ff5e62'],
                    ['#00F260', '#0575E6'],
                    ['#e1eec3', '#f05053']
                ],
                transitionSpeed: 2000
            }
        }
    });
});
