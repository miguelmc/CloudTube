angular.module('videos').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/videos', {
      templateUrl: 'videos/views/list-videos.client.view.html'
    }).
    when('/videos/create', {
      templateUrl: 'videos/views/create-video.client.view.html'
    }).
    when('/videos/:videoId', {
      templateUrl: 'videos/views/view-video.client.view.html'
    }).
    when('/videos/:videoId/edit', {
      templateUrl: 'videos/views/edit-video.client.view.html'
    });
  }
]);
