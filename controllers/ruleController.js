const ruleSchema = require('../models/ruleModel');
const mongoose = require("mongoose");

const Rule = mongoose.model("Rule", ruleSchema, "Rules");

exports.addRules = async (req,res) => {
    try {
        const rules = new Rule({
            clientID: req.body.clientID,
            playerNumber: req.body.playerNumber,
            redTeam: req.body.redTeam,
            blueTeam: req.body.blueTeam,
            turnNumber: req.body.turnNumber,
            turnTime: req.body.turnTime,
            passPerTurn: req.body.passPerTurn,
            redScore: req.body.redScore,
            blueScore: req.body.blueScore
        });
        console.log(rules);
        rules.save();
        res.json(rules);
    } catch (err) {
        res.status(500).json({msg: "error", err: err})
    }
}

exports.getRulesByID = async (req,res) => {
        try {
            console.log(req.body.gameId.id );
            const rules = await Rule.findOne({ _id: req.body.gameId.id });
            res.status(200).json(rules);
        } catch (err) {
            res.status(500).json({msg: "error", err: err})
        }
}