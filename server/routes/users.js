var express = require('express');
var router = express.Router();
var UsersController = require("../Controllers/user_api");

/* GET users listing. */
router.get('/', UsersController.Users );

router.get('/login', function(req, res, next) {
  res.send('Users login');
});

router.get('/signup', function(req, res, next) {
  res.send('Users signup');
});

module.exports = router;
