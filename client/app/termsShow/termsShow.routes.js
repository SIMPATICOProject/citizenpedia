'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('termsShow', {
        url: '/terms/show/:id',
        templateUrl: 'app/termsShow/termsShow.html',
        controller: 'TermsShowComponent'
      });
  });



// 'use strict';
//
// export default function($stateProvider) {
//   'ngInject';
//   $stateProvider
//     .state('termsShow', {
//       url: '/terms/show/:id',
//       template: '<terms-show></terms-show>'
//     });
// }
