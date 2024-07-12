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

const redButton = document.getElementById("redButton");
const blueButton = document.getElementById("blueButton");
const body = document.querySelector("body");
redButton.addEventListener("click", () => {
    body.style.background = 'rgb(240,91,102)';
    body.style.background = 'radial-gradient(circle, rgba(240,91,102,1) 0%, rgba(135,1,11,1) 100%)';
});
blueButton.addEventListener("click", () => {
    body.style.background = 'rgb(0,166,229)';
    body.style.background = 'radial-gradient(circle, rgba(0,166,229,1) 0%, rgba(0,38,150,1) 100%)';
});