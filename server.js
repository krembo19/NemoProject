// console.log('May Node be with you'); 
'use strict';
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const PORT = 3000;

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
  app.listen(3000, function() {
    console.log('listening on '+PORT);
  }); 

});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + '\\index.html');
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
});
