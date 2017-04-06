'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsShowCtrl', function ($scope,appConfig, $http, $stateParams, Auth, $location) {
    var loadQuestions = function(){

      $http.get(appConfig.path+'/api/questions/' + $stateParams.id).success(function(question) {
        $scope.question = question;
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

  });
