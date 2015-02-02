'use strict';

var express         = require('express'),
    formidable      = require('formidable'),
    os      = require('os'),
    fs      = require('fs');

var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.end(fs.readFileSync(__dirname + '/index.html'));
});

app.post('/upload.php', function (req, res) {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + "/upload";
    form.hash = 'md5';
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
        res.json({
            err: err,
            fields: fields,
            files: files
        });
    });

});

app.listen(3000);