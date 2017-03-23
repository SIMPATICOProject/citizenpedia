'use strict';

angular.module('paizaqaApp')
  .controller('TermsShowComponent', function ($scope, $http, $stateParams, Auth, $location, appConfig) {
    var loadTerms = function(){
      $http.get(appConfig.path + '/api/terms/edit/' + $stateParams.id).success(function(term) {
        console.log(term);
        $scope.term = term;
      });
    };
    loadTerms();

    // $scope.deleteTerm = function() {
    //   $http.delete(appConfig.path + '/api/terms/' + $stateParams.id).success(function(){
    //     $location.path('/');
    //   });
    // };
    //
    // $scope.updateTerm = function() {
    //   $http.put(appConfig.path + '/api/terms/' + $stateParams.id, $scope.term).success(function(){
    //     loadTerms();
    //   });
    // };

    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

  });
