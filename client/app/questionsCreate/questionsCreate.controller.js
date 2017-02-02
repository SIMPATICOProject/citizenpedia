'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsCreateCtrl', function ($scope, $http, $location, Auth) {
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      $location.replace();
      return;
    }
    $scope.submit = function() {
      $http.post('/citizenpedia/api/questions', $scope.question).success(function(){
        $location.path('/');
      });
    };

    $scope.options = [];
    var newOptions = [];

    $http.get('/citizenpedia/api/categories', {}).success(function(categories) {
      for (var c = 0; c < categories.length; c++) {
        newOptions.push({"name" :categories[c].name, "value": categories[c]._id});
      }

      if(categories.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    $scope.options = newOptions;

  });
