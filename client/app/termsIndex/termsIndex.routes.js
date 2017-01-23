'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('termsIndex', {
      url: '/terms',
      template: '<terms-index></terms-index>'
    });
}
