/* eslint-disable react/prop-types */
function ChangeTurnButton({handleNewTurn}){
    return (
        <button id="changeTurnButton" onClick={handleNewTurn} >PROSSIMO TURNO</button>
    )
}

export default ChangeTurnButton;