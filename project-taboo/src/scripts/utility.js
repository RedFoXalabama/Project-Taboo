function getURL(path){
    return (import.meta.env.DEV ? "http://localhost:3000/api" : "/api") + path ;
}

export { getURL };