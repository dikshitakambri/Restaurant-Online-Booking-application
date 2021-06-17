var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const LeadersController = require("../Controllers/leaders");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', LeadersController.getLeaders)
router.post("/", LeadersController.addLeaders)
router.put("/:leaderId", LeadersController.updateLeaders)
router.delete("/:leaderId", LeadersController.deleteLeaders);

module.exports = router;
