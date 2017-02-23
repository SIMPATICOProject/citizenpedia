'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('termsIndex', {
        url: '/terms',
        templateUrl: 'app/termsIndex/termsIndex.html',
        controller: 'TermsIndexComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
