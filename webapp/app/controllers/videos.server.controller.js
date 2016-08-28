var db = require('../../config/mongoose'),
    Video = db.model('Video');

var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    // Dispensable. Expand if ever needed.
    switch(err.code) {
      // Not really going to happen if we are only having
      //  the root user.
      case 11000:
      case 11001:
        message = 'Title already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message)
        message = err.errors[errName].message;
    }
  }

  return message;
};

exports.create = function(req, res, next) {
  console.log(req.body);
  var video = new Video(req.body);

  video.save(function(err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(video);
    }
  });
};

exports.list = function(req, res, next) {
  Video.find(req.query, function(err, entries){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(entries);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.video);
}

exports.update = function(req, res, next) {
  Video.findByIdAndUpdate(req.video.id, req.body, function(err, video) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(video);
    }
  });
};

exports.delete = function(req, res, next) {
  req.video.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(req.video);
    }
  });
};

// Middleware for paths having :videoId
exports.videoById = function(req, res, next, id) {
  Video.findOne({
    _id: id
  }, function(err, video) {
    if (err) return next(err);
    if (!video) {
      return next(new Error('Failed to load video ' + id));
    }
    req.video = video;
    next();
  });
};
