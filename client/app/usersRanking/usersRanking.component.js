'use strict';

angular.module('paizaqaApp')
  .controller('UsersRankingComponent', function ($scope, $http, $location, Auth, query, appConfig) {
    $scope.busy = true;
    $scope.noMoreData = true;

    $scope.noAdminMessage = "Admin Only Zone";

    $http.get(appConfig.path + '/api/users', {params: {query: query}}).success(function(users) {
     
      var apiGame = appConfig.path+'/api/users/';
      $http.get(apiGame + 'getscorelist/full').success(function(scoreList) {

        for(var i = 0; i < users.length; i++) {
          for (let index = 0; index < scoreList.board.length; index++) {
            if (users[i]._id === scoreList.board[index].playerId) {
              users[i].score = scoreList.board[index].score;
              // Admin user: color: #438276
              // Bronze User: #CB5C0D 0-99
              // Silver user: #C0C0C0 100-399
              // Gold user: #D4AF37 >400
              if (scoreList.board[index].score == 0)
              {
                users[i].medal = "#009EE0";
              }
              else if (scoreList.board[index].score > 0 && scoreList.board[index].score <= 99)
              {
                users[i].medal = "#CB5C0D";
              }
              else if (scoreList.board[index].score >= 100 && scoreList.board[index].score <= 399)
              {
                users[i].medal = "#C0C0C0";
              }
              else if (scoreList.board[index].score >= 400)
              {
                users[i].medal = "#D4AF37";
              }
            }
          }
          if (typeof users[i].score == 'undefined') {
            users[i].score = 0;
            users[i].medal = "#009EE0";
          }
        }
        users.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);});
      });
    
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
