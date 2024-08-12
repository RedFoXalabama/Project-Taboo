const cardSchema = require('../models/cardModel');
const mongoose = require("mongoose");

const Card = mongoose.model("Card", cardSchema, "Cards");

exports.getAllCards = async () => {
        try {
            const cards = await Card.find({});
            return cards;
        } catch (err) {
            console.log(err);
        }
}