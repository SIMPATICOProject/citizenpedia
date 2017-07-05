'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesListComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var listCategories = function(){
      $http.get(appConfig.path + '/api/categories/' + $stateParams.id + '/questions').success(function(questions) {
        $scope.questions = questions;
        $scope.categoryName = questions[0].category.name;
        $scope.categoryID = questions[0].category._id;
      });
    };
    listCategories();

  });
