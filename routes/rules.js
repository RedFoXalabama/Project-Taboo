const express = require("express")
const ruleController = require("../controllers/ruleController");
const router = express.Router()

router.post("/addRules", ruleController.addRules);
router.post("/getRulesByID", ruleController.getRulesByID);

module.exports = router;