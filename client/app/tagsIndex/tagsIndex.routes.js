'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tagsIndex', {
        url: '/tags',
        templateUrl: 'app/tagsIndex/tagsIndex.html',
        controller: 'TagsIndexComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
