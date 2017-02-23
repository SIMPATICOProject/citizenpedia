'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesListComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var listCategories = function(){
      $http.get('/citizenpedia/api/categories/' + $stateParams.id + '/questions').success(function(questions) {
        $scope.questions = questions;
      });
    };
    listCategories();

  });
