const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');

// ------------------------------------

// EXPRESS SERVER & DATABASE SETUP:
// Setup Express Server:
const app = express();
const port = 5000;

// Connect to Mongoose:
mongoose.connect('mongodb://localhost/vidjot-dev', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('MongoDB Connected...');
}).catch(err => {
   console.log(err);
});

// ------------------------------------

// PASSPORT AUTHENTICATION SETUP:
require('./config/passport')(passport);

// ------------------------------------

// MIDDLEWARE:
// Express Static Directory Path Middleware:
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Middleware:
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method-Override Middleware:
app.use(methodOverride('_method'));

// Express-Session Middleware:
app.use(session({
   secret: 'app secret',
   resave: true,
   saveUninitialized: true,
}));

// Passport Session Middleware:
// (Must come after the Express-Session Middleware to avoid any issues)
app.use(passport.initialize());
app.use(passport.session());

// Connect-Flash Middleware:
app.use(flash());

// ------------------------------------

// GLOBAL VARIABLES:
app.use(function(req, res, next) {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

// ------------------------------------

// LOAD ROUTES:
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// ------------------------------------

// ROUTES:
// GET Requests:
app.get('/', (req, res) => {
   const title = 'Welcome'
   res.render('index', {
      title: title
   });
});

app.get('/about', (req, res) => {
   res.render('about');
});

// Use Loaded Routes:
app.use('/ideas', ideas);
app.use('/users', users);

// ------------------------------------

// START SERVER:
// Start Web Server:
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});