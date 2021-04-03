const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// ------------------------------------

// MONGOOSE APPLICATION LEVEL SCHEMAS:
// Load Schema Models:
require('./models/Idea');
const Idea = mongoose.model('ideas');

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

// MIDDLEWARE:
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

app.get('/ideas', (req, res) => {
   Idea.find({}).lean()
      .sort({ date: 'desc' })
      .then(ideas => {
         res.render('ideas/index', {
            ideas: ideas
         });
      });
});

app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
});

app.get('/ideas/edit/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).lean()
   .then(idea => {
      res.render('ideas/edit', {
         idea: idea
      });
   });
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

// PUT Requests:
app.put('/ideas/:id', (req, res) => {
   Idea.findOne({
      _id: req.params.id
   }).then(idea => {
      // New Idea Values
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
         .then(idea => {
            res.redirect('/ideas');
         });
   });
});

// ------------------------------------

// START SERVER:
// Start Web Server:
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});