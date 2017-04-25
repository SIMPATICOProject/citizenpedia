'use strict';

//var translation = require('../../languages/'+appConfig.language+'.json');
class NavbarController {
  //start-non-standard

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state, appConfig) {
    
    this.menu = [
      {
        'title': 'All',
        'link': function(){return 'citizenpedia';},
        'show': function(){return true;},
      },
      {
        'title': 'Terms',
        'link': function(){return 'terms';},
        'show': function(){return true;},
      },
      {
        'title': 'Categories',
        'link': function(){return 'categories';},
        'show': function(){return true;},
      },
      // {
      //   'title': 'Mine',
      //   'link': function(){return '/users/' + Auth.getCurrentUser()._id;},
      //   'show': Auth.isLoggedIn,
      // },
      {
        'title': 'Starred',
        'link': function(){return 'users/' + Auth.getCurrentUser()._id + '/starred';},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'Users Admin',
        'link': function(){return 'usersadmin';},
        'show': Auth.isAdmin,
      },
    ];
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
