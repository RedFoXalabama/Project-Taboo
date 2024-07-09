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

//FUNZIONE CHE CREA INPUT DEI NOMI GIOCATORE SEGUENDO L'INPUT DEL NUMERO DI GIOCATORI - NON FUNZIONANTE

const redPlayers = document.querySelector('#redPlayers');
const bluePlayers = document.querySelector('#bluePlayers');
const numPlayers = document.querySelector('#numPlayers');

/*numPlayers.addEventListener("input", (e) => {
    let i = 0;
    while(i<=e.target.value){
        this.redPlayersInput.createElement('input');
        this.redPlayersInput.setAttribute('type', 'text');
        this.redPlayersInput.setAttribute('placeholder', `Giocatore ${i} - Rosso`);
        redPlayers.appendChild(document.createElement('input'));
        this.bluePlayersInput = document.createElement('input');
        this.bluePlayersInput.setAttribute('type', 'text');
        this.bluePlayersInput.setAttribute('placeholder', `Giocatore ${i} - Blu`);
        bluePlayers.appendChild(bluePlayersInput);
        i++;
    }
})*/