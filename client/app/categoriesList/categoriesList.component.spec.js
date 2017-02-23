'use strict';

describe('Component: CategoriesListComponent', function() {
  // load the controller's module
  beforeEach(module('citizenpediaApp'));

  var CategoriesListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CategoriesListComponent = $componentController('categoriesList', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
