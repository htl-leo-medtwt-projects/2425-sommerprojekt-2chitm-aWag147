const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container3 = document.getElementById('container3');



document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {

        container1.style.animation = 'fade-out-up 1s forwards';
        setTimeout(() => {
            container1.style.visibility = 'hidden';
            container1.style.position = 'absolute';
            container2.style.display = 'flex';
            container2.style.animation = 'fade-in 1s forwards';
        }, 1000);
    }
});

function shop() {
    container3.classList.add("slide-up");
    container3.classList.remove("slide-down");
    switchCategory("music");
}


function back() {
    container3.classList.add("slide-down");
    container3.classList.remove("slide-up");
}
