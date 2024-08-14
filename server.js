//MODULES
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const cardRoutes = require("./routes/cards");
const cardSchema = require("./models/cardModel");
const cardController = require("./controllers/cardController");
let cards = [];

//VARIABILI
const port = 3000;
const path = "mongodb+srv://client:project-taboo-password@project-taboo-db.oajpkwv.mongodb.net/Project-Taboo-DB?retryWrites=true&w=majority&appName=Project-Taboo-DB";
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use("/", cardRoutes);     //app.get('/api/cards', cardController.getAllCards); route più specifica

//DATABASE CONNECTION
mongoose.connect(path).then( () => { 
  console.log("Connessione al Database riuscita");
  app.listen(port, () => {
      console.log("Connesso sulla porta " + port);
  })
});