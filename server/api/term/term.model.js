'use strict';

import mongoose from 'mongoose';

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

export default mongoose.model('Term', TermSchema);
