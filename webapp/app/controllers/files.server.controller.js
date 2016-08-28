var Busboy = require('busboy');
var mongo = require('mongodb');
var db = require('../../config/mongoose');

exports.upload = function(req, res) {
  var busboy = new Busboy({ headers : req.headers });
  var fileId = new mongo.ObjectId();
  

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('got file', filename, mimetype, encoding);
    var writeStream = db.gfs.createWriteStream({
      _id: fileId,
      filename: filename,
      mode: 'w'
    });
    file.pipe(writeStream);
  }).on('finish', function() {
    // show a link to the uploaded file
    console.log("finished");
    res.writeHead(200, {'content-type': 'text/html'});
    //res.end('<a href="/file/' + fileId.toString() + '">download file</a>');
    res.end(fileId.toString());
  });

  req.pipe(busboy);
};

exports.main = function(req, res) {
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/file" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="file"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
};

exports.download = function(req, res) {
  db.gfs.findOne({ _id: req.params.id }, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');
    
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    
    var readstream = db.gfs.createReadStream({
      _id: file._id
    });
    
    readstream.on("error", function(err) {
      console.log("Got error while processing stream " + err.message);
      res.end();
    });
    
    readstream.pipe(res);
  });
};

