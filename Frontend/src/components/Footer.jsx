import hasbroLogo from "/assets/Hasbro_logo.svg";

function Footer() { //FOOTER DELLA PAGINA
    return (
        <footer>
            <p>© 2024 Hasbro. Tutti i diritti riservati. Taboo è un marchio registrato di Hasbro. Questo sito non è affiliato, approvato o sponsorizzato da Hasbro. Tutti i nomi, i loghi e le immagini dei giochi da tavolo sono di proprietà dei rispettivi titolari. Applicazione realizzata come progetto d&apos;esame di Fondamenti Web del Politecnico di Bari (A.A. 23/24) senza fini commerciali o di lucro.</p>
            <p>
                Progetto realizzato da <a href="https://github.com/RedFoXalabama" target="_blank">Gianfranco Baccarella</a>, <a href="https://github.com/bbrushh" target="_blank">Angelo Calò</a> e <a href="https://github.com/YuMo594" target="_blank">Manuele Lin</a>.
            </p>
            <img id="hasbroLogo"  src={hasbroLogo}/>
        </footer>
    );
}

export default Footer;