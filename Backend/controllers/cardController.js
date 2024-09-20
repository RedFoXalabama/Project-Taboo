const cardSchema = require('../models/cardModel');
const mongoose = require("mongoose");

const Card = mongoose.model("Card", cardSchema, "Cards");

exports.getAllCards = async (req,res) => {
        try {
            const cards = await Card.find({});
            res.status(200).json(cards);
        } catch (err) {
            res.status(500).json({msg: "error", err: err})
        }
}