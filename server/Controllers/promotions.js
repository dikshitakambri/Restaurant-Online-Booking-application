var Promotion = require("../Models/promotions");

function getPromo(req, res, next) {
    res.send("Promotions");
}

function AddPromo (req, res) {
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
}

function updatePromo(req, res) {

    Promotion.findByIdAndUpdate(req.params.promoId, {
          $set: req.body
      }, { new: true })
      .then((promo) => {
          res.json(promo);
      }, (err) => next(err))
      .catch((err) => next(err));
  
}

function deletePromo (req, res) {
  
    Promotion.findByIdAndRemove(req.params.promoId)
      .then((resp) => {
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  }
module.exports = {
    getPromo,
    AddPromo,
    updatePromo,
    deletePromo
    
}