var express = require('express');
const bodyParser = require('body-parser');
var Leaders = require("../Models/leaders");
var router = express.Router();

router.use(bodyParser.json());

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Leaders");
})
router.post("/", (req, res) => {
    var details = req.body;

    var newleaders = new Leaders(details);

    newleaders.save((err) => {
      if(err){
        console.log(err);
      }else {
        res.redirect("/");
        console.log("successfully added leader");
      }
    });
})
router.put("/:leaderId", (req, res) => {

  Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));

})
router.delete("/:leaderId", (req, res) => {
  
  Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
