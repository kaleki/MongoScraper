var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var express = require("express");
var path = require("path");
var app = express();
var axios= require("axios");
var cheerio = require("cheerio");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
var exhbs = require("express-handlebars");
app.engine("handlebars", exhbs({defaultLayout: "main", partialsDir: path.join(__dirname, "views/layouts/partials")}));
app.set("view engine", "handlebars");

//Mongoose
mongoose.connect("mongodb://localhost/mongo_scraper", {useNewUrlParser: true});
var db = mongoose.connection;

db.on("error", function(error){
  console.log(error)
});

db.once("open", function(){
  console.log("Connection Succesful!")
});

//Routes

app.get("/", function(req, res) {
  Article.find({"saved": false}, function(error, data) {
    var hbsObject = {
      article: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

app.get("/saved", function(req, res) {
  Article.find({"saved": true}).populate("notes").exec(function(error, articles) {
    var hbsObject = {
      article: articles
    };
    res.render("saved", hbsObject);
  });
});

app.get("/scrape", function(req, res) {
  request("https://www.espn.com/nba/", function(error, response, html) {
    var $ = cheerio.load(html);

var PORT = 8080;



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });






