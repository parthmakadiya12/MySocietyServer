var express = require('express');
var router = express.Router();
var db = require('../db');
var multer = require('multer')
var upload = multer({ dest: 'upload/' });
var fs = require('fs');

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('recfile');
/* GET users listing. */
router.post("/multer", multer({ dest: "./upload/" }).array("uploads", 12), function (req, res) {

    console.log("++++++++++++++" + JSON.stringify(req));

    res.send({});
});



router.post('/', type, function (req, res) {
    
    var data=req.file;
    console.log(data);
    /** When using the "single"
        data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;
    console.log("Temp Path" + tmp_path);
    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = 'uploads/' + req.file.originalname;
    var grid = new Grid(db, 'fs');
    var buffer = new Buffer("Hello world");
    grid.put(buffer, { metadata: { category: 'text' }, content_type: 'text' }, function (err, fileInfo) {
        if (!err) {
            console.log("Finished writing file to Mongo");
        }
    });

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () { res.send({ "Result": "Success" }) });
    src.on('error', function (err) { res.send({ "Result": "Error" }); });

});
router.get("/", function (req, res) {
    res.send("Working Get");
});

module.exports = router;
