const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

// Setup Express Server:
const app = express();
const port = process.env.PORT || 5000;

// Map Global Promises (remove any weird promise warnings):
mongoose.Promise = global.Promise;
// Mongoose Connection:
mongoose.connect(keys.mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('MongoDB Connect')
}).catch(err => {
   console.log(err);
});

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