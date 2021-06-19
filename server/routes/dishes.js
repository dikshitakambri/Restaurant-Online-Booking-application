var express = require('express');
var bodyParser = require("body-parser")
var router = express.Router();
var passportJWT = require("../Config/passportJWTStrategy");
var dishController = require("../Controllers/dish");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', dishController.getDishes);
router.post("/",passportJWT.verifyUser, dishController.addDish);
router.get("/:dishId",passportJWT.verifyUser, dishController.getDish);
router.put("/:dishId",passportJWT.verifyUser, dishController.updateDish);
router.delete("/:dishId",passportJWT.verifyUser, dishController.deleteDish);

router.route("/:dishId/comments")
.get(dishController.getComments)
.post(passportJWT.verifyUser,dishController.addComments)
.delete(passportJWT.verifyUser,dishController.deleteComments);

router.route("/:dishId/comments/:commentId")
.get(dishController.getCommentById)
.put(passportJWT.verifyUser,dishController.updateComment)
.delete(passportJWT.verifyUser,dishController.deletecommentById);

module.exports = router;
