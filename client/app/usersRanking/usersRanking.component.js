'use strict';

angular.module('paizaqaApp')
  .controller('UsersRankingComponent', function ($scope, $http, $location, Auth, query, appConfig) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = true;
    $scope.isAdmin = Auth.isAdmin();

    $scope.roles = [];
    $scope.roles = appConfig.userRoles;

    $scope.noAdminMessage = "Admin Only Zone";

    $http.get(appConfig.path + '/api/users', {params: {query: query}}).success(function(users) {
      $scope.users = users;
      if($scope.users.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });

    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.users[$scope.users.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get(appConfig.path + '/api/users', {params: {query: pageQuery}}).success(function(users){
        $scope.users = $scope.users.concat(users);
        $scope.busy = false;
        if(users.length === 0){
          $scope.noMoreData = true;
        }
      });
    };

    $scope.colors = ["#D4AF37","#D4AF37","#D4AF37","#C0C0C0","#C0C0C0","#C0C0C0","#CB5C0D","#CB5C0D","#CB5C0D","#CB5C0D","#CB5C0D","#009EE0","#009EE0","#009EE0","#009EE0","#009EE0","#009EE0","#009EE0","#009EE0","#009EE0"]; 
    $scope.numbers = [976,972,924,863,790,748,667,614,574,436,415,376,316,211,200,179,171,167,134];


    $scope.updaterole = function(role, userId) {
      $http.get(appConfig.path + '/api/users/updaterole/'+userId+'/'+role).success(function(){
        $location.path(appConfig.path +'/qae/usersadmin');
      });
    };

  });
