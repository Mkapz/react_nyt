var express = require("express");


var Article = require("../models/Article");
var app = express();


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/api", function(req, res) {

  
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});


app.post("/api", function(req, res) {
  console.log("BODY: " + req.body._id);

  
  Article.create({
    title: req.body.title,
    snippet: req.body.snippet,
    url: req.body.url,
    pub_date: req.body.date,
    art_id: req.body.art_id,
    date: Date.now()
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});


app.post("/api/delete", function(req, res) {
    console.log(req.body);
    Article.remove({ _id: req.body._id}, function(err) {
        if (!err) {
            res.send("Deleted!");
        } else {
            console.log(err);
        }
    });

});

module.exports = app;
