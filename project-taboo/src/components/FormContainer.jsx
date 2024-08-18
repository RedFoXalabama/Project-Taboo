import LobbyForm from './LobbyForm.jsx';

function FormContainer() {
  return (
    <div id="matchFormContainer">
        <button id="goBackHome"><span>TORNA ALLA HOME</span></button>
        <LobbyForm />
    </div>
  );
}

export default FormContainer;