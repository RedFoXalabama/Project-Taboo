//RIPRODUZIONE SOUND EFFECT PER RISPOSTA CORRETTA

const correctButton = document.getElementById("correctButton");
const correctAudio = new Audio("../Assets/gotitem.mp3");
correctButton.addEventListener("click", () => {
    correctAudio.play();
    correctAudio.currentTime = 0;
});
//RIPRODUZIONE SOUND EFFECT PER RISPOSTA SBAGLIATA
//const tabooButton = document.getElementById("tabooButton");
//const tabooAudio = new Audio("../Assets/taboo_button_sfx.mp3");
/*tabooButton.addEventListener("click", () => {
    tabooAudio.play();
    tabooAudio.currentTime = 0;
});*/
//RIPODUZIONE SOUND EFFECT PER SKIP
const skipButton = document.getElementById("skipButton");
const skipAudio = new Audio("../Assets/skip_button_sfx.mp3");
skipButton.addEventListener("click", () => {
    skipAudio.play();
    skipAudio.currentTime = 0;
});

//PULSANTI DI PROVA PER IL CAMBIO TURNO, SARANNO SOSTITUITI DA UNO SCRIPT AUTOMATICO

const redButton = document.getElementById("redButton");
const blueButton = document.getElementById("blueButton");
const body = document.querySelector("body");
const wordContainer = document.getElementById("wordContainer");
redButton.addEventListener("click", () => {
    body.style.background = 'rgb(240,91,102)';
    body.style.background = 'radial-gradient(circle, rgba(240,91,102,1) 0%, rgba(135,1,11,1) 68%)';
    //wordContainer.setAttribute('background-image', 'url("../Assets/carta_bordo_interno_rosso.png")'); sarebbe meglio usare questo perchè asincrono, ma non funge
    wordContainer.style.backgroundImage = 'url("../Assets/carta_bordo_interno_rosso.png")';
});
blueButton.addEventListener("click", () => {
    body.style.background = 'rgb(0,166,229)';
    body.style.background = 'radial-gradient(circle, rgba(0,166,229,1) 0%, rgba(0,38,150,1) 68%)';
    //wordContainer.setAttribute('background-image', 'url("../Assets/carta_bordo_interno_blu.png")');
    wordContainer.style.backgroundImage = 'url("../Assets/carta_bordo_interno_blu.png")';
});

async function fetchCards() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/cards'); // Assicurati che l'endpoint sia corretto
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cards = await response.json();
        console.log(cards); // Fai qualcosa con i dati delle carte
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

fetchCards(); // Chiama la funzione per ottenere i dati delle carte