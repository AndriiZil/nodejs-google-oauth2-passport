const express = require('express');
const passport = require('passport');
const session = require('express-session')
const app = express();

require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] })
);

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    }
));

app.get('/auth/google/failure', (req, res) => {
    res.send('something went wrong...');
});

app.get('/protected', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodby My friend!');
});

app.listen(3000, () => console.log('Server started...'))
