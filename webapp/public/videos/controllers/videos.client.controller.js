angular.module('videos').controller('VideosController',
  ['$scope', '$routeParams', '$location', '$mdDialog', '$timeout', 'Upload', 'Authentication', 'Videos', '$log', '$q',
    function($scope, $routeParams, $location, $mdDialog, $timeout, Upload, Authentication, Videos, $log, $q) {
      $scope.authentication = Authentication;

      $scope.upload = function(video) {
        entry = $scope.pdf;
        if (typeof pdf != 'object') return;

        entry.upload = Upload.upload({
          url: 'file',
          data: {file: entry}
        });

        entry.upload.then(function (response) {
          $timeout(function () {
            entry.result = response.data;
            video.pdf = entry.result;
            video.$update();
          });
        }, function (response) {
          if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          entry.progress = Math.min(100, parseInt(100.0 * 
                                                  evt.loaded / evt.total));
        });
      }

      $scope.create = function(author) {
        var entry = new Videos({
          title: this.title,
          user: this.user._id,
          links: this.links,
        });

        entry.$save(function(response) {
          $location.path('videos/' + response._id);
        }, function(errorResponse) {
          console.log(errorResponse.data.message);
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.update = function() {
        $scope.entry.$update(function() {
          $location.path('videos/' + $scope.entry._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.find = function() {
        if ($scope.authentication.user) {
          $scope.videos = Videos.query({user: $scope.authentication.user._id});
        }
      };

      $scope.findOne = function() {
        $scope.entry = Videos.get({
          entryId: $routeParams.entryId
        });
        $scope.entry.keywordsPt = [];
        $scope.entry.keywordsEn = [];
        console.log($scope.entry);
      };


      $scope.delete = function(entry) {
        var confirm = $mdDialog.confirm()
          .title("Are you sure you want to delete this issue?")
          .textContent("This action cannot be undone.")
          .ok("Yes, delete.")
          .cancel("No");
        $mdDialog.show(confirm).then(function() {
          if (entry) {
            entry.$remove(function() {
              for (var i in $scope.videos) {
                if ($scope.videos[i] === entry) {
                  $scope.videos.splice(i, 1);
                }
              }
            });
          } else {
            console.log($scope.entry);
            $scope.entry.$remove(function() {
              $location.path('videos');
            });
          }
        }, function() {});
      };
    }
  ]
);

