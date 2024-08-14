const express = require("express")
const ruleController = require("../controllers/ruleController");
const router = express.Router()

router.post("/api/rules", ruleController.addRules);
router.get("/api/rules", ruleController.getAllRules);

module.exports = router;