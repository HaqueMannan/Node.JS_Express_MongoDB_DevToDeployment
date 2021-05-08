const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');

// Stories Index:
router.get('/', (req, res) => {
   Story.find({ status: 'public' })
      .populate('user')
      .lean()
      .then(stories => {
         res.render('stories/index', {
            stories: stories
         });
      });
});

// Show Single Story:
router.get('/show/:id', (req, res) => {
   Story.findOne({
      _id: req.params.id
   }).populate('user').populate('comments.commentUser')
   .lean()
   .then(story => {
      res.render('stories/show', {
         story: story
      });
   });
});

// Add Stories Form:
router.get('/add', ensureAuthenticated, (req, res) => {
   res.render('stories/add');
});

// Edit Stories Form:
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
   Story.findOne({
      _id: req.params.id
   })
   .lean()
   .then(story => {
      res.render('stories/edit', {
         story: story
      });
   });
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
      user: req.user._id
   };

   // Create the Story to MongoDB
   new Story(newStory)
      .save()
      .then(story => {
         res.redirect(`/stories/show/${story._id}`);
      });
});

// Update/PUT a Story:
router.put('/:id', (req, res) => {
   Story.findOne({
      _id: req.params.id
   }).then(story => {
      let allowComments;
      req.body.allowComments? allowComments = true : allowComments = false

      // Set new values from the Edit Stories Form
      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;

      story.save().then(story => {
         res.redirect('/dashboard');
      });
   });
});

// Delete a Story:
router.delete('/:id', (req, res) => {
   Story.remove({_id: req.params.id}).then(() => {
      res.redirect('/dashboard');
   });
});

// Add Comment:
router.post('/comment/:id', (req, res) => {
   Story.findOne({
      _id: req.params.id
   }).then(story => {
      const newComment = {
         commentBody: req.body.commentBody,
         commentUser: req.user._id
      }

      // Unshift to Comments Array
      story.comments.unshift(newComment);

      story.save().then(story => {
         res.redirect(`/stories/show/${story._id}`);
      });
   });
});

module.exports = router;