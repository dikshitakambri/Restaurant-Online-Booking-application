var express = require('express');
const bodyParser = require('body-parser');
var Dishes = require('../Models/dishes');
var router = express.Router();

router.use(bodyParser.json());

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Dishes");
})
router.post("/", (req, res) => {
    var details = req.body;

    var newdishes = new Dishes(details);

    newdishes.save((err) => {
      if(err){
        console.log(err);
      }else {
        console.log("successfully added dish");
      }
    });
})
router.put("/:dishId", (req, res) => {
  var details = req.body;
  var newdishes = new Dishes(details);

})
router.delete("/dishId", (req, res) => {
  var details = req.body;

  var newdishes = new Dishes(details);
  
  newdishes.remove
});

module.exports = router;
