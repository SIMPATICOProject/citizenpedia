'use strict';

angular.module('paizaqaApp', [
  'paizaqaApp.auth',
  'paizaqaApp.admin',
  'paizaqaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.pagedown',
  'ngTagsInput',
  'ngMessages',
  'infinite-scroll',
  'pascalprecht.translate'
])
  .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

     $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
      });

     $translateProvider.preferredLanguage('en');

  });
