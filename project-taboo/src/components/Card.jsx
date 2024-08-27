/* eslint-disable react/prop-types */
import useGameState from "../scripts/store";

function Card({handleNewCard}) {
    const {currentTeam} = useGameState();

    return (
        <div id="cardContainer">
            <div id="wordContainer" style={ { 
                backgroundImage: `url(${currentTeam === "red" ? "assets/carta_bordo_interno_rosso.png" : "assets/carta_bordo_interno_blu.png"})`
            } }> 
                <p id="cardWord">ANGELO</p>
                <div id="listContainer">
                    <ul id="cardList">
                        <li id="cardListElement0">Parola 1</li>
                        <li id="cardListElement1">Parola 2</li>
                        <li id="cardListElement2">Parola 3</li>
                        <li id="cardListElement3">Parola 4</li>
                        <li id="cardListElement4">Parola 5</li>
                    </ul> 
                </div>
            </div>
        </div>
    )
}

export default Card;