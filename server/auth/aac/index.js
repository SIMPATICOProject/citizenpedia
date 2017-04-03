'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var request = require('request');

var router = express.Router();

router
  .get('/', passport.authenticate('aac', {
    failureRedirect: '/signup',
    scope: [
        'profile.basicprofile.me'
    ],
    session: false
  }))
  .get('/callback', passport.authenticate('aac', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

export default router;
