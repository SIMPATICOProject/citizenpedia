'use strict';

describe('Controller: TermsIndexComponent', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var TermsIndexComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    TermsIndexComponent = $componentController('TermsIndexComponent', {
      $scope: scope,
      query: {},
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
