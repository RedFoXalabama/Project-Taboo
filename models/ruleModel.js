const e = require("express");
const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
    playerNumber: {
        type: Number,
        required: true,
    },
    redTeam: { //in realtà futile, perchè il nome della carta è univoco
        type: Array,
        required: true,
    },
    blueTeam: {
        type: Array,
        required: true,
    },
    turnNumber: {
        type: Number,
        required: true,
    },
    turnTime: {
        type: Number,
        required: true,
    },
    passPerTurn: {
        type: Number,
        required: true,
    },
    redScore: {
        type: Number,
    },
    blueScore: {
        type: Number,
    }
});

module.exports = ruleSchema; //Cards è il nome della collection in MongoDB