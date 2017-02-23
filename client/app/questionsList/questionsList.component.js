'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsListComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var listQuestions = function(){
      $http.get('/citizenpedia/api/qae/questions/' + $stateParams.id ).success(function(questions) {
        $scope.questions = questions;
      });
    };
    listQuestions();

  });
