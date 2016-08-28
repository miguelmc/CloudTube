var users = require('../controllers/users.server.controller'),
    videos = require('../controllers/videos.server.controller');

module.exports = function(app) {
  app.route('/api/videos')
     .get(videos.list)
     .post(users.requiresAdmin, videos.create);

  app.route('/api/videos/:videoId')
     .get(videos.read)
     .put(users.requiresAdmin, videos.update)
     .delete(users.requiresAdmin, videos.delete);

  // Middleware handling :videoId
  app.param("videoId", videos.videoById);
};
