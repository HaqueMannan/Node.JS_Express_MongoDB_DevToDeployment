const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('./models/Idea');
const Idea = mongoose.model('ideas');

// ------------------------------------

// EXPRESS SERVER SETUP:
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

// MIDDLEWARE:
// Handlebars Middleware:
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
});

// POST Requests:
app.post('/ideas', (req, res) => {
   let errors = [];

   if(!req.body.title) {
      errors.push( {text: 'Please add a title'} );
   };
   if(!req.body.details) {
      errors.push({ text: 'Please add some details' });
   };

   if(errors.length > 0) {
      res.render('ideas/add', {
         errors: errors,
         titles: req.body.title,
         details: req.body.details
      });
   } else {
      const newUser = {
         title: req.body.title,
         details: req.body.details
      };
      new Idea(newUser)
         .save()
         .then(idea => {
            res.redirect('/ideas');
         });
   };
});

// ------------------------------------

// Start Web Server:
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});