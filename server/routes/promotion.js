var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const PromoController = require("../Controllers/promotions");
var passportJWT = require("../Config/passportJWTStrategy");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', PromoController.getPromo);
router.post("/",passportJWT.verifyUser, PromoController.AddPromo)
router.put("/:promoId",passportJWT.verifyUser, PromoController.updatePromo)
router.delete("/:promoId",passportJWT.verifyUser, PromoController.deletePromo);

module.exports = router;
