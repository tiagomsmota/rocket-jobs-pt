const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      localStrategy  = require("passport-local"),
      session        = require("express-session"),
      seedDatabase   = require("./seeds");

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//----database setup - mongoose
mongoose.connect("mongodb://localhost:27017/rocket-jobs", {useNewUrlParser: true});

var Job = require("./models/job.js");
var User = require("./models/user.js");


//----passport.js setup & config
app.use(session({
    secret: "Impulsiona-te com Rocket Jobs",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDatabase();


//----defining locals
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});


//----routing
var jobRoutes = require("./routes/job.js");
var authRoutes = require("./routes/auth.js");

app.use(jobRoutes);
app.use(authRoutes);

app.get("/", function(req, res) {
    res.redirect("/jobs");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

//----server setup
app.listen(3000, function() {
    console.log("Server is now running on port 3000");
});

