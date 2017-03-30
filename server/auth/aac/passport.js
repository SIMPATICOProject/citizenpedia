import passport from 'passport';
import OAuthStrategy from 'passport-oauth2';

export function setup(User, config) {
  passport.use('aac', new OAuthStrategy({
        authorizationURL: 'https://simpatico.morelab.deusto.es/aac/eauth/authorize',
        tokenURL: 'https://simpatico.morelab.deusto.es/aac/oauth/token',
        clientID: '8e7f4a58-0514-464f-8a09-183d2a51b3b9',
        clientSecret: 'b7c19b9e-f2ba-4b59-83fc-746516c84701',
        callbackURL: 'https://simpatico.morelab.deusto.es/qae/auth/aac/callback/'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("AAC");
    console.log(profile);
    console.log(profile.id);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);

    User.findOneAsync({
      'aac.id': profile.id
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
          aac: profile._json
        });
        user.save()
          .then(user => done(null, user))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }

));

}
