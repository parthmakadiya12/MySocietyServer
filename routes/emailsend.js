var express = require('express');
var router = express.Router();
var db = require('../db');
//var email = require("../node_modules/emailjs/email");//D:\A Js intern\AA Group Slack Class\Node js\Demo 2\samplesite\node_modules\emailjs\email.js
const nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function (req, res, next) {

});


router.post('/', function (req, res, next) {
  var emailto = req.body.email;
  var sender = req.body.sender;

  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'apikey',
        pass: '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'
    }
});
let mailOptions = {
    from: sender, // sender address
    to: emailto, // list of receivers
    subject: 'inClass Invitation', // Subject line
    text: 'Welcome to inClass.Custom Chat Rooms that is based on your Topics .Go to   www.inclass.alltricks007.vv.si  Sent By'+sender, // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
  //console.log("Connec ted status" + JSON.stringify(server));
  // send the message and get a callback with an error or details of the message that was sent 
    //res.send('Logic of inUsers');
});
module.exports = router;
