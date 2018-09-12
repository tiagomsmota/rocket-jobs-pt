const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose       = require("mongoose"),
      seedDatabase   = require("./seeds");

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//----database setup - mongoose
mongoose.connect("mongodb://localhost:27017/rocket-jobs", {useNewUrlParser: true});

var Job = require("./models/job.js");
var User = require("./models/user.js");

seedDatabase();

//----routing
var jobRoutes = require("./routes/job.js");

app.use(jobRoutes);

app.get("/", function(req, res) {
    res.redirect("/jobs");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/reg", function(req, res) {
    res.render("register");
});

//----server setup
app.listen(3000, function() {
    console.log("Server is now running on port 3000");
});

