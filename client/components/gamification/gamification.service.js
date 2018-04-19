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

    getUserMedal(userID) {
      var apiURL = appConfig.path+'/api/questions';
      console.log("Buscando medalla de betis->" + apiURL);
      //https://simpatico.morelab.deusto.es/qae/api/users/getscore/5915c461c8c084062fcdb550
      

    }


  };

  return Gamification;
}

angular.module('paizaqaApp.gamification')
  .factory('Gamification', GamificationService);

})();
