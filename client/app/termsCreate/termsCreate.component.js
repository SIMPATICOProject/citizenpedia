'use strict';

angular.module('paizaqaApp')
  .controller('TermsCreateComponent', function ($scope, $http, $location, Auth) {
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      $location.replace();
      return;
    }
    $scope.submit = function() {
      $http.post('/citizenpedia/api/terms', $scope.term).success(function(){
        $location.path('/terms');
      });
    };
  });
