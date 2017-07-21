'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsList', {
        url: '/questions/list/:id',
        templateUrl: 'app/questionsList/questionsList.html',
        controller: 'QuestionsListComponent'
      })
      .state('questionsListParagraph', {
        url: '/questions/list/:id/:paragraph',
        templateUrl: 'app/questionsList/questionsList.html',
        controller: 'questionsListParagraphComponent'
      });
  });
