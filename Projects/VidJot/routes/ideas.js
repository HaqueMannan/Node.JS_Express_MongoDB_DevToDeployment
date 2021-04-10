const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('../models/Idea');
const Idea = mongoose.model('ideas');

// ------------------------------------

// APPLICATION CRUD API:
// GET Requests:
router.get('/', ensureAuthenticated, (req, res) => {
   Idea.find({ user: req.user.id }).lean()
      .sort({ date: 'desc' })
      .then(ideas => {
         res.render('ideas/index', {
            ideas: ideas
         });
      });
});

router.get('/add', ensureAuthenticated, (req, res) => {
   res.render('ideas/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).lean()
   .then(idea => {
      if(idea.user != req.user.id) {
         req.flash('error_msg', 'Not Authorised');
         res.redirect('/ideas');
      } else {
         res.render('ideas/edit', {
            idea: idea
         });
      };
   });
});

// POST Requests:
router.post('/', ensureAuthenticated, (req, res) => {
   // Server Side Form Validation:
   let errors = [];

   if(!req.body.title) {
      errors.push( {text: 'Please add a title'} );
   };
   if(!req.body.details) {
      errors.push({ text: 'Please add some details' });
   };

   if(errors.length > 0) {
      res.render('ideas/add', {
         errors: errors,
         titles: req.body.title,
         details: req.body.details
      });
   } else {
      const newUser = {
         title: req.body.title,
         details: req.body.details,
         user: req.user.id
      };
      new Idea(newUser)
         .save()
         .then(idea => {
            req.flash('success_msg', 'Video idea added');
            res.redirect('/ideas');
         });
   };
});

// PUT Requests:
router.put('/:id', ensureAuthenticated, (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).then(idea => {
      // New Idea Values
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
         .then(idea => {
            req.flash('success_msg', 'Video idea updated');
            res.redirect('/ideas');
         });
   });
});

// DELETE Requests:
router.delete('/:id', ensureAuthenticated, (req, res) => {
   Idea.deleteOne({_id: req.params.id}).then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
   });
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;