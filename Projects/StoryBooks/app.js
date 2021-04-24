const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
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

// Express-Handlebars Middleware:
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Set Global Variable:
app.use((req, res, next) =>{
   res.locals.user = req.user || null;
   next();
});

// Set Static Folders:
app.use(express.static(path.join(__dirname, 'public')));

// Load Routes:
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// Use Routes:
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

// Start Express Server:
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});