'use strict';

angular.module('paizaqaApp')
  .controller('DiagramsListComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var listDiagrams = function(){
      $http.get(appConfig.path + '/api/cpd/diagrams/' + $stateParams.id ).success(function(questions) {
        $scope.questions = questions;
      });
    };
    listDiagrams();

  });
