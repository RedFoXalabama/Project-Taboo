/* eslint-disable react/prop-types */

function Header( {imgID}) {
  return (
    <header>
      <img src="/assets/Taboo_logo.png" id={imgID}></img>
    </header>
  );
}
export default Header;