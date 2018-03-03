var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var collection = db.get().collection('Emoji')
    collection.find({}).toArray(function (err, docs) {
        res.send(docs[0]);
        console.log("Return ALL Emojis" + docs[0]);
    })
});


router.post('/', function (req, res, next) {


    //res.send('Logic of inUsers');
});
module.exports = router;
