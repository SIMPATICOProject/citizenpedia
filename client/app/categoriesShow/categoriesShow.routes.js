'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categoriesShow', {
        url: '/categories/show/:id',
        templateUrl: 'app/categoriesShow/categoriesShow.html',
        controller: 'CategoriesShowComponent'
      });
  });
