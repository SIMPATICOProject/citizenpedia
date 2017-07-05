'use strict';

angular.module('paizaqaApp')
  .controller('TagsCreateComponent', function ($scope, $http, $location, Auth, appConfig) {
    // if(! Auth.isLoggedIn()){
    //   $location.path('/login');
    //   $location.replace();
    //   return;
    // }
    $scope.submit = function() {
      $http.post(appConfig.path + '/api/tags', $scope.tag).success(function(){
        $location.path('/tagsIndex');
      });
    };
  });
