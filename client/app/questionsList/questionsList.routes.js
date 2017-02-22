'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsList', {
        url: '/questions/list/:id',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsListComponent'
      })
      .state('questionsListParagraph', {
        url: '/questions/list/:id/:paragraph',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsListComponent'
      });
  });
