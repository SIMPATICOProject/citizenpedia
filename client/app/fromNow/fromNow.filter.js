'use strict';

angular.module('paizaqaApp')
  .filter('fromNow', function (appConfig) {
    return function (input) {
      return moment(input).locale(appConfig.language).fromNow();
    };
  });
