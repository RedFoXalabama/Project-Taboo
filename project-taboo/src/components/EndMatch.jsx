/* eslint-disable react/prop-types */
import { useGameState } from "../scripts/store";

function EndMatch({onHandleBackToIndex, onHandleStartGame}){
    const { winningTeam } = useGameState();
    switch(winningTeam){
        case "RED":
            return (
                <div>
                    <h1>VINCE LA SQUADRA ROSSA</h1>
                    <div id="EndMatchButtonContainer">
                        <button onClick={onHandleBackToIndex}>Torna alla Home</button>
                        <button onClick={onHandleStartGame}>Rigioca</button>
                    </div> 
                </div>
            );
        case "BLUE":
            return (
                <div>
                    <h1>VINCE LA SQUADRA BLU</h1>
                    <div id="EndMatchButtonContainer">
                        <button onClick={onHandleBackToIndex}>Torna alla Home</button>
                        <button onClick={onHandleStartGame}>Rigioca</button>
                    </div> 
                </div>
            );
        case "TIE":
            return (
                <div>
                    <h1>É UN PAREGGIO</h1>
                    <div id="EndMatchButtonContainer">
                        <button onClick={onHandleBackToIndex}>Torna alla Home</button>
                        <button onClick={onHandleStartGame}>Rigioca</button>
                    </div> 
                </div>
            );
    }
}

export default EndMatch;