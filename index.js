var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");

var app     = express();

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


app.listen(app.get("port"), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
