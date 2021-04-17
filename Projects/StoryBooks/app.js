const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Setup Express Server:
const app = express();
const port = process.env.PORT || 5000;

// Load Passport Config:
require('./config/passport')(passport);

// Load Routes:
const auth = require('./routes/auth');

app.get('/', (req, res) => {
   res.send('App is working!');
});

// Use Routes:
app.use('/auth', auth);

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});