var express = require('express');
var router = express.Router();
var db = require('../db');
var email = require("../node_modules/emailjs/email");//D:\A Js intern\AA Group Slack Class\Node js\Demo 2\samplesite\node_modules\emailjs\email.js

/* GET users listing. */
router.get('/', function (req, res, next) {

});


router.post('/', function (req, res, next) {
  var emailto = req.body.email;
  var sender = req.body.sender;
  var server = email.server.connect({
    user: "8ea40e1d860cfcc92d6ac751675b176d",
    password: "6f56d9e334442df5d7f5c6b52fff9788",
    host: "in-v3.mailjet.com",
    ssl: true,
    tls: { ciphers: "SSLv3" }
  });
  console.log("Connected status" + server);
  // send the message and get a callback with an error or details of the message that was sent 
  server.send({
    text: "Welcome to inClass.Custom Chat Rooms that is based on your Topics ." + sender,
    from: sender,
    to: emailto,
    cc: "",
    subject: "Invitation to inClass",
attachment: 
   [
      {data: "<html>i <i>hope</i> this works! here is an image: <img src='cid:my-image' width='100' height ='50'> </html>"},
      {path:"http://alltricks007.vv.si/Screenshot%20(126).png", type:"image/jpg", headers:{"Content-ID":"<my-image>"}}
   ]
  }, function (err, message) { console.log(err || message); });

  //res.send('Logic of inUsers');
});
module.exports = router;
