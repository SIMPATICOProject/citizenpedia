'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsIndexCtrl', function ($scope, $http, $location, Auth, query,appConfig) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = false;

    var apiURL = appConfig.path+'/api/questions';

    $scope.searchBar = appConfig.home_searchbar;
    $scope.categories = appConfig.home_categories;
    $scope.ask_button = appConfig.home_ask_button;

    $scope.categoriesList = appConfig.home_categories_list;

    $http.get(apiURL, {params: {query: query}}).success(function(questions) {
      $scope.questions = questions;
      $scope.basePath = appConfig.path;
      if($scope.questions.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.questions[$scope.questions.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get(apiURL, {params: {query: pageQuery}}).success(function(questions){
        $scope.questions = $scope.questions.concat(questions);
        $scope.busy = false;
        if(questions.length === 0){
          $scope.noMoreData = true;
        }
      });
    };
    $scope.isStar = function(obj){
      return Auth.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    };

    // Get search placeholder
    $http.get('languages/'+appConfig.language+'.json').success(function(data) {
      $scope.searchPlaceholder = data.SEARCH;
    });
    
    $scope.colors = ["#009EE0", "#438276", "#D4AF37", "#C0C0C0", "#CB5C0D"]; 

  })