var express = require('express');
var bodyParser = require("body-parser");
const cors = require("./cors");
var router = express.Router();
var passportJWT = require("../Config/passportJWTStrategy");
var dishController = require("../Controllers/dish");

router.use(bodyParser.json());

/* GET home page. */
router.get('/',cors.corsWithOptions, dishController.getDishes);
router.post("/",cors.corsWithOptions,passportJWT.verifyUser,passportJWT.verifyAdmin, dishController.addDish);
router.get("/:dishId",cors.corsWithOptions,passportJWT.verifyUser,passportJWT.verifyAdmin, dishController.getDish);
router.put("/:dishId",cors.corsWithOptions,passportJWT.verifyUser,passportJWT.verifyAdmin, dishController.updateDish);
router.delete("/:dishId",cors.corsWithOptions,passportJWT.verifyUser,passportJWT.verifyAdmin, dishController.deleteDish);

router.route("/:dishId/comments")
.get(cors.corsWithOptions,dishController.getComments)
.post(cors.corsWithOptions,passportJWT.verifyUser,dishController.addComments)
.delete(cors.corsWithOptions,passportJWT.verifyUser,passportJWT.verifyAdmin,dishController.deleteComments);

router.route("/:dishId/comments/:commentId")
.get(cors.corsWithOptions,dishController.getCommentById)
.put(cors.corsWithOptions,passportJWT.verifyUser,dishController.updateComment)
.delete(cors.corsWithOptions,passportJWT.verifyUser,dishController.deletecommentById);

module.exports = router;
