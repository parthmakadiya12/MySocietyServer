var express = require('express');
var router = express.Router();
var db = require('../db');
var gAuth = require('../auth/Gauth');
var app = require("../app");
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query.CLASSNAME);
  var query = req.query.CLASSNAME;//req.query
  console.log("at conversation"+JSON.stringify(query));
  var className = query;
  className = className.toString();
  if (query.SENDER != null) {
    var sender = query.SENDER;
    sender = sender.toString();
    var receiver = query.RECEIVER;
    receiver = receiver.toString();
    console.log("===IF==getconversation======" + JSON.stringify(className));
    var collection = db.get().collection(className)
    collection.find({"sender":sender,"receiver":receiver}).toArray(function (err, docs) {
      res.send(docs);
      console.log("Return ALL conversations" + docs);
    })
  }
  else {
    console.log("===ELSE==getconversation======" + JSON.stringify(className));
    var collection = db.get().collection(className)
    collection.find().toArray(function (err, docs) {
      res.send(docs);
      console.log("Return ALL conversations" + docs);
    })
  }
});
router.post('/', function (req, res, next) {
  var cNam = req.body.conversations.className;//req.body.conversations.className
  cNam=cNam.toString();
  console.log("at conversation post"+JSON.stringify(cNam));
  console.log("Post req data "+JSON.stringify(req.body));
  var collection = db.get().collection(cNam);

  var conversation = {
    message: req.body.conversations.message,
    type: req.body.conversations.type,
    uid: req.body.conversations.userId,
    name: req.body.conversations.name,
    classname: req.body.conversations.className,
    time: new Date(),
    //p2p: req.body.conversations.p2p,
    sender:req.body.conversations.userId,
    imageBool:req.body.conversations.imageBool
  }
  app.io.emit('message', conversation);
  collection.insert(conversation, function (err, result) {
    if (!err) {
      res.send({ Result: true });
      console.log("Result true");
    } else {
      res.send({ Result: false });
      console.log("Result false");
    }
  })
});

module.exports = router;