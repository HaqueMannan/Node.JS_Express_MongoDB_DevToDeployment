const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

// Load Schema Models:
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Setup Express Server:
const app = express();
const port = 5000;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('MongoDB Connected...');
}).catch(err => {
   console.log(err);
});

// Handlebars Middleware:
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Routes:
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


// Start Server
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});