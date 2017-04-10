'use strict';

describe('Controller: Users', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var UsersIndexComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    UsersIndexComponent = $componentController('UsersIndexComponent', {
      $scope: scope,
      query: {},
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
