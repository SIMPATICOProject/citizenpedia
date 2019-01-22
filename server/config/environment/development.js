'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/paizaqa-dev'
    //uri: 'mongodb:27017/paizaqa-dev' /* for docker */

  },

  // Seed database on startup
  seedDB: false,
  port: 9000

};
