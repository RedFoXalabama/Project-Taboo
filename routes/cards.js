const express = require("express")
const { getAllCards} = require("../controllers/cardController");
const router = express.Router()

router.get("/", getAllCards);

module.exports = router