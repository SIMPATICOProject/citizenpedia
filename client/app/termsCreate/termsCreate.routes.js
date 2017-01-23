'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('termsCreate', {
      url: '/terms/create',
      template: 'app/termsCreate/termsCreate.html',
      controller: 'TermsCreateComponent'
    });
}
