const express = require('express');
const router = express.Router();

// GET Requests:
router.get('/register', (req, res) => {
   res.render('users/register');
});

router.get('/login', (req, res) => {
   res.render('users/login');
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;