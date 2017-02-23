'use strict';

angular.module('paizaqaApp')
  .controller('questionsListParagraphComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var listQuestions = function(){
      $http.get('/citizenpedia/api/qae/questions/' + $stateParams.id + '/' + $stateParams.paragraph ).success(function(questions) {
        $scope.questions = questions;
      });
    };
    listQuestions();

  });
