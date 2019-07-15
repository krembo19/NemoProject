const express = require("express");
var cors = require('cors');
var app = express();
const path = require('path');
//var cors = require("cors");
const request = require('request');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dbURL = "mongodb://heroku_gkktb1k2:qn6smi3o6nt6vcjc37u88t5im@ds247637.mlab.com:47637/heroku_gkktb1k2";
let port = process.env.PORT;
var db;
var dbString = "mongodb://localhost/ui5con";

if (port == null || port == "") {
  port = 3000;
}
else {
  dbString = dbURL;
}

mongoose.connect(dbString);

app.use(cors());

app.get('/', (req, res) => {
   const index = path.join(__dirname, 'index.html');
   res.sendFile(index);
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
var username = "c4c-admin-user",
    password = "Nik.Bach1";


auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

app.get("/cors", function(req, res){
  
  request('https://my343873.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/', { json: true,
headers : {"Authorization": auth} }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
  res.send(body);
});

})

app.get("/products", function(req, res){
  
  Product.find(function(err, products){
    res.send({data: products});
  })
})

app.post("/products", function(req, res){
 // console.log(req);
  console.log(req.body);
  var name = req.body.name;

  var product = new Product ({name: name});
  product.save(function(err){
    if(err){
      console.log("failed");
    } else {
      console.log("saved");
      res.json({msg: "Product saved"});
      res.status(201);
      res.send();

    }

  })
})


app.use('/ui5', express.static(path.join(__dirname, 'webapp')));

app.use(bodyParser.urlencoded({ extended: true }))
var Product = mongoose.model("products", {
  name: String
});

app.listen(process.env.PORT || 3000);

//app.use(express.static(__dirname));
