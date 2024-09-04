/* eslint-disable react/prop-types */
function ChangeTurnButton({handleNewTurn}){ //PULSANTE PER CAMBIARE TURNO
    return (
        <button id="changeTurnButton" onClick={handleNewTurn} >PROSSIMO TURNO</button>
    )
}

export default ChangeTurnButton;