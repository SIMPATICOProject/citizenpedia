'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb:27017/paizaqa-dev'
  },

  // Seed database on startup
  seedDB: false,
  port: 9000

};
