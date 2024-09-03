/* eslint-disable react/prop-types */
import LobbyForm from './LobbyForm.jsx';

function FormContainer({onStartMatch, onBackToIndex}) {
  return (
    <div id="lobbyMain">
          <div id="matchFormContainer">
        <button id="goBackHome" onClick={(e) => {
            e.preventDefault();
            onBackToIndex();
          }}
            ><span>TORNA ALLA HOME</span></button>
        <LobbyForm onStartMatch={onStartMatch} />
    </div>
    </div>
  );
}

export default FormContainer;