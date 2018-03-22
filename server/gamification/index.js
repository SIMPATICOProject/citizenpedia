// Gamification controller

// import config from '../config/environment';

// var express = require('express');
// var app = express();


// export function login(userId) {
//   // Send the post to the gamification engine to gain login points
//   app.post(config.gamification_post, function(req, res) {
//     var gameId = app.gamification_gameId;
//     var playerId = userId;
//     var actionId = "login";

//     res.send(gameId + ' ' + playerId + ' ' + actionId);
//   });
// }


'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

