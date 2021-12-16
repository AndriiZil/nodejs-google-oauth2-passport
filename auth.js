const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: '526960475556-rck7lh27c65476o64b41dhkgvnrglm9f.apps.googleusercontent.com',
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
