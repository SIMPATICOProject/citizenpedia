'use strict';

angular.module('paizaqaApp')
  .directive('gamification', () => ({
    restrict: 'E',
    controller: 'GamificationController',
    controllerAs: 'gam'
  }));
