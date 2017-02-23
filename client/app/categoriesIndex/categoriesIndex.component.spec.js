'use strict';

describe('Controller: CategoriesIndexComponent', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var CategoriesIndexComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    CategoriesIndexComponent = $componentController('CategoriesIndexComponent', {
      $scope: scope,
      query: {},
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
