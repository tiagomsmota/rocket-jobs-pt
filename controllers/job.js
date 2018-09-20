const mongoose = require("mongoose");

var Job = require("../models/job.js");

var middleware = require("../middleware/index.js");

var jobController = {};


//index
jobController.index = function(req, res) {
    Job.find({}, function(err, foundJobs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {jobs : foundJobs});
        }
    });
};

//new
jobController.new = function(req, res) {
    res.render("jobs/newjob");
};

//create
jobController.create = function(req,res) {
    var jobSkills = middleware.convertString(req.body.job.skills);
    var jobData = { 
        company: { 
            id: req.user._id, 
            name: req.user.username 
        },
        title: req.body.job.title, 
        location: req.body.job.location, 
        regimen: req.body.job.regimen, 
        description: req.body.job.description, 
        benefits: req.body.job.benefits, 
        skills: jobSkills,
    };
    console.log(req.user);
    Job.create(jobData, function(err, createdJob) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            createdJob.save();
            req.flash("success", "Submetes-te uma vaga no Rocket Jobs.");
            res.redirect("/jobs");
        }
    });
};

//show
jobController.show = function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            res.render("jobs/job", {job : foundJob});
        }
    });
};

//edit
jobController.edit = function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            res.render("jobs/editjob", {job : foundJob});
        }
    });
};

//update
jobController.update = function(req, res) {
    function convertString(str) {
        var string = str.replace(/\w\S*/g, function(x) {
          return x.charAt(0).toUpperCase() + x.substr(1);
        });
        var convertedString = string.replace(/\s+/g, "");
        return convertedString.split(",");
    }
    var jobSkills = convertString(req.body.job.skills);
    var jobData = { 
        company: { 
            id: req.user._id, 
            name: req.user.username 
        },
        title: req.body.job.title, 
        location: req.body.job.location, 
        regimen: req.body.job.regimen, 
        description: req.body.job.description, 
        benefits: req.body.job.benefits, 
        skills: jobSkills,
    };
    Job.findByIdAndUpdate(req.params.id, jobData, function(err, updatedJob) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            console.log(req.body);
            req.flash("success", "Atualizaste a tua vaga de " + updatedJob.title);
            res.redirect("/jobs/" + req.params.id);
        }
    });
};

//destroy
jobController.destroy = function(req, res) {
    Job.findByIdAndDelete(req.params.id, function(err, deletedJob) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            console.log("The following job has been deleted: " + deletedJob.title);
            res.redirect("/jobs");
        }
    });
};

module.exports = jobController;