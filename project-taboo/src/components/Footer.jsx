import hasbroLogo from "/assets/Hasbro_logo.svg";

function Footer() {
    return (
        <footer>
            <p>© 2024 Hasbro. Tutti i diritti riservati. Taboo è un marchio registrato di Hasbro. Questo sito non è affiliato, approvato o sponsorizzato da Hasbro. Tutti i nomi, i loghi e le immagini dei giochi da tavolo sono di proprietà dei rispettivi titolari.</p>
            <img id="hasbroLogo"  src={hasbroLogo}/>
        </footer>
    );
}

export default Footer;