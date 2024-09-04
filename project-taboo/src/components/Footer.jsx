import hasbroLogo from "/assets/Hasbro_logo.svg";

function Footer() { //FOOTER DELLA PAGINA
    return (
        <footer>
            <p>© 2024 Hasbro. Tutti i diritti riservati. Taboo è un marchio registrato di Hasbro. Questo sito non è affiliato, approvato o sponsorizzato da Hasbro. Tutti i nomi, i loghi e le immagini dei giochi da tavolo sono di proprietà dei rispettivi titolari.</p>
            <p>Progetto realizzato da Gianfranco Baccarella, Angelo Calò e Manuele Lin.</p>
            <img id="hasbroLogo"  src={hasbroLogo}/>
        </footer>
    );
}

export default Footer;