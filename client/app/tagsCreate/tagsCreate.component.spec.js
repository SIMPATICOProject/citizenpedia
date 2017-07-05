'use strict';

describe('Controller: TagsCreateComponent', function() {

  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var TagsCreateComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    TagsCreateComponent = $componentController('TagsCreateComponent', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
