'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categoriesCreate', {
        url: '/categories/create',
        templateUrl: 'app/categoriesCreate/categoriesCreate.html',
        controller: 'CategoriesCreateComponent'
      });
  });
