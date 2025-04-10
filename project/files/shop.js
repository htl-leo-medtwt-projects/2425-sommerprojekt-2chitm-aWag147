function activateTheme(themeName) {
    // Entferne alle bestehenden Theme-Klassen
    document.body.classList.remove("theme-night", "theme-sun");
    
    // Füge die entsprechende Klasse basierend auf dem Namen des Themes hinzu
    if (themeName === "night") {
        document.body.classList.add("theme-night");
        console.log("NIGHT");
    } else if (themeName === "sun") {
        document.body.classList.add("sun-light");
    }
}


function activateCursor(cursorName) {
    document.body.style.cursor = `url('media/cursors/${cursorName}.png'), auto`;
    console.log(`Cursor "${cursorName}" aktiviert.`);
}

function playMusic(musicName) {
    const audio = new Audio(`media/music/${musicName}.mp3`);
    audio.play();
    console.log(`Musik "${musicName}" wird abgespielt.`);
}
