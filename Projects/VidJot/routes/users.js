const express = require('express');
const router = express.Router();

// GET Requests:
router.get('/register', (req, res) => {
   res.render('users/register');
});

router.get('/login', (req, res) => {
   res.render('users/login');
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
   }

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
      res.send('passed');
   };
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;