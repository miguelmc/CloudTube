var index = require('../controllers/index.server.controller') 

module.exports = function(app) {
  app.get('/about', index.about);
  app.get('/', index.render);
}
