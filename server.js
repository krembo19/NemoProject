// console.log('May Node be with you'); 
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
const dbURL = "mongodb://heroku_gkktb1k2:qn6smi3o6nt6vcjc37u88t5im@ds247637.mlab.com:47637/heroku_gkktb1k2";
let port = process.env.PORT;
let dbString = "mongodb://localhost/crm"
var db;

if (port == null || port == "") {
  port = 3000;
}
else {
  dbString = dbURL;
}

MongoClient.connect(dbString, (err, database) => {
  // ... start the server
  if (err) return console.log(err);
  db = database.db('crm');

  app.listen(port, function () {
    console.log('running with db' + dbString);
    console.log('listening on ' + port);
  });

});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.get('/', (req, res) => {
   const index = path.join(__dirname, 'index.html');
   res.sendFile(index);
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});

app.get('/customer', (req, res) => {
  var cursor = db.collection('customer').find().toArray(function(err, results) {
    res.send(results);
  })
});

app.post('/customer', (req, res) => {
  db.collection('customer').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
});
