import { useState } from 'react'

function LobbyForm(){ 
    const [numPlayers, setNumPlayers] = useState(2);
    return (
        <form id="matchForm">
            <p>Numero di giocatori per squadra</p>
            <input type="button" value="-" id="button-minus" data-field="quantity" onClick={ () => {
                if(numPlayers > 2) {
                    setNumPlayers(numPlayers - 1)
                }
            }}></input>
            <input type="number" id="numPlayers" value= {numPlayers} min="2" name="playerNumber" onChange={ updatePlayerInputs(numPlayers) }  readOnly ></input>
            <input type="button" value="+" id="button-plus" data-field="quantity" onClick={ () => {
                if (numPlayers < 10) {
                    setNumPlayers(numPlayers + 1)
                }
            }} ></input>
            <p>Nomi dei giocatori</p>
            <div id="fullPlayersBox">
                <div id="matchPlayers">
                    <div id="redPlayers">
                        <input className="redPlayersInput" type="text" placeholder="Giocatore 1 - Rosso"></input>
                        <input className="redPlayersInput" type="text" placeholder="Giocatore 2 - Rosso"></input>
                    </div>
                    <div id="bluePlayers">
                        <input className="bluePlayersInput" type="text" placeholder="Giocatore 1 - Blu"></input>
                        <input className="bluePlayersInput" type="text" placeholder="Giocatore 2 - Blu"></input>
                    </div>
                </div>
            </div>
            <p>Numero di turni per giocatore</p>
            <input type="range" id="turnRangeInput" min="1" max="3" step="1" value="1" name="turnNumber"></input>
            <output id="turnRangeOutput">1</output>
            <p>Tempo per turno</p>
            <select id="turnTimeInput" name="turnTime">
                <option value="45">45 secondi</option>
                <option value="60">1 minuto</option>
                <option value="120">2 minuti</option>
            </select>
            <p>Numero di Passo per turno</p>
                <input type="range" id="passRangeInput" max="10" step="1" value="0" name="passPerTurn"></input>
                <output id="passRangeOutput">0</output>
                <input type="submit" id="startMatch" value="INIZIA PARTITA"></input>{/*onInput={postRuleToServer}*/}
        </form>
    );
}


async function updatePlayerInputs(numPlayers) {
    const redPlayers = document.getElementById('redPlayers');
    const bluePlayers = document.getElementById('bluePlayers');

    redPlayers.innerHTML = '';
    bluePlayers.innerHTML = '';


    for (let i=0; i < numPlayers; i++) {

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

/*function updatePlayerInputs(){
    const numPlayers = document.getElementById("numPlayers");
    const redPlayers = document.getElementById('redPlayers');
    const bluePlayers = document.getElementById('bluePlayers');
}*/

export default LobbyForm;