const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// Stories Index:
router.get('/', (req, res) => {
   res.render('stories/index');
});

// Add Stories Form:
router.get('/add', ensureAuthenticated, (req, res) => {
   res.render('stories/add');
});

module.exports = router;