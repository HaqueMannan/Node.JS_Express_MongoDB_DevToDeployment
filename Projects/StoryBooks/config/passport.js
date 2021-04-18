const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

// Load Schema Model:
const User = mongoose.model('users');

module.exports = function(passport) {
   passport.use(
      new GoogleStrategy({
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback',
         proxy: true //Used for Heroku which uses https. Prevents any errors thrown.
      }, (accessToken, refreshToken, profile, done) => {
         // console.log(accessToken);
         // console.log(profile);

         const image = profile.photos[0].value;

         const newUser = {
            googleID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            image: image
         };

         // Check for existing user
         User.findOne({
            googleID: profile.id
         }).then(user => {
            if(user) {
               // Return User
               done(null, user);
            } else {
               // Create New User
               new User(newUser)
                  .save()
                  .then(user => {
                     done(null, user);
                  });
            };
         });
      })
   );
};