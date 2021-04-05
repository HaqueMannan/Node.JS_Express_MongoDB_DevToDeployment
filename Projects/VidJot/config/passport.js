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
      console.log(email, password);
   }));
};