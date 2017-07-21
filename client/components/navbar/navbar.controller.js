'use strict';

class NavbarController {
  //start-non-standard

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state, appConfig, $location) {
    
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.detectIE = function detectIE() {
          var ua = window.navigator.userAgent;

          var msie = ua.indexOf('MSIE ');
          if (msie > 0) {
              // IE 10 or older => return version number
              return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          }

          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
              // IE 11 => return version number
              var rv = ua.indexOf('rv:');
              return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
          }
          // other browser
          return false;
      };

    this.currentPath = function () {return $location.path()};

    this.search = function(keyword) {
      $state.go('main', {keyword: keyword}, {reload: true});
    };
  }
}

angular.module('paizaqaApp')
  .controller('NavbarController', NavbarController);
