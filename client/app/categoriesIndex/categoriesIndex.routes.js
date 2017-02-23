'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categoriesIndex', {
        url: '/categories',
        templateUrl: 'app/categoriesIndex/categoriesIndex.html',
        controller: 'CategoriesIndexComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
