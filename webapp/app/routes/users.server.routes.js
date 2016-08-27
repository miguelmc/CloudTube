var users = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  //app.route('/signup')
  //   .post(users.signup);

  app.route('/signin')
     .get(users.renderSignin)
     .post(passport.authenticate('local', {
       successRedirect: "/",
       failureRedirect: "/signin",
       failureFlash: true
     }));

  app.get('/signout', users.signout);

  // NOTE:
  // 'users' route is clashing with angular's (rename to users123)
  // This is no problem since this methods shouldn't be
  // on production
  app.route('/users123')
     .get(users.list)
     .post(users.create);
  app.route('/users123/:userId')
     .get(users.read)
     .put(users.update)
     .delete(users.delete);

  // Middleware handling :userId
  app.param("userId", users.userById);
};
