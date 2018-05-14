'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsShowCtrl', function ($scope,appConfig, $http, $stateParams, Auth, $location) {
    var loadQuestions = function(){
      $http.get(appConfig.path+'/api/questions/' + $stateParams.id).success(function(question) {
        // $scope.question = question;
      // Get the medal for the users
      if (appConfig.gamification == true) {
          $http.get(appConfig.path+'/api/users/' + 'getscorelist/full')
          .success(function(scoreList) {
              for (let index = 0; index < scoreList.board.length; index++) {
                if (question.user._id === scoreList.board[index].playerId) {
                  question.user.score = scoreList.board[index].score;
                  // Admin user: color: #438276
                  // Bronze User: #CB5C0D 0-99
                  // Silver user: #C0C0C0 100-399
                  // Gold user: #D4AF37 >400
                  if (scoreList.board[index].score == 0)
                  {
                    question.user.medal = "#009EE0";
                  }
                  else if (scoreList.board[index].score > 0 && scoreList.board[index].score <= 99)
                  {
                    question.user.medal = "#CB5C0D";
                  }
                  else if (scoreList.board[index].score >= 100 && scoreList.board[index].score <= 399)
                  {
                    question.user.medal = "#C0C0C0";
                  }
                  else if (scoreList.board[index].score >= 400)
                  {
                    question.user.medal = "#D4AF37";
                  }
                }
              }
              if (typeof question.user.score == 'undefined') {
                question.user.score = 0;
                question.user.medal = "#009EE0";
              }

              // Get medal for answers
              question.answers.forEach(element => {
                for (let index = 0; index < scoreList.board.length; index++) {
                  if (element.user._id === scoreList.board[index].playerId) {
                    element.user.score = scoreList.board[index].score;
                    // Admin user: color: #438276
                    // Bronze User: #CB5C0D 0-99
                    // Silver user: #C0C0C0 100-399
                    // Gold user: #D4AF37 >400
                    if (scoreList.board[index].score == 0)
                    {
                      element.user.medal = "#009EE0";
                    }
                    else if (scoreList.board[index].score > 0 && scoreList.board[index].score <= 99)
                    {
                      element.user.medal = "#CB5C0D";
                    }
                    else if (scoreList.board[index].score >= 100 && scoreList.board[index].score <= 399)
                    {
                      element.user.medal = "#C0C0C0";
                    }
                    else if (scoreList.board[index].score >= 400)
                    {
                      element.user.medal = "#D4AF37";
                    }
                  }

                  if (typeof element.user.score == 'undefined') {
                    element.user.score = 0;
                    element.user.medal = "#009EE0";
                  }
                }
              });
        });

      }
      
      $scope.question = question;
      $scope.basePath = appConfig.path;

      $scope.busy = false;
      });

      $scope.options = [];
      var newOptions = [];

      $http.get(appConfig.path+'/api/questions/', {}).success(function(categories) {
        for (var c = 0; c < categories.length; c++) {
          newOptions.push({"name" :categories[c].name, "value" :categories[c]});
        }

        if(categories.length < 20){
          $scope.noMoreData = true;
        }
        $scope.busy = false;
      });
      $scope.options = newOptions;

      $scope.cpd_path = appConfig.cpd_path;

    };
    loadQuestions();

    $scope.hasGamification = function hasGamification(){
      if (appConfig.gamification == false) {
        return false;
      }
      return true;
    };

    $scope.newAnswer = {};
    $scope.submitAnswer = function() {
      $http.post(appConfig.path+'/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function(){
        loadQuestions();
        $scope.newAnswer = {};
      });
    };
    $scope.deleteQuestion = function() {
      $http.delete(appConfig.path+'/api/questions/' + $stateParams.id).success(function(){
        $location.path('/');
      });
    };
    $scope.deleteAnswer = function(answer) {
      $http.delete(appConfig.path+'/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function(){
        loadQuestions();
      });
    };
    $scope.updateQuestion = function() {
      $http.put(appConfig.path+'/api/questions/' + $stateParams.id, $scope.question).success(function(){
        loadQuestions();
      });
    };
    $scope.updateAnswer = function(answer) {
      $http.put(appConfig.path+'/api/questions/' + $stateParams.id + '/answers/' + answer._id, answer).success(function(){
        loadQuestions();
      });
    };
    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

    $scope.isAdmin = function(obj){
      return Auth.isAdmin();
    }

    $scope.newComment = {};
    $scope.submitComment = function() {
      $http.post(appConfig.path+'/api/questions/' + $stateParams.id + '/comments', $scope.newComment).success(function(){
        loadQuestions();
        $scope.newComment = {};
        $scope.editNewComment = false;
      });
    };
    $scope.submitAnswerComment = function(answer) {
      $http.post(appConfig.path+'/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments', answer.newAnswerComment).success(function(){
        loadQuestions();
      });
    };
    $scope.deleteComment = function(comment) {
      $http.delete(appConfig.path+'/api/questions/' + $stateParams.id + '/comments/' + comment._id).success(function(){
        loadQuestions();
      });
    };
    $scope.deleteAnswerComment = function(answer, answerComment) {
      $http.delete(appConfig.path+'/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id).success(function(){
        loadQuestions();
      });
    };
    $scope.updateComment = function(comment) {
      $http.put(appConfig.path+'/api/questions/' + $stateParams.id + '/comments/' + comment._id, comment).success(function(){
        loadQuestions();
      });
    };
    $scope.updateAnswerComment = function(answer, answerComment) {
      $http.put(appConfig.path+'/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment).success(function(){
        loadQuestions();
      });
    };

    $scope.isStar = function(obj){
      return Auth.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    };
    $scope.star = function(subpath) {
      $http.put(appConfig.path+'/api/questions/' + $scope.question._id + subpath + '/star').success(function(){
        loadQuestions();
      });
    };
    $scope.unstar = function(subpath) {
      $http.delete(appConfig.path+'/api/questions/' + $scope.question._id + subpath + '/star').success(function(){
        loadQuestions();
      });
    };

    $scope.profanity = false;
    
    if (appConfig.profanityFilter == true) {
      var profanityList = null;
      $http.get('profanity/'+appConfig.language+'.json').success(function(data) {
        profanityList = data;
      });
  
      $scope.profanityCheck = function(contentToCheck)
      {
        $scope.badWords = []; 
        if (contentToCheck != null)
        {
          $scope.profanity = false;
          var arrayToCheck = contentToCheck.split("\ ");
          for (var i=0; i<arrayToCheck.length; i++)
          {
            if (profanityList.includes(arrayToCheck[i]))
            {
              $scope.profanity = true;
              if (!$scope.badWords.includes(arrayToCheck[i]))
              {
                $scope.badWords.push (arrayToCheck[i]);
              }
             
            }
          }
      }
        
      }
    }

  });
