'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsCreateCtrl', function ($scope, $http, $location, Auth, appConfig) {
    
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      $location.replace();
      return;
    }
    
    $scope.submit = function() {
      $http.post(appConfig.path + '/api/questions', $scope.question).success(function(){
        console.log($scope.question);
        $location.path('/');
      });
    };

    if ($location.$$search.tags) {
      // Received tags
      var tags = $location.$$search.tags;
      var arrayTags = tags.split(',');


      if (arrayTags) {
        $scope['question'] = {tags : arrayTags};
      }
    }

    // Categories
    $scope.options = [];
    var newOptions = [];

    $http.get(appConfig.path + '/api/categories', {}).success(function(categories) {
      for (var c = 0; c < categories.length; c++) {
        newOptions.push({"name" : categories[c].name, "value" :categories[c]._id});
        if(arrayTags){
          if (categories[c].name == arrayTags[0])
          {
            $scope['selectInit'] = categories[c].name;
            $scope['selectValue'] = categories[c]._id;
          }
        }
      }

      if(categories.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });

    $scope.options = newOptions;
    
    if ($location.$$search.text) {
      var originalText = $location.$$search.text;
      $scope['originalText'] = originalText;
    }
  });
