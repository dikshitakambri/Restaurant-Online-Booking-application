var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const PromoController = require("../Controllers/promotions");

router.use(bodyParser.json());

/* GET home page. */
router.get('/', PromoController.getPromo);
router.post("/", PromoController.AddPromo)
router.put("/:promoId", PromoController.updatePromo)
router.delete("/:promoId", PromoController.deletePromo);

module.exports = router;
