'use strict';

import mongoose from 'mongoose';

var StatSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Stat', StatSchema);
