const express           = require("express"),
      app               = express(),
    //   PORT              = process.env.PORT || 3000,
      bodyParser        = require("body-parser"),
      methodOverride    = require("method-override"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      localStrategy     = require("passport-local"),
      session           = require("express-session"),
      flash             = require("connect-flash");
      

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(flash());


//---- database setup - mongoose
mongoose.connect("mongodb://localhost:27017/rocket-jobs", {useNewUrlParser: true});
// mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
var Job = require("./models/job.js");
var User = require("./models/user.js");


//---- passport.js setup & config
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


//---- defining locals
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//---- routing
var jobRoutes = require("./routes/job.js");
var userRoutes = require("./routes/user.js");

app.use(jobRoutes);
app.use(userRoutes);

app.get("/", function(req, res) {
    res.redirect("/jobs");
});


//---- server setup
app.listen(3000, function() {
    console.log(`Server is now running on port 3000`); //${PORT}
});
