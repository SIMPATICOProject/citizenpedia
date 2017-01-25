'use strict';

angular.module('paizaqaApp')
  .controller('OauthButtonsCtrl', function($window) {
    this.loginOauth = function(provider) {
      $window.location.href = '/citizenpedia/auth/' + provider;
    };
  });
