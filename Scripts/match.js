//RIPRODUZIONE SOUND EFFECT PER RISPOSTA CORRETTA

const correctButton = document.getElementById("correctButton");
const correctAudio = new Audio("../Assets/gotitem.mp3");
correctButton.addEventListener("click", () => {
    correctAudio.play();
    correctAudio.currentTime = 0;
})