'use strict';

describe('Component: QuestionsListComponent', function() {
  // load the controller's module
  beforeEach(module('citizenpediaApp'));

  var QuestionsListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionsListComponent = $componentController('questionsList', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
