'use strict';

angular.module('paizaqaApp')
  .controller('DiagramsListComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var listDiagrams = function(){
      $http.get('/citizenpedia/api/cpd/question/' + $stateParams.id ).success(function(questions) {
        $scope.questions = questions;
      });
    };
    listDiagrams();

  });
