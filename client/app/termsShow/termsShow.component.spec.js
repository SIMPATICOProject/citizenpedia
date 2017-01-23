'use strict';

describe('Component: TermsShowComponent', function() {
  // load the controller's module
  beforeEach(module('citizenpediaApp'));

  var TermsShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TermsShowComponent = $componentController('termsShow', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
