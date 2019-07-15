const express = require("express");
var cors = require('cors');
var app = express();
const path = require('path');
//var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
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

const options = {
  origin: true,
  "Access-Control-Allow-Credentials": true,

  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Headers": true,
  "Access-Control-Expose-Headers": true
};


app.use(cors(options));
app.options('*', cors()); 
/*
var product = new Product({name:"UI5Con"});
product.save(function(err){
  if (err){
    console.log("error");
  }else {
    console.log("saved");
  }
});
*/

app.get('/', (req, res) => {
   const index = path.join(__dirname, 'index.html');
   res.sendFile(index);
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});


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

app.options('/ui5', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));

app.use(bodyParser.urlencoded({ extended: true }))
var Product = mongoose.model("products", {
  name: String
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
  );
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
      return res.status(200).json({});
  }
  next(); //so that other routes can take over
});

app.listen(process.env.PORT || 3000);

//app.use(express.static(__dirname));
