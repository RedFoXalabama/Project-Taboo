import hasbroLogo from "/assets/Hasbro_logo.svg";

function Footer() {
    return (
        <footer>
            <p>© 2024 Hasbro. Tutti i diritti riservati. Taboo è un marchio registrato di Hasbro. Questo sito non è affiliato, approvato o sponsorizzato da Hasbro. Tutti i nomi, i loghi e le immagini dei giochi da tavolo sono di proprietà dei rispettivi titolari.</p>
            <img id="hasbroLogo"  src={hasbroLogo}/>
        </footer>
    );
}
/*var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
};

function Footer(){
    return (
        <div style={style}>
            <p>© 2024 Hasbro. Tutti i diritti riservati. Taboo è un marchio registrato di Hasbro. Questo sito non è affiliato, approvato o sponsorizzato da Hasbro. Tutti i nomi, i loghi e le immagini dei giochi da tavolo sono di proprietà dei rispettivi titolari.</p>
            <img id="hasbroLogo"  src={hasbroLogo}/>
        </div>
    );
}*/

export default Footer;