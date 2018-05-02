'use strict';

angular.module('paizaqaApp.gamification', [
  'paizaqaApp.constants',
  'paizaqaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
