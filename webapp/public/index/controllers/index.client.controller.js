angular.module('index').controller('IndexController', ['$scope',
                                                       'Authentication',
  function($scope, Authentication) {
    $scope.authentication = Authentication;
  }
]);
