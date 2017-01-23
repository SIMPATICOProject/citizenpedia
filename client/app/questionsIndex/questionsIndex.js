'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?keyword',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function(){return {};}
        },
      })
      .state('starredQuestionsIndex', {
        url: '/users/:userId/starred',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {
              $or: [
                {'stars': $stateParams.userId},
                {'answers.stars': $stateParams.userId},
                {'comments.stars': $stateParams.userId},
                {'answers.comments.stars': $stateParams.userId},
              ]
            };
          }
        },
      })
      .state('userQuestionsIndex', {
        url: '/users/:userId',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {user: $stateParams.userId};
          }
        },
      })
      // TERMS
      .state('termsCreate', {
        url: '/terms/create',
        templateUrl: 'app/termsCreate/termsCreate.html',
        controller: 'TermsCreateComponent',
        resolve: {
          query: function($stateParams){return {user: $stateParams.userId};}
        },
      })
      .state('termsIndex', {
        url: '/terms',
        templateUrl: 'app/termsIndex/termsIndex.html',
        controller: 'TermsIndexComponent',
        resolve: {
          query: function(){return {};}
        },
      });

  });
