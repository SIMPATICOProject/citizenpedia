'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TermSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [{
    text: String,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  searchText: String,
});
TermSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
TermSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

TermSchema.index({
  'title': 'text',
  'content': 'text',
  'tags.text': 'text',
  'searchText': 'text',
}, {name: 'term_schema_index'});

var TinySegmenter = require('tiny-segmenter');

var getSearchText = function(term){
  var tinySegmenter = new TinySegmenter();
  var searchText = "";
  searchText += tinySegmenter.segment(term.title).join(' ') + " ";
  searchText += tinySegmenter.segment(term.content).join(' ') + " ";
  console.log("searchText", searchText);
  return searchText;
};
TermSchema.statics.updateSearchText = function(id, cb){
  this.findOne({_id: id}).exec(function(err, term){
    if(err){ if(cb){cb(err);} return; }
    var searchText = getSearchText(term);
    this.update({_id: id}, {searchText: searchText}, function(err, num){
      if(cb){cb(err);}
    });
  }.bind(this));
};

TermSchema.pre('save', function(next){
  this.searchText = getSearchText(this);
  next();
});

export default mongoose.model('Term', TermSchema);



// 'use strict';
//
// import mongoose from 'mongoose';
//
// var TermSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   tags: [{
//     text: String,
//   }],
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   searchText: String,
// });
//
// export default mongoose.model('Term', TermSchema);
