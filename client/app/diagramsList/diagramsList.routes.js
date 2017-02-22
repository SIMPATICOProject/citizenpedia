'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('diagramsList', {
        url: '/diagrams/list/:id',
        templateUrl: 'app/diagramsList/diagramsList.html',
        controller: 'DiagramsListComponent'
      });
  });
