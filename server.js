//MODULES
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const cardRoutes = require("./routes/cards");
const bodyParser = require("body-parser");
const ruleRoutes = require("./routes/rules");
const { argv } = require('node:process');

//VARIABILI
const port = 3000;
const path = "mongodb+srv://client:project-taboo-password@project-taboo-db.oajpkwv.mongodb.net/Project-Taboo-DB?retryWrites=true&w=majority&appName=Project-Taboo-DB";
const app = express();
const isDev = argv.find(arg => arg === "--dev") != null; //Variabile per gestire l'ambiente di sviluppo

//MIDDLEWARE
if (isDev) { //Se è in ambiente di sviluppo, disabilita la protezione CORS poichè server sulla 3000 e sito sulla 5137, frontend e backend sono su porte diverse
  console.log("Running in development mode");
  app.use(cors());
}
app.use(express.json());
app.use(express.static("project-taboo/dist" , {index: "index.html"})); //Serve la cartella dist come statica, frontend e backend sono sulla stessa porta
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/api/cards", cardRoutes);
app.use("/api/rules", ruleRoutes);


//DATABASE CONNECTION
mongoose.connect(path).then( () => { 
  console.log("Connessione al Database riuscita");
  app.listen(port, () => {
      console.log("Connesso sulla porta " + port);
  })
});