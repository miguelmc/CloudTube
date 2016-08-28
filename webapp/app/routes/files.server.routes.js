var files = require('../controllers/files.server.controller');

module.exports = function(app) {
  app.route('/file')
     .post(files.upload);

  app.route('/upload')
     .get(files.main);

  app.route('/file/:id')
     .get(files.download);
};
