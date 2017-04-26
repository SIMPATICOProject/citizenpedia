'use strict';

class NavbarController {
  //start-non-standard

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state, appConfig) {
    
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.search = function(keyword) {
      $state.go('main', {keyword: keyword}, {reload: true});
    };
  }
}

angular.module('paizaqaApp')
  .controller('NavbarController', NavbarController);
