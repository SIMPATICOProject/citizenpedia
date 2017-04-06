'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('usersIndex', {
        url: '/usersadmin',
        templateUrl: 'app/usersIndex/usersIndex.html',
        controller: 'UsersIndexComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
