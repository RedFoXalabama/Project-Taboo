const express = require("express")
const ruleController = require("../controllers/ruleController");
const router = express.Router()

router.post("/", ruleController.addRules);
router.get("/", ruleController.getAllRules);

module.exports = router;