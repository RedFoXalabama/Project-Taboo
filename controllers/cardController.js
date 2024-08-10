const Card = require('../models/cardModel');

exports.getAllCards = async (req, res) => {
    try {
        const card = await Card.find({});
        res.status(200).json({
            status: 'success',
            card: card
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}