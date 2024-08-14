const express = require("express")
const playerController = require("../controllers/playerController");
const router = express.Router()

router.post("/api/player", playerController.addPlayer);
router.get("/api/players", cardController.getAllPlayers);

module.exports = router;