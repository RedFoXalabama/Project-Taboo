function getURL(path){ //FUNZIONE PER OTTENERE L'URL E GESITRE L'AMBIENTE DI SVILUPPO
    return (import.meta.env.DEV ? "http://localhost:3000/api" : "/api") + path ;
}

export { getURL };