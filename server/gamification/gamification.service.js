'use strict';

import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

var request = require('request');

/**
* Send the event to the gamification engine
*/
export function post(userId, action) {
  var json = {
    "gameId": config.gamification_gameId,
    "playerId": userId,
    "actionId": action,
    "data":{}
  };
 
  var options = {
    url: config.gamification_post,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: json
  };

  request(options, function(err, res, body) {
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      console.log(body);
    }
  });

}

/**
* Get FUll Users list
*/
export function getList()
{
  request
  .get(config.gamification_path + config.gamification_gameId + '/classification/general')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    //console.log(response) // 'image/png'
  })
}