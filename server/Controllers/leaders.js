var Leaders = require("../Models/leaders");

function getLeaders(req, res, next) {
    res.send("Leaders");
}

function addLeaders (req, res) {
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
}

function updateLeaders (req, res) {

    Leaders.findByIdAndUpdate(req.params.leaderId, {
          $set: req.body
      }, { new: true })
      .then((leader) => {
          res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err));
  
}

function deleteLeaders (req, res) {
  
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then((resp) => {
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
}

module.exports = {
    getLeaders,
    addLeaders,
    updateLeaders,
    deleteLeaders
}