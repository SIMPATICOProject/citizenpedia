'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesListComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var listCategories = function(){
      $http.get(appConfig.path + '/api/categories/' + $stateParams.id + '/questions').success(function(questions) {

        if (questions.length)
        {
            $scope.questions = questions;
            $scope.categoryName = questions[0].category.name;
            $scope.categoryID = questions[0].category._id;
        }else{
            $scope.categoryName = 'NONE';
                $http.get(appConfig.path + '/api/questions').success(function(questions) {
                  $scope.questions = questions.slice(0,5);
                  $scope.busy = false;
                });

        }
      });
    };
    listCategories();

  });
