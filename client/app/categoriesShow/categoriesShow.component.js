'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesShowComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var loadCategories = function(){
      $http.get(appConfig.path +'/api/categories/' + $stateParams.id).success(function(category) {
        $scope.category = category;
      });
    };
    loadCategories();

    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

  });
