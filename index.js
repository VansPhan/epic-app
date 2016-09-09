var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");

var app     = express();

var User = mongoose.model("User");

app.set("port", process.env.PORT || 1337);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "index"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/api/users", function(req, res){
  User.find({}).then(function(users){
    res.json({ users });
  });
});

app.get("/api/users/:name", function(req, res){
  User.findOne({name: req.params.name}).then(function(user){
    res.json({ user });
  });
});

app.post("/api/users", function(req, res){
  User.find({}).then(function(users) {
    var dupes = false;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.body.id) {
        dupes = true;
      }
    }
    if (dupes) {
      console.log("User already exist")
    }
    else {
      User.create(req.body).then(function(user) {
        console.log(user)
      });
    }
  });
});

app.post("/api/users/:name/delete", function(req, res){
  User.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/api/users")
  });
});

app.post("/api/users/:name", function(req, res){
  User.findOneAndUpdate({name: req.params.name}, req.body.user, {new: true}).then(function(user){
    res.redirect("/api/users/" + user.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
