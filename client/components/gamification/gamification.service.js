'use strict';

(function() {

function GamificationService($location, $http, $cookies, $q, appConfig, Util, User) {
  var Gamification = {

    /**
     * Get User score from Gamification engine
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */

    getMedal({userID}, callback) {
      console.log("Pidiendo->" + appConfig.gamification_path + 'gengine/state/' +appConfig.gamification_gameId);
      console.log("Con user->" + userID);

      // var token = btoa('simpatico-galicia:glSimpa02');
      // console.log ("Token -> " + token);

      // var req = {
      //   method: 'GET',
      //   url: appConfig.gamification_path + 'gengine/state/' +appConfig.gamification_gameId + '/' + userID,
      //   headers: {
      //     'Authorization': 'Basic c2ltcGF0aWNvLWdhbGljaWE6Z2xTaW1wYTAy'
      //     // username: 'simpatico-galicia',
      //     // password: 'glSimpa02'
      //   }
      //  }
       
      //  return $http(req)
      //     .then(res => {
      //     console.log("then res");
      //     return res.$promise;
      //   })
      //   // .then(user => {
      //   //   console.log("then user");
      //   //   safeCb(callback)(null, user);
      //   //   return user;
      //   // })
      //   .catch(err => {
      //     console.log("then err");
      //     return $q.reject(err.data);
      //   });

      //$http.defaults.headers.common.Authorization = 'Basic c2ltcGF0aWNvLWdhbGljaWE6Z2xTaW1wYTAy';
      //var auth = $base64.encode("simpatico-galicia:glSimpa02");
      var headers = {"Authorization": "Basic c2ltcGF0aWNvLWdhbGljaWE6Z2xTaW1wYTAy"};

      //Reset headers to avoid OPTIONS request (aka preflight)
      $http.defaults.headers.common = {};
      $http.defaults.headers.post = {};
      $http.defaults.headers.put = {};
      $http.defaults.headers.patch = {};

      return $http.get(appConfig.gamification_path + 'gengine/state/' +appConfig.gamification_gameId + '/' + userID,
          {headers: headers}
        )
        .then(res => {
          console.log("then res");
          return res.$promise;
        })
        // .then(user => {
        //   console.log("then user");
        //   safeCb(callback)(null, user);
        //   return user;
        // })
        .catch(err => {
          console.log("then err");
          console.log(err);
          return $q.reject(err.data);
        });
    }


  };

  return Gamification;
}

angular.module('paizaqaApp.gamification')
  .factory('Gamification', GamificationService);

})();
