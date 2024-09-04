/* eslint-disable react/prop-types */

function StartGame({onStartGame}) { //BOTTONI PER PASSARE AL FORM DELLE REGOLE
  return (
    <div id="startArea">
        <button id="startGame" onClick={onStartGame}>INIZIA A GIOCARE</button>
    </div>
  );
}

export default StartGame;