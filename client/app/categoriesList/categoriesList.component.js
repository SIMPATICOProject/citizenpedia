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
            
            var status;
            
            $http.get('assets/images/svg/'+questions[0].category._id+'.png')
                .success(function(data, code) {
                    $scope.categoryImage = questions[0].category._id;
                })
                .error(function(data, code) {
                    $scope.categoryImage = "category_default";
                });

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
