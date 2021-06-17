var express = require('express');
const bodyParser = require('body-parser');
var Promotion = require("../Models/promotions");
var router = express.Router();

router.use(bodyParser.json());

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Promotions");
})
router.post("/", (req, res) => {
    var details = req.body;

    var newpromotion = new Promotion(details);

    newpromotion.save((err) => {
      if(err){
        console.log(err);
      }else {
        res.redirect("/");
        console.log("successfully added promktion");
      }
    });
})
router.put("/:promoId", (req, res) => {

  Promotion.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));

})
router.delete("/:promoId", (req, res) => {
  
  Promotion.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
