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
          res.redirect("/");
        console.log("successfully added dish");
      }
    });
})
router.put("/:dishId", (req, res) => {

  Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));

})
router.delete("/:dishId", (req, res) => {
  
  Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route("/:dishId/comments")
.get((req,res,next) => {

  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null) {
          res.json(dish.comments);
      }
      else {
         console.log(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {

  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null) {
          dish.comments.push(req.body);
          dish.save()
          .then((dish) => {
              res.json(dish);                
          }, (err) => next(err));
      }
      else {
          console.log(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  
  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null) {
          for (var i = (dish.comments.length -1); i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
          }
          dish.save()
          .then((dish) => {
              res.json(dish);                
          }, (err) => next(err));
      }
      else {
          console.log(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));    
});

router.route("/:dishId/comments/:commentId")
.get((req,res,next) => {
    
  Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            console.log(err);
        }
        else {
            console.log(err);           
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
   
  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null && dish.comments.id(req.params.commentId) != null) {
          if (req.body.rating) {
              dish.comments.id(req.params.commentId).rating = req.body.rating;
          }
          if (req.body.comment) {
              dish.comments.id(req.params.commentId).comment = req.body.comment;                
          }
          dish.save()
          .then((dish) => {
              res.json(dish);                
          }, (err) => next(err));
      }
      else if (dish == null) {
          console.log(err);
      }
      else {
        console.log(err);        
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null && dish.comments.id(req.params.commentId) != null) {
          dish.comments.id(req.params.commentId).remove();
          dish.save()
          .then((dish) => {
              res.json(dish);                
          }, (err) => next(err));
      }
      else if (dish == null) {
          console.log(err);
      }
      else {
          console.log(err);          
      }
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
