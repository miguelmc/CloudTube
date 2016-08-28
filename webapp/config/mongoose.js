var config = require('./config'),
    mongoose = require('mongoose'),
    Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;

var db = mongoose.createConnection(config.db);

db.on('error', function(err) {
  console.log("ERROR connecting to: " + config.db + '. ' + err);
});

db.once('open', function() {
  this.gfs = Grid(db.db);
  console.log("Succeeded connected to: " + config.db);
});

require('../app/models/video.server.model');
require('../app/models/user.server.model');

module.exports = db;
