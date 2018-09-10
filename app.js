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
app.post("/jobs", function(req,res) {
    function convertString(str) {
        var string = str.replace(/\w\S*/g, function(x) { 
          return x.charAt(0).toUpperCase() + x.substr(1);
        });
        var convertedString = string.replace(/\s+/g, "");
        return convertedString.split(",");
    }
    var jobSkills = convertString(req.body.job.skills);
    var jobData = {company: req.body.job.company, title: req.body.job.title, location: req.body.job.location, regimen: req.body.job.regimen, description: req.body.job.description, benefits: req.body.job.benefits, skills: jobSkills};
    Job.create(jobData, function(err, createdJob) {
        if(err) {
            console.log(err);
        } else {
            console.log("A new job has been added:");
            console.log(createdJob);
            createdJob.save();
            res.redirect("/jobs");
        }
    });
});

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
app.get("/jobs/:id/edit", function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if(err) {
            console.log(err);
        } else {
            res.render("editjob", {job : foundJob});
            console.log(foundJob.benefits);
        }
    });
});

//update
app.put("/jobs/:id", function(req, res) {
    Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, updatedJob) {
        if(err) {
            console.log(err);
        } else {
            console.log("The following job has been updated: " + updatedJob.title);
            console.log(req.body);
            res.redirect("/jobs/" + req.params.id);
        }
    });
});

//destroy
app.delete("/jobs/:id", function(req, res) {
    Job.findByIdAndDelete(req.params.id, function(err, deletedJob) {
        if(err) {
            console.log(err);
        } else {
            console.log("The following job has been deleted:" + deletedJob.title);
            res.redirect("/jobs");
        }
    });
});


//----server setup
app.listen(3000, function() {
    console.log("Server is now running on port 3000");
});
