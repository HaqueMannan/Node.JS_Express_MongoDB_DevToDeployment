const express = require('express');

// Setup Express Server:
const app = express();
const port = 5000;


// How Middleware Works:
app.use((req, res, next) => {
   console.log(Date.now());
   req.name = "VidJot";
   next();
});

// Routes:
app.get('/', (req, res) => {
   console.log(req.name);
   res.send('Index Page');
});
app.get('/about', (req, res) => {
   res.send('About Page');
});


// Start Server
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});