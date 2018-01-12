'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('usersRanking', {
        url: '/usersranking',
        templateUrl: 'app/usersRanking/usersRanking.html',
        controller: 'UsersRankingComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
