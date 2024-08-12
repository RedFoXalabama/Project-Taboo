const express = require("express")
const cardController = require("../controllers/cardController");
const router = express.Router()

router.get("/cards", cardController.getAllCards);

module.exports = router;