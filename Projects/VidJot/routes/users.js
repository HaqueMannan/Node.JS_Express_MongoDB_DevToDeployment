const express = require('express');
const router = express.Router();

// GET Requests:
router.get('/register', (req, res) => {
   res.send('Register Route');
});
router.get('/login', (req, res) => {
   res.send('Login Route');
});

// ------------------------------------

// EXPORT MODULE:
module.exports = router;