'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesCreateComponent', function ($scope, $http, $location, Auth, appConfig) {
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      $location.replace();
      return;
    }
    $scope.submit = function() {
      $http.post(appConfig.path + '/api/categories', $scope.category).success(function(){
        $location.path('/categories');
      });
    };
  });
