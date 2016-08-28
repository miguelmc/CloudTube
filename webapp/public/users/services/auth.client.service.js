angular.module('users').factory('AuthService', ['$http', Session,
  function($http, Session) {
    var authService = {};

    authService.signin = function(credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          Session.create(res.data.id, res.data.user.id, res.data.user.role);
          return res.data.user;
        });
    }

    authService.isAuthenticated = function () {
      return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
              authorizedRoles.indexOf(Session.userRole) !== -1);
    };
  }
]);
