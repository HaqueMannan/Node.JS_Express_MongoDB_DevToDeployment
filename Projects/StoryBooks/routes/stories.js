const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');

// Stories Index:
router.get('/', (req, res) => {
   res.render('stories/index');
});

// Add Stories Form:
router.get('/add', ensureAuthenticated, (req, res) => {
   res.render('stories/add');
});

// Post a Story:
router.post('/', ensureAuthenticated, (req, res) => {
   let allowComments;
   req.body.allowComments? allowComments = true : allowComments = false

   // Create Story Object to save into MongoDB
   const newStory = {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: allowComments,
      user: req.user.id
   };

   // Create the Story to MongoDB
   new Story(newStory)
      .save()
      .then(story => {
         res.redirect(`/stories/show/${story._id}`);
      });
});

module.exports = router;