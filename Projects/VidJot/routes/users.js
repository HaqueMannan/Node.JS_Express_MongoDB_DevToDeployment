const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('../models/User');
const User = mongoose.model('users');

// ------------------------------------

// GET Requests:
router.get('/register', (req, res) => {
   res.render('users/register');
});

router.get('/login', (req, res) => {
   res.render('users/login');
});

router.get('/logout', (req, res) => {
   req.logOut();
   req.flash('success_msg', 'You are now logged out');
   res.redirect('/users/login');
});

// POST Requests:
router.post('/register', (req, res) => {
   // Server Side Form Validation:
   let errors = [];

   if(!req.body.name) {
      errors.push( {text: 'Please add a Name'} );
   };

   if(!req.body.email) {
      errors.push( {text: 'Please add an Email'} );
   };

   if(!req.body.password || !req.body.confirmPassword) {
      errors.push( {text: 'Please enter Password and Confirm Password'} );
   };

   if(req.body.password.length < 6) {
      errors.push( {text: 'Passwords must be at least 6 characters'} );
   };

   if(req.body.password != req.body.confirmPassword) {
      errors.push( {text: 'Passwords do not match'} );
   };

   if(errors.length > 0) {
      res.render('users/register', {
         errors: errors,
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         confirmPassword: req.body.confirmPassword
      });
   } else {
      User.findOne({
         email: req.body.email
      }).lean()
      .then(user => {
         if(user) {
            req.flash('error_msg', 'Email already registered');
            res.redirect('/users/register');
         } else {
            // Create newUser object based on User Model:
            const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password
            });

            // Encrypt user's password:
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash
                  newUser.save()
                     .then(user => {
                        req.flash('success_msg', 'You are now registered and can now login.');
                        res.redirect('/users/login');
                     })
                     .catch(err => {
                        console.log(err);
                        return;
                     });
               });
            });
         }
      });
   };
});

router.post('/login', (req, res, next) => {
   // Server Side Form Validation:
   let errors = [];

   if(!req.body.email) {
      errors.push( {text: 'Please enter your email'} );
   };

   if(!req.body.password) {
      errors.push( {text: 'Please enter your password'} );
   };

   if(errors.length > 0) {
      res.render('users/login', {
         errors: errors,
      });
   } else {
      passport.authenticate('local', {
         successRedirect: '/ideas',
         failureRedirect: '/users/login',
         failureFlash: true
      })(req, res, next);
   };
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;