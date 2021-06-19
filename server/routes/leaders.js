var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var passportJWT = require("../Config/passportJWTStrategy");
const LeadersController = require("../Controllers/leaders");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', LeadersController.getLeaders)
router.post("/",passportJWT.verifyUser, LeadersController.addLeaders)
router.put("/:leaderId",passportJWT.verifyUser, LeadersController.updateLeaders)
router.delete("/:leaderId",passportJWT.verifyUser, LeadersController.deleteLeaders);

module.exports = router;
