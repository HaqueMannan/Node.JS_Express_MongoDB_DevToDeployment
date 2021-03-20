const express = require('express');

// Setup Express Server:
const app = express();
const port = 5000;

// Routes:
app.get('/', (req, res) => {
   res.send('Index Page');
});
app.get('/about', (req, res) => {
   res.send('About Page');
});


// Start Server
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});