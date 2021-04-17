const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

module.exports = function(passport) {
   passport.use(
      new GoogleStrategy({
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback',
         proxy: true //Used for Heroku which uses https. Prevents any errors thrown.
      }, (accessToken, refreshToken, profile, done) => {
         console.log(accessToken);
         console.log(profile);
      })
   );
};