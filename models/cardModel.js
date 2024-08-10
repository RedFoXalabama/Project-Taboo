const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    cardId: { //in realtà futile, perchè il nome della carta è univoco
        type: Number,
        required: true,
    },
    cardWord: {
        type: String,
        required: true,
    },
    tabooWords: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model("Cards", cardSchema); //Cards è il nome della collection in MongoDB