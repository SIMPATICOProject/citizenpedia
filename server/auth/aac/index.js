'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('aac', {
    failureRedirect: '/signup',
    scope: [
        'profile.basicprofile.me'
    ],
    session: false
  }))
  // .get('/callback', passport.authenticate('aac', {
  //   failureRedirect: '/signup',
  //   session: false
  // }), setTokenCookie);
  .get('/callback', function(){
    console.log("Aquí vamos a pillar el token");
     // should call /aac/basicprofile/me providing two headers: Authorization ‘Bearer obtained-access-token’ and Accept ‘application/json’
     
  }
  , setTokenCookie);

export default router;
