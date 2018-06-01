'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsIndexCtrl', function ($scope, $http, $location, Auth, query, appConfig ) {
    var text = localStorage.getItem('text') || '';
    var tags = localStorage.getItem('tags') || '';
    if (text != '') {
      localStorage.removeItem('text');
      localStorage.removeItem('tags');
      alert(appConfig.path + '/questions/create/?text='+text+'&tags='+tags);
      $window.location.href = appConfig.path + '/questions/create?text='+text+'&tags='+tags;

    }
    
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = false;

    $scope.hasGamification = function hasGamification(){
      if (appConfig.gamification == false) {
        return false;
      }
      return true;
    };

    var apiURL = appConfig.path+'/api/questions';
    var apiGame = appConfig.path+'/api/users/';

    $scope.searchBar = appConfig.home_searchbar;
    $scope.categories = appConfig.home_categories;
    $scope.ask_button = appConfig.home_ask_button;

    $scope.categoriesList = appConfig.home_categories_list;

    $http.get(apiURL, {params: {query: query}}).success(function(questions) {
      // Get the medal for the users
      var usersList = [];

      for(var i = 0; i < questions.length; i++) {
        usersList.push(questions[i].user._id);
      };

      if (appConfig.gamification == true) {
          $http.get(apiGame + 'getscorelist/full')
          .success(function(scoreList) {
            for(var i = 0; i < usersList.length; i++) {
              for (let index = 0; index < scoreList.board.length; index++) {
                if (usersList[i] === scoreList.board[index].playerId) {
                  questions[i].user.score = scoreList.board[index].score;
                  // Admin user: color: #438276
                  // Bronze User: #CB5C0D 0-99
                  // Silver user: #C0C0C0 100-399
                  // Gold user: #D4AF37 >400
                  if (scoreList.board[index].score == 0)
                  {
                    questions[i].user.medal = "#009EE0";
                  }
                  else if (scoreList.board[index].score > 0 && scoreList.board[index].score <= 99)
                  {
                    questions[i].user.medal = "#CB5C0D";
                  }
                  else if (scoreList.board[index].score >= 100 && scoreList.board[index].score <= 399)
                  {
                    questions[i].user.medal = "#C0C0C0";
                  }
                  else if (scoreList.board[index].score >= 400)
                  {
                    questions[i].user.medal = "#D4AF37";
                  }
                }
              }
              if (typeof questions[i].user.score == 'undefined') {
                questions[i].user.score = 0;
                questions[i].user.medal = "#009EE0";
              }
            }
        });
      }
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