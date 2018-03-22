'use strict';

import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

var express = require('express');
var app = express();

/**
* Send the login event to the gamification engine
*/
export function post(userId, action) {
  // Send the post to the gamification engine to gain login points
  app.post(config.gamification_post, function(req, res) {
    var gameId = app.gamification_gameId;
    var playerId = userId;
    var actionId = action;

    res.send(gameId + ' ' + playerId + ' ' + actionId);
  });
}