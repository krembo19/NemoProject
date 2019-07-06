var express = require("express");
var app = express();
const path = require('path');
//var cors = require("cors");
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
//app.use(cors());
app.use(bodyParser());
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use(bodyParser.urlencoded({ extended: true }))
var Product = mongoose.model("products", {
  name: String
});
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

app.listen(process.env.PORT || 3000);

app.use(express.static(__dirname));
