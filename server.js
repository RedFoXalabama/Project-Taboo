const express = require("express");
const port = 3000;
const cors = require('cors');
const mongoose = require("mongoose");
const collectionRoutes = require("./routes/cards");
const path = "mongodb+srv://gianfrancobaccarella:project-taboo-password@project-taboo-db.oajpkwv.mongodb.net/?retryWrites=true&w=majority&appName=Project-Taboo-DB";

const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.static("static"));
//app.use("/api/collections", collectionRoutes);

mongoose.connect(path).then( () => {
    console.log("Connessione al Database riuscita");
    app.listen(port, () => {
        console.log("Connesso sulla porta 3000");
    })
}).catch((err) => {
    console.log(err)
});