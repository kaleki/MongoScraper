var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var express = require("express");
var app = express();
var axios= require("axios");
var cheerio = require("cheerio");


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
var exhbs = require("express-handlebars");
app.engine("handlebars", exhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/mongo_scraper", {useNewUrlParser: true});






var PORT = 8080;

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });






