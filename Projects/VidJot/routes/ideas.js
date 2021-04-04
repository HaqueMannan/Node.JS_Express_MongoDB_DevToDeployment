const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('../models/Idea');
const Idea = mongoose.model('ideas');

// ------------------------------------

// APPLICATION CRUD API:
// GET Requests:
router.get('/', (req, res) => {
   Idea.find({}).lean()
      .sort({ date: 'desc' })
      .then(ideas => {
         res.render('ideas/index', {
            ideas: ideas
         });
      });
});

router.get('/add', (req, res) => {
   res.render('ideas/add');
});

router.get('/edit/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).lean()
   .then(idea => {
      res.render('ideas/edit', {
         idea: idea
      });
   });
});

// POST Requests:
router.post('/', (req, res) => {
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
         details: req.body.details
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
   Idea.remove({_id: req.params.id}).then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
   });
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;