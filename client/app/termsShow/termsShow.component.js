'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './termsShow.routes';

export class TermsShowComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('citizenpediaApp', [uiRouter])
  .config(routes)
  .component('termsShow', {
    templateUrl: 'app/termsShow/termsShow.html',
    controller: TermsShowComponent,
    controllerAs: 'termsShowCtrl'
  })
  .name;
