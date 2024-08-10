const port = 5500;
const http = require("http");
const app = http.createServer((req, res) => {
    console.log(http);
    res.write("<h1>Prova di testo</h1>");
    res.end();
});

app.listen(port, () => {
    console.log("Il server ti sente sulla porta: " + port);
})