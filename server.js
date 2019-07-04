// console.log('May Node be with you'); 
'use strict';
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const dbURL = "mongodb://heroku_gkktb1k2:qn6smi3o6nt6vcjc37u88t5im@ds247637.mlab.com:47637/heroku_gkktb1k2";
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}
console.log(port);
MongoClient.connect(dbURL, (err, database) => {
  // ... start the server
  app.listen(port, function() {
    console.log('listening on '+ port);
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
