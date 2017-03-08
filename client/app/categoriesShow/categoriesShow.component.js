'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesShowComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var loadCategories = function(){
      $http.get('/api/categories/' + $stateParams.id).success(function(category) {
        $scope.category = category;
      });
    };
    loadCategories();

    // $scope.deleteTerm = function() {
    //   $http.delete('/api/terms/' + $stateParams.id).success(function(){
    //     $location.path('/');
    //   });
    // };
    //
    // $scope.updateTerm = function() {
    //   $http.put('/api/terms/' + $stateParams.id, $scope.term).success(function(){
    //     loadTerms();
    //   });
    // };

    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

  });
