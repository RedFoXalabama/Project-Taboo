const playerSchema = require('../models/playerModel');
const mongoose = require("mongoose");

const Player = mongoose.model("Player", playerSchema, "Players");

exports.addPlayer = async (req,res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(500).json({msg: "error", err: err})
    }
}

exports.getAllPlayers = async (req,res) => {
        try {
            const players = await Player.find({});
            res.status(200).json(players);
        } catch (err) {
            res.status(500).json({msg: "error", err: err})
        }
}