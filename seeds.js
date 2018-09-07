const mongoose = require("mongoose");

var Job = require("./models/job.js");

var data = [
    {
    title: "Front-end Developer",
    company: "Pixel Penguin",
    location: "Porto, Portugal",
    regimen: "Full-time",
    description: "This is a test job... Pretty cool uh?",
    benefits: ["Café gratuito", "Ginásio", "Horário flexível"],
    skills: ["React", "Git", "CSS"],
    dateAdded: 2
    },
    {
    title: "Business Analyst",
    company: "Cobra Systems",
    location: "Coimbra, Portugal",
    regimen: "Full-time",
    description: "This is a test job... Pretty cool uh? Cobra",
    benefits: ["Snacks gratuitos", "Trabalho remoto", "Horário flexível", "Ginásio"],
    skills: ["UML", "SQL", "Comunicação"],
    dateAdded: 2
    },
    {
    title: "Estrategista Digital",
    company: "GoBOX",
    location: "Lisboa, Portugal",
    regimen: "Full-time",
    description: "This is a test job... Pretty cool uh? GoBOX",
    benefits: ["Trabalho remoto", "Opções de formação"],
    skills: ["SEO", "SEM", "Redes Sociais"],
    dateAdded: 3
    },
];


function seedDatabase() {
    //Remove all jobs from DB
    Job.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("All jobs have been removed from the database.");
        };
    });
    //Add jobs from data array to DB
    data.forEach(function(event) {
        Job.create(event, function(err, createdJob) {
            if(err) {
                 console.log(err);
            } else {
                console.log("A job has been added");
            }
        });
    });
};

module.exports = seedDatabase;