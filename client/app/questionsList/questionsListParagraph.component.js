'use strict';

angular.module('paizaqaApp')
  .controller('questionsListParagraphComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var listQuestions = function(){
      $http.get(appConfig.path +'/api/qae/questions/' + $stateParams.id + '/' + $stateParams.paragraph ).success(function(questions) {
        $scope.questions = questions;
        $scope.tagName = $stateParams.id + ' ' + $stateParams.paragraph;
      });
    };
    listQuestions();

  });
