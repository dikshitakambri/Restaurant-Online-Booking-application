var express = require('express');
var router = express.Router();
var UsersController = require("../Controllers/user_api");

/* GET users listing. */
router.get('/', UsersController.Users );

router.post('/login', UsersController.Login);

router.post('/signup',UsersController.Signup);

module.exports = router;
