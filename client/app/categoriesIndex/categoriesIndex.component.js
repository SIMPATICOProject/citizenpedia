'use strict';

angular.module('paizaqaApp')
  .controller('CategoriesIndexComponent', function ($scope, $http, $location, Auth, query) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = true;

    $http.get('/api/categories', {params: {query: query}}).success(function(categories) {
      $scope.categories = categories;
      if($scope.categories.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.categories[$scope.categories.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get('/api/categories', {params: {query: pageQuery}}).success(function(categories){
        $scope.categories = $scope.categories.concat(categories);
        $scope.busy = false;
        if(categories.length === 0){
          $scope.noMoreData = true;
        }
      });
    };
  });
