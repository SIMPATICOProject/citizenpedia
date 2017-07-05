'use strict';

import mongoose from 'mongoose';

var TagSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Tag', TagSchema);
