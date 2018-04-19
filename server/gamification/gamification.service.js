'use strict';

import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

var request = require('request');

/**
* Send the event to the gamification engine
*/
export function post(userId, action) {
  if (userId != null){
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
      //console.log(body);
    }
  });}

}

/**
* Get User points
*/
export function getPoints(userID)
{
  return new Promise(function (fulfill, reject){
    request(config.gamification_path + 'gengine/state/' +config.gamification_gameId + '/' + userID, function (error, response, body) {
      try {
        var result = JSON.parse(body);
        fulfill(result.state.PointConcept[0].score);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });

}

/**
* Get FUll Users list
*/
export function getScoreList(userID)
{
  return new Promise(function (fulfill, reject){
    request(config.gamification_path + 'data/game/' + config.gamification_gameId + '/classification/general', function (error, response, body) {
      try {
        var result = JSON.parse(body);
        fulfill(result);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}