var express = require("express");
var app = express();
//var cors = require("cors");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ui5con");
//app.use(cors());
app.use(bodyParser());
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

app.listen(3000);

app.use(express.static(__dirname));
