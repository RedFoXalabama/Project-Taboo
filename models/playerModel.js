const e = require("express");
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    playerName: { //in realtà futile, perchè il nome della carta è univoco
        type: String,
        required: true,
    },
    playerTeam: {
        type: String,
        required: true,
        enum: { 
            values: ['Red', 'Blue'], 
            message: '{VALUE} is not supported' 
        }
    }
});

module.exports = playerSchema; //Cards è il nome della collection in MongoDB