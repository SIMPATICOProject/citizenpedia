'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

var gamification = require('../../gamification/gamification.service');

/* istanbul ignore next */
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

/* istanbul ignore next */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      res.redirect(config.path +'/usersadmin');
    }
    return null;
  };
}

/* istanbul ignore next */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/* istanbul ignore next */
/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/* istanbul ignore next */
/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/* istanbul ignore next */
/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/* istanbul ignore next */
/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/* istanbul ignore next */
/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/* istanbul ignore next */
/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  // Do the gamification login action
  gamification.post(userId, 'login');
    
  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }

      if (config.gamification == true) {
          var scorePromise = gamification.getPoints(userId);
          scorePromise
            .then( function (score){
              user.score = score;
              // Admin user: color: #438276
              // Bronze User: #CB5C0D 0-99
              // Silver user: #C0C0C0 100-399
              // Gold user: #D4AF37 >400
              if (score >= 0 && score <= 99)
              {
                user.medal = "#CB5C0D";
              }
              else if (score >= 100 && score <= 399)
              {
                user.medal = "#C0C0C0";
              }
              else if (score >= 400)
              {
                user.medal = "#D4AF37";
              }
              res.json(user);
            })        
      }else{
        res.json(user);
      }

    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}

/**
 * Modify role
 */
export function updateRole(req, res, next) {
  User.update({"_id": req.params.id},{$set:{"role":req.params.newrole}})
    .then(respondWithResult(res))
    .catch(handleError(res));
  //res.redirect(config.path +'/usersadmin');
}

/* istanbul ignore next */
/**
 * Get gamification score for one specific user
 */
export function getScore(req, res, next) {
  var scorePromise = gamification.getPoints(req.params.id);
      scorePromise
        .then( function (score){
          res.json(score);
        })
}

/* istanbul ignore next */
/**
 * Get gamification score for all users
 */
export function getScoreList(req, res, next) {
  var scorePromise = gamification.getScoreList();
      scorePromise
        .then( function (scoreList){
          res.json(scoreList);
        })
}