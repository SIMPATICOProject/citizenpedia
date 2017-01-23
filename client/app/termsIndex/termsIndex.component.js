'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './termsIndex.routes';

export class TermsIndexComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('citizenpediaApp', [uiRouter])
  .config(routes)
  .component('termsIndex', {
    templateUrl: 'app/termsIndex/termsIndex.html',
    controller: TermsIndexComponent,
    controllerAs: 'termsIndexCtrl'
  })
  .name;
