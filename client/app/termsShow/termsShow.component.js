'use strict';

angular.module('paizaqaApp')
  .controller('TermsShowComponent', function ($scope, $http, $stateParams, Auth, $location) {
    var loadTerms = function(){
      $http.get('/api/terms/' + $stateParams.id).success(function(term) {
        $scope.term = term;
      });
    };
    loadTerms();

    // $scope.deleteTerm = function() {
    //   $http.delete('/api/terms/' + $stateParams.id).success(function(){
    //     $location.path('/');
    //   });
    // };
    //
    // $scope.updateTerm = function() {
    //   $http.put('/api/terms/' + $stateParams.id, $scope.term).success(function(){
    //     loadTerms();
    //   });
    // };

    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

  });



// 'use strict';
// const angular = require('angular');
//
// const uiRouter = require('angular-ui-router');
//
// import routes from './termsShow.routes';
//
// export class TermsShowComponent {
//   /*@ngInject*/
//   constructor() {
//     this.message = 'Hello';
//   }
// }
//
// export default angular.module('citizenpediaApp', [uiRouter])
//   .config(routes)
//   .component('termsShow', {
//     templateUrl: 'app/termsShow/termsShow.html',
//     controller: TermsShowComponent,
//     controllerAs: 'termsShowCtrl'
//   })
//   .name;
