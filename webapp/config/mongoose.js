var config = require('./config'),
    mongoose = require('mongoose')


var db = mongoose.createConnection(config.db);

db.on('error', function(err) {
  console.log("ERROR connecting to: " + config.db + '. ' + err);
});

db.once('open', function() {
  console.log("Succeeded connected to: " + config.db);
});

//require('../app/models/issue.server.model');
//require('../app/models/entry.server.model');
require('../app/models/user.server.model');
//require('../app/models/author.server.model');

module.exports = db;
