/* eslint-disable react/prop-types */
import LobbyForm from './LobbyForm.jsx';

function FormContainer({onStartMatch}) {
  return (
    <div id="matchFormContainer">
        <button id="goBackHome"><span>TORNA ALLA HOME</span></button>
        <LobbyForm onStartMatch={onStartMatch} />
    </div>
  );
}

export default FormContainer;