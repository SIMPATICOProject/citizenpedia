'use strict';

describe('Controller: Tags', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var TagsIndexComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    TagsIndexComponent = $componentController('TagsIndexComponent', {
      $scope: scope,
      query: {},
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
