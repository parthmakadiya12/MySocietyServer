var express = require('express');
var router = express.Router();
var db = require('../db');
var gAuth = require('../auth/Gauth');


/* GET users listing. */
router.get('/', function (req, res, next) {
  var collection = db.get().collection('classes')
  collection.find().toArray(function (err, docs) {
    res.send(docs);
       console.log("Return ALL inUsers"+docs);
  })
  //res.send('Logic of inUsers');
});
router.get('/admins', function (req, res, next) {
  console.log(req.header("loggedInUser") + req.header("uid"));
  var ID = req.header("uid");
  var collection = db.get().collection('classes')
  collection.find({ "owners": { "$in": [ID] } }).toArray(function (err, docs) {
    res.send(docs);
    console.log("Admin Class" + docs);
  })
  //res.send('Logic of Classes');
});

router.get('/mydata', function (req, res, next) {
  console.log(req.header("loggedInUser") + req.header("uid"));
  var ID = req.header("uid");
  var collection = db.get().collection('classes')
  collection.find({ "members": { "$in": [ID] } }).toArray(function (err, docs) {
    res.send(docs);
    console.log("myOwn Class" + docs);
  })
  //res.send('Logic of Classes');
});

router.get('/classD', function (req, res, next) {
  var className = req.header("classH");
  console.log("Classname at extreme"+className);
  var collection = db.get().collection('classes')
  collection.aggregate([
    {
      $unwind: "$member"
    },
    {
      $lookup:
      {
        from: "Users",
        localField: "member",
        foreignField: "uid",
        as: "newd"
      }
    },
    {
      $match: { "newd": { $ne: [] }, "societyName": className }
    }
  ]).toArray(function (err, docs) {
    res.send(docs);
    console.log("Extreme Function Return" + JSON.stringify(docs));
  })
});

router.post('/', function (req, res, next) {
  var pheader=req.header("classH");
  console.log("header class"+pheader);
  console.log(req.body.SocData);
  var product = {  };// societyName: req.body.SocData.societyName, uid: req.body.SocData.uid , owner: req.body.SocData.owner
  var collection = db.get().collection('classes')
  collection.insert(req.body.SocData, function(err, result) {    
        if(err) { 
          console.log("Error"+err);
         }  
          res.send(result); 
      });
  /*
  var zp = collection.find({ "classname": "Class-Name" });
  for (var i = 1; i <= 25; i++) {
    zp.update({ $addToSet: { "members": i }});
  }
  */
  //res.send('Logic of Classes');
});


module.exports = router;
