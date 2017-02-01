'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('termsCreate', {
        url: '/terms/create',
        templateUrl: 'app/termsCreate/termsCreate.html',
        controller: 'TermsCreateComponent'
      });
  });
