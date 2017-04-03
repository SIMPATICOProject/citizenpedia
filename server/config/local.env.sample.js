'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'paizaqa-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_ID:       'twitter_id',
  TWITTER_SECRET:   'twitter_secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  AAC_ID:           'aac_id',
  AAC_SECRET:       'secret',
  AAC_ROOT_URL:     'https://example.com/aac',
  AAC_TOKEN_URL:    AAC_ROOT_URL + '/oauth/token',
  AAC_URL:          AAC_ROOT_URL + '/eauth/authorize',
  AAC_CALLBACK_URL: DOMAIN + '/auth/aac/callback/',
  AAC_PROXY:        '',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
