'use strict';

import mongoose from 'mongoose';

var QaeSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Qae', QaeSchema);
