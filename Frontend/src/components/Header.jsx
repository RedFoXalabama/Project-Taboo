/* eslint-disable react/prop-types */

function Header( {imgID}) { //HEADER CON LOGO CHE SI AGGIORNA IN BASE ALLO STATO DELLA PAGINA (aggiornato da App)
  return (
    <header>
      <img src="/assets/Taboo_logo.png" id={imgID}></img>
    </header>
  );
}
export default Header;