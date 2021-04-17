const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('App is working!');
});

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});