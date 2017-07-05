'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tagsCreate', {
        url: '/tags/create',
        templateUrl: 'app/tagsCreate/tagsCreate.html',
        controller: 'TagsCreateComponent'
      });
  });
