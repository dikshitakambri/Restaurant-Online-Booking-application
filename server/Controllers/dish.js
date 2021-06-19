var Dishes = require('../Models/dishes');

function getDishes (req, res, next) {
  res.send("Dishes");
  Dishes.find({})
    .populate('comments.author')
    .then((dishes) => {
        console.log(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
}

function addDish(req, res) {
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
}

function updateDish (req, res) {

  Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
}

function deleteDish (req, res) {
  
  Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

function getDish (req, res) {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        console.log(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
}

function getComments (req,res,next) {

    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        if (dish != null) {
            console.log(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

function addComments(req, res, next) {

  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null) {
            req.body.author = req.user._id;
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
}

function deleteComments(req, res, next) {
  
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
}

function getCommentById (req,res,next) {
    
  Dishes.findById(req.params.dishId)
  .populate('comments.author')
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
}

function updateComment (req, res, next) {
   
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
          .populate('comments.author')
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
}

function deletecommentById (req, res, next) {
  Dishes.findById(req.params.dishId)
  .then((dish) => {
      if (dish != null && dish.comments.id(req.params.commentId) != null) {
          dish.comments.id(req.params.commentId).remove();
          dish.save()
          .populate('comments.author')
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
}

module.exports = {
  getDishes,
  addDish,
  updateDish,
  deleteDish,
  getDish,
  getComments,
  addComments,
  deleteComments,
  getCommentById,
  updateComment,
  deletecommentById
}