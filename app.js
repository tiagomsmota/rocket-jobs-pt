const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      seedDatabase  = require("./seeds");

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));

//----database setup - mongoose
mongoose.connect("mongodb://localhost:27017/rocket-jobs", {useNewUrlParser: true});

var Job = require("./models/job.js");

seedDatabase();

//----routing
app.get("/", function(req,res) {
    res.redirect("/jobs");
});

//index
app.get("/jobs", function(req, res) {
    Job.find({}, function(err, foundJobs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {jobs : foundJobs});
        }
    });
});

//new
app.get("/jobs/new", function(req, res) {
    res.render("newjob");
});

//create

//show
app.get("/jobs/:id", function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if(err) {
            console.log(err);
        } else {
            res.render("job", {job : foundJob});
        }
    });
});

//edit

//update

//destroy



//----server setup
app.listen(3000, function() {
    console.log("Server is now running on port 3000");
});
