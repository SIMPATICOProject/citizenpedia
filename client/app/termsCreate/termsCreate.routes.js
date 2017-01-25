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


// 'use strict';
//
// export default function($stateProvider) {
//   'ngInject';
//   $stateProvider
//     .state('termsCreate', {
//       url: '/terms/create',
//       template: 'app/termsCreate/termsCreate.html',
//       controller: 'TermsCreateComponent'
//     });
// }
