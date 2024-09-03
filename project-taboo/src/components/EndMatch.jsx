/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useGameState } from "../scripts/store";

function EndMatch({onHandleBackToIndex, onHandleStartGame}){
    const {setGameId , winningTeam } = useGameState();

    useEffect(() => {
        setGameId({id: null, new: false});
    }, []);
    
    switch(winningTeam){
        case "RED":
            return (
                <div>
                    <h1 className="winningText" >VINCE LA SQUADRA <span id="redWins">ROSSA</span></h1>
                    <div id="EndMatchButtonContainer">
                        <button id="goBackHomeAfterMatch" onClick={onHandleBackToIndex}>TORNA ALLA HOME</button>
                        <button id="playAgainButton" onClick={onHandleStartGame}>GIOCA DI NUOVO</button>
                    </div> 
                </div>
            );
        case "BLUE":
            return (
                <div>
                    <h1 className="winningText" >VINCE LA SQUADRA <span id="blueWins" >BLU</span></h1>
                    <div id="EndMatchButtonContainer">
                        <button id="goBackHomeAfterMatch" onClick={onHandleBackToIndex}>TORNA ALLA HOME</button>
                        <button id="playAgainButton" onClick={onHandleStartGame}>GIOCA DI NUOVO</button>
                    </div> 
                </div>
            );
        case "TIE":
            return (
                <div>
                    <h1 className="winningText" >É UN PAREGGIO</h1>
                    <div id="EndMatchButtonContainer">
                        <button id="goBackHomeAfterMatch" onClick={onHandleBackToIndex}>TORNA ALLA HOME</button>
                        <button id="playAgainButton" onClick={onHandleStartGame}>GIOCA DI NUOVO</button>
                    </div> 
                </div>
            );
    }
}

export default EndMatch;