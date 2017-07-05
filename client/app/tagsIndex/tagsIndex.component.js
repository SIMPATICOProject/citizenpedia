'use strict';

angular.module('paizaqaApp')
  .controller('TagsIndexComponent', function ($scope, $http, $location, Auth, query, appConfig) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = true;
    $scope.isAdmin = Auth.isAdmin();

    $scope.noAdminMessage = "Admin Only Zone";

    $http.get(appConfig.path + '/api/tags', {params: {query: query}}).success(function(tags) {
      $scope.tags = tags;
      if($scope.tags.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });

    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.tags[$scope.tags.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get(appConfig.path + '/api/tags', {params: {query: pageQuery}}).success(function(tags){
        $scope.tags = $scope.tags.concat(tags);
        $scope.busy = false;
        if(tags.length === 0){
          $scope.noMoreData = true;
        }
      });
    };

    $scope.updateTag = function(id, name) {
      $http.get(appConfig.path+'/api/tags/updatetag/'+ id + '/'+name).success(function(){
        $location.path(appConfig.path +'/qae/tags');
      });
    };

  });
