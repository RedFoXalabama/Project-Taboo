import {useGameState, useCardWords} from "../scripts/store";

function Card() { //CARTA GRAFICA DA MOSTRARE A SCHERMO, AGGIORNATA TRAMITE STATE DELLO STORE
    const {currentTeam} = useGameState();
    const {cardWord, tabooWords} = useCardWords();

    return (
        <div id="cardContainer">
            <div id="wordContainer" style={ { //COLORE DELLA CARTA
                backgroundImage: `url(${currentTeam === "red" ? "assets/carta_bordo_interno_rosso.png" : "assets/carta_bordo_interno_blu.png"})`
            } }> 
                <p id="cardWord">{cardWord}</p> {/*PAROLA DA INDOVINARE*/}
                <div id="listContainer">
                    <ul id="cardList"> {/*PAROLE TABU*/}
                        <li id="cardListElement0">{tabooWords[0]}</li>
                        <li id="cardListElement1">{tabooWords[1]}</li>
                        <li id="cardListElement2">{tabooWords[2]}</li>
                        <li id="cardListElement3">{tabooWords[3]}</li>
                        <li id="cardListElement4">{tabooWords[4]}</li>
                    </ul> 
                </div>
            </div>
        </div>
    )
}

export default Card;