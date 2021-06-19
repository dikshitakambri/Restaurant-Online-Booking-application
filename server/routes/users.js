var express = require('express');
var router = express.Router();
const passportJWT = require("../Config/passportJWTStrategy");
var UsersController = require("../Controllers/user_api");

/* GET users listing. */
router.get('/',passportJWT.verifyAdmin, UsersController.Users );

router.post('/login', UsersController.Login);

router.post('/signup',UsersController.Signup);

module.exports = router;
