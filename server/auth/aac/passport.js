import passport from 'passport';
import OAuthStrategy from 'passport-oauth2';

// AAC needed
var request = require('request');

export function setup(User, config) {
  //passport.use('aac', new OAuthStrategy({
  var AACStrategy = new OAuthStrategy({
        authorizationURL: config.aac.aacURL,
        tokenURL: config.aac.tokenURL,
        clientID: config.aac.clientID,
        clientSecret: config.aac.clientSecret,
        callbackURL: config.aac.aacCallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var profileParsed = JSON.parse(profile);

    User.findOneAsync({
      'aac.id': profileParsed.userId
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        user = new User({
          name: profileParsed.name + ' ' +profileParsed.surname,
          //email: profile.emails[0].value,
          role: 'user',
          //username: profile.emails[0].value.split('@')[0],
          provider: 'aac',
          aac: profile._json
        });
        user.save()
          .then(user => done(null, user))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }

);

// Overriding passport UserProfile to get data from AAC
AACStrategy.userProfile = function(accessToken, done){
  var options = {
          method: 'GET',
          proxy: config.aac.aacProxy,
          url: config.aac.aacRootURL + '/basicprofile/me',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept' : 'application/json'
          }
        };//options

  function callback(error, response, body) {
    return done(null, body);
  }

  request(options, callback);


    

}//UserProfile

passport.use('aac',AACStrategy);

}//setup
