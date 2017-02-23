'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesCreateComponent', function ($scope, $http, $location, Auth) {
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      $location.replace();
      return;
    }
    $scope.submit = function() {
      $http.post('/citizenpedia/api/categories', $scope.category).success(function(){
        $location.path('/categories');
      });
    };
  });
