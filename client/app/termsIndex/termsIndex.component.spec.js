'use strict';

describe('Component: TermsIndexComponent', function() {
  // load the controller's module
  beforeEach(module('citizenpediaApp'));

  var TermsIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TermsIndexComponent = $componentController('termsIndex', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
