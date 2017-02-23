'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('diagramsList', {
        url: '/diagrams/list/:id',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'DiagramsListComponent'
      });
  });
