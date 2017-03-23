'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categoriesList', {
        url: '/categories/list/:id',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'CategoriesListComponent'
      });
  });
