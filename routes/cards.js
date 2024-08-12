const express = require("express")
const cardController = require("../controllers/cardController");
const router = express.Router()

router.get("/api/cards", cardController.getAllCards);

module.exports = router;