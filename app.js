const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Eat Food", "Cook Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

// tells app to use ejs as a view engine
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(req, res) {
  const newItem = req.body.newItem;
  if(req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newItems: workItems });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started runnnig on port 3000");
});
