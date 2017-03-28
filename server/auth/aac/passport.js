import passport from 'passport';
import {OAuth2Strategy as AacStrategy} from 'passport-oauth2';

export function setup(User, config) {
  passport.use(new AacStrategy({
      authorizationURL: 'https://www.example.com/oauth2/authorize',
      tokenURL: 'https://www.example.com/oauth2/token',
      clientID: EXAMPLE_CLIENT_ID,
      clientSecret: EXAMPLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/example/callback"
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
