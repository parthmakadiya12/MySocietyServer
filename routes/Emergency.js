var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var collection = db.get().collection('Emergency')
    collection.find().toArray(function (err, docs) {
        res.send(docs);
        console.log("Return ALL inUsers" + docs);
    })
    //res.send('Logic of inUsers');
});
router.get('/emer', function (req, res, next) {
    var collection = db.get().collection('Emergency')
    collection.find().toArray(function (err, docs) {
        res.send(docs);
        console.log("Return ALL inUsers" + docs);
    })
    //res.send('Logic of inUsers');
});
router.post('/remove', function (req, res, next) {
    var pheader=req.header("classH");
    var x=req.body.type;
    console.log("PHeader at emergency "+pheader+" type of remove "+x);
  var col = db.get().collection(x);
  col.remove({"uid":req.body.uid},function (errs, resu) {
      if (errs) {
          console.log("Error at remove"+errs);
      }
      console.log("Extreme post Function Remove" + JSON.stringify(resu));
  });
})
router.get('/fillt', function (req, res, next) {
    var collection = db.get().collection('Emergency')
    collection.find().toArray(function (err, docs) {
        res.send(docs);
        console.log("Return ALL inUsers" + docs);
    })
    //res.send('Logic of inUsers');
});
router.post('/', function (req, res, next) {
    var pheader=req.header("classH");
    var collection = db.get().collection('Emergency')
    console.log("at emergency " + JSON.stringify(req.body.socData));
    collection.insert(req.body.socData, function (err, result) {
        collection.find({ societyName: req.body.socData.societyName, uid: req.body.uid }).toArray(function (err, docs) {
            console.log(docs[0]); //docs[0]
            console.log(JSON.stringify(req.headers));
            //db.close()
            res.send(docs[0]); //docs[0]
        })
    })
    //res.send('Logic of inUsers');
});
router.post('/fillTank', function (req, res, next) {
    var pheader;
    var collection = db.get().collection('FillTank')
    console.log("at fill Tank " + JSON.stringify(req.body.socData));
    collection.insert(req.body.socData, function (err, result) {
        collection.find({ societyName: req.body.socData.societyName }).toArray(function (err, docs) {
            console.log(docs[0]); //docs[0]
            console.log(JSON.stringify(req.headers));
            //db.close()
            res.send(docs[0]); //docs[0]
        })
    })
    //res.send('Logic of inUsers');
});

module.exports = router;
