const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('../models/User');
const User = mongoose.model('users');

// ------------------------------------

// EXPORT MODULE FUNCTION:
// Define Strategy Configuration:
module.exports = function(passport) {
   // Local Strategy:
   passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match User:
      User.findOne({
         email: email
      }).lean()
      .then(user => {
         if(!user) {
            return done(null, false, { message: 'No User Found' });
         };

         // Match Password:
         bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
               return done(null, user);
            } else {
               return done(null, false, { message: 'Incorrect Login' });
            };
         });
      });
   }));

   // Serialise/De-serialise user session on successful login:
   passport.serializeUser(function(user, done) {
      done(null, user._id);
   });

   passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
         done(err, user);
      });
   });
};