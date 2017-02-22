'use strict';

describe('Component: QuestionsListComponent', function() {
  // load the controller's module
  beforeEach(module('citizenpediaApp'));

  var QuestionsListParagraphComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    questionsListParagraphComponent = $componentController('questionsListParagraph', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
