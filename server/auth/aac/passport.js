import passport from 'passport';
import {OAuth2Strategy as AacStrategy} from 'passport-oauth';

export function setup(User, config) {
  passport.use(new AacStrategy({
    authorizationURL: 'https://simpatico.morelab.deusto.es/aac/eauth/authorize',
    tokenURL: 'https://simpatico.morelab.deusto.es/aac/oauth/token',
    clientID: '8e7f4a58-0514-464f-8a09-183d2a51b3b9',
    clientSecret: 'b7c19b9e-f2ba-4b59-83fc-746516c84701',
    callbackURL: "https://simpatico.morelab.deusto.es/qae/aac/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'aac.id': aac.id
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          username: profile.emails[0].value.split('@')[0],
          provider: 'aac',
        });
        user.save()
          .then(user => done(null, user))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
