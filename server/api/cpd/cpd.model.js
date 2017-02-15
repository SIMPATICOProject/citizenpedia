'use strict';

import mongoose from 'mongoose';

var CpdSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Cpd', CpdSchema);
