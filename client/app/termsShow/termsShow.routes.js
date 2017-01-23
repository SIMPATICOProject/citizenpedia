'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('termsShow', {
      url: '/terms/show/:id',
      template: '<terms-show></terms-show>'
    });
}
