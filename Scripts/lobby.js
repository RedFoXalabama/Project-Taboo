//SLIDER PASSO

const passRangeInput = document.querySelector('#passRangeInput');
const passRangeOutput = document.querySelector('#passRangeOutput');

passRangeInput.addEventListener("input", (e) => 
    {
        passRangeOutput.value = e.target.value;
    }
);

//SLIDER TURNI

const turnRangeInput = document.querySelector('#turnRangeInput');
const turnRangeOutput = document.querySelector('#turnRangeOutput');
turnRangeInput.addEventListener("input", (e) => 
    {
        turnRangeOutput.value = e.target.value;
    }
);

//FUNZIONE CHE CREA INPUT DEI NOMI GIOCATORE SEGUENDO L'INPUT DEL NUMERO DI GIOCATORI

const numPlayers = document.getElementById("numPlayers");

function updatePlayerInputs() {
    const redPlayers = document.getElementById('redPlayers');
    const bluePlayers = document.getElementById('bluePlayers');

    redPlayers.innerHTML = '';
    bluePlayers.innerHTML = '';


for (let i=0; i < numPlayers.value; i++) {

    const redPlayersInput = document.createElement('input');
    redPlayersInput.className = "redPlayersInput";
    redPlayersInput.setAttribute('type', 'text');
    redPlayersInput.setAttribute('placeholder', `Giocatore ${i+1} - Rosso`);

    const bluePlayersInput = document.createElement('input');
    bluePlayersInput.className = "bluePlayersInput";
    bluePlayersInput.setAttribute('type', 'text');
    bluePlayersInput.setAttribute('placeholder', `Giocatore ${i+1} - Blu`);

    redPlayers.appendChild(redPlayersInput);
    bluePlayers.appendChild(bluePlayersInput);
}
}

document.addEventListener('DOMContentLoaded', updatePlayerInputs);
numPlayers.addEventListener('input', updatePlayerInputs);

//FUNZIONE PROVVISORIA CHE IMPEDISCE DI SETTARE UN VALORE MINORE DI 2 PER IL NUMERO DI GIOCATORI
//PER SQUADRA

numPlayers.addEventListener('change', (e) => {
    if(e.target.value < 2) {
        alert("I giocatori in una squadra devono essere almeno 2!");
    e.target.value = 2;
    updatePlayerInputs();
    }
})

//

const buttonMinus = document.getElementsByClassName("button-minus");
const buttonPlus = document.getElementsByClassName("button-plus");

buttonMinus.addEventListener('click',() => {
    alert("a");
})
buttonPlus.addEventListener("click", () => {
    numPlayers.value++;
    alert("aaa");
});



