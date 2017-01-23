'use strict';

describe('Controller: TermsCreateComponent', function() {

  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var TermsCreateComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    TermsCreateComponent = $componentController('TermsCreateComponent', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
