'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsListComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var listQuestions = function(){
      $http.get(appConfig.path + '/api/qae/questions/' + $stateParams.id ).success(function(questions) {
        $scope.questions = questions;
      });
    };
    listQuestions();

  });
