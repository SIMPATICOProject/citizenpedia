'use strict';

class GamificationController {

  constructor(Auth, $state, appConfig, $location, $translate) {
    
    
    this.medal = '#D4AF37';
    
  }
}

angular.module('paizaqaApp')
  .controller('GamificationController', GamificationController);