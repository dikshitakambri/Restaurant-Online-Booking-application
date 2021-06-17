var express = require('express');
var bodyParser = require("body-parser")
var router = express.Router();
var dishController = require("../Controllers/dish");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', dishController.getDishes);
router.post("/", dishController.addDish);
router.put("/:dishId", dishController.updateDish);
router.delete("/:dishId", dishController.deleteDish);

router.route("/:dishId/comments")
.get(dishController.getComments)
.post(dishController.addComments)
.delete(dishController.deleteComments);

router.route("/:dishId/comments/:commentId")
.get(dishController.getCommentById)
.put(dishController.updateComment)
.delete(dishController.deletecommentById);

module.exports = router;
