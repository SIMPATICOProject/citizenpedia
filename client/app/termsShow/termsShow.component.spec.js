'use strict';

describe('Controller: TermsShowComponent', function() {

  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var TermsShowComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TermsShowComponent = $controller('TermsShowComponent', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
