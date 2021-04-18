const express = require('express');
const session = require('express-session');
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

// Load MongoDB Schema Models:
require('./models/User');

// Load Passport Config:
require('./config/passport')(passport);

// Express Sessions & Cookie Parser:
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: false
}));

// Passport Middleware:
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variable:
app.use((req, res, next) =>{
   res.locals.user = req.user || null;
   next();
});

// Load Routes:
const auth = require('./routes/auth');

// Home Route:
app.get('/', (req, res) => {
   res.send('App is working!');
});

// Use Routes:
app.use('/auth', auth);

// Start Express Server:
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});