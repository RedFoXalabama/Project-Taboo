/* eslint-disable react/prop-types */
import { useState } from 'react'
import { getURL } from '../scripts/utility';
import { useGameState } from '../scripts/store';

function LobbyForm({onStartMatch}) {
    //STATI DELLE REGOLE DA INVIARE AL SERVER
    const [numPlayers, setNumPlayers] = useState(2);
    const [redPlayers, setRedPlayers] = useState(['','']);
    const [bluePlayers, setBluePlayers] = useState(['','']);
    const [turnRange, setTurnRange] = useState(1);
    const [passRange, setPassRange] = useState(0);
    const [turnTime, setTurnTime] = useState(3);
    const { setGameId } = useGameState();

    //FUNZIONE PER AGGIORNARE GLI INPUT DEI GIOCATORI
    const updatePlayerInputs = (numPlayers) => {
        setRedPlayers(Array(numPlayers).fill(''));
        setBluePlayers(Array(numPlayers).fill(''));
    };

    //POST PER INVIARE I DATI AL SERVER
    async function SendDataToServer() {
        try {
            const data = {
                playerNumber: numPlayers*2, //Numero di giocatori totali
                redTeam : redPlayers,
                blueTeam: bluePlayers,
                turnNumber: turnRange,
                turnTime : turnTime,
                passPerTurn: passRange,
            };
            const response = await fetch(getURL("/rules/addRules/"), {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              },
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Response JSON:", JSON.stringify(jsonResponse)); // Log della risposta JSON
                setGameId({id: jsonResponse._id, new: true}); //Imposto l'id della partita per poterla recuperare successivamente
            } else {
              throw new Error('Request failed!');
            }
          } catch (error) {
            console.log(error);
        }
    }

    //RENDERING DELLA PAGINA
    return (
        <form id="matchForm" onSubmit={
            (e) => { 
                e.preventDefault();
                SendDataToServer();
                onStartMatch();
            }}>
            <p>Numero di giocatori per squadra</p>
            <input type="button" value="-" id="button-minus" data-field="quantity" onClick={ () => {
                if(numPlayers > 2) {
                    setNumPlayers(numPlayers - 1);
                    updatePlayerInputs(numPlayers - 1);
                }
            }}></input>
            <input type="number" id="numPlayers" value= {numPlayers} min="2" name="playerNumber" readOnly ></input>
            <input type="button" value="+" id="button-plus" data-field="quantity" onClick={ () => {
                if (numPlayers < 10) {
                    setNumPlayers(numPlayers + 1);
                    updatePlayerInputs(numPlayers + 1);
                }
            }} ></input>
            <p>Nomi dei giocatori</p>
            <div id="fullPlayersBox">
                <div id="matchPlayers">
                    <div id="redPlayers">
                        { redPlayers.map((_, index) => (
                            <input key={index} className="redPlayersInput" type="text" placeholder={`Giocatore ${index + 1} - Rosso`} value={redPlayers[index]}
                                onChange={ (event) => {
                                    const newRedPlayers = [...redPlayers];
                                    newRedPlayers[index] = event.target.value;
                                    setRedPlayers(newRedPlayers);
                                }}
                            ></input>
                        ))}
                    </div>
                    <div id="bluePlayers">
                        { bluePlayers.map((_, index) => (
                            <input key={index} className="bluePlayersInput" type="text" placeholder={`Giocatore ${index + 1} - Blu`} value={bluePlayers[index]}
                                onChange={ (event) => {
                                    const newBluePlayers = [...bluePlayers];
                                    newBluePlayers[index] = event.target.value;
                                    setBluePlayers(newBluePlayers);
                                }}
                            ></input>
                        ))}
                    </div>
                </div>
            </div>
            <p>Numero di turni per giocatore</p>
            <input type="range" id="turnRangeInput" min="1" max="3" step="1" value={turnRange} name="turnNumber" onChange={(e) => setTurnRange(e.target.value)}></input>
            <output id="turnRangeOutput">{turnRange}</output>
            <p>Tempo per turno</p>
            <select id="turnTimeInput" name="turnTime" value={turnTime} onChange={(e) => setTurnTime(e.target.value)}>
                <option value="3">TEST</option>
                <option value="45">45 secondi</option>
                <option value="60">1 minuto</option>
                <option value="120">2 minuti</option>
            </select>
            <p>Numero di Passo per turno</p>
                <input type="range" id="passRangeInput" max="10" step="1" value={passRange} name="passPerTurn" onChange={(e) => setPassRange(e.target.value)}></input>
                <output id="passRangeOutput">{passRange}</output>
                <input type="submit" id="startMatch" value="INIZIA PARTITA"></input>{/*onInput={postRuleToServer}*/}
        </form>
    );
}

export default LobbyForm;