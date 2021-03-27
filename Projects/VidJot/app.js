const express = require('express');
const exphbs  = require('express-handlebars');

// Setup Express Server:
const app = express();
const port = 5000;

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

// Start Server
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});