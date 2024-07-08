const startGame = document.querySelector("#startGame");
startGame.addEventListener("click" ,() => {
    window.location.href = "lobby.html"
});

const passRangeController = document.querySelector('#passRangeInput');
const passRangeOutput = document.querySelector('#passRangeOutput');

passRangeController.addEventListener('input', (e) => {
  passRangeOutput.value = e.target.value;
});
