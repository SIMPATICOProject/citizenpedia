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
  });
