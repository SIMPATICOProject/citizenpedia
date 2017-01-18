'use strict';

import mongoose from 'mongoose';

var TagSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [{
    text: String,
  }],
  searchText: String,
});

TagSchema.pre('find', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});
TagSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});

TagSchema.index({
  'title': 'text',
  'content': 'text',
  'tags.text': 'text',
  'searchText': 'text',
}, {name: 'question_schema_index'});

var TinySegmenter = require('tiny-segmenter');

var getSearchText = function(question){
  var tinySegmenter = new TinySegmenter();
  var searchText = "";
  searchText += tinySegmenter.segment(question.title).join(' ') + " ";
  searchText += tinySegmenter.segment(question.content).join(' ') + " ";
  searchText += tinySegmenter.segment(question.tags.text).join(' ') + " ";
  console.log("searchText", searchText);
  return searchText;
};

export default mongoose.model('Tag', TagSchema);
