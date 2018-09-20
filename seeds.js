const mongoose = require("mongoose");

var Job     = require("./models/job.js"),
    User    = require("./models/user.js");

var jobData = [
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
    }
];

// var userData = [
//     {
//     username:  "fabiom",
//     password: "rocketjobs",
//     firstName:  "Fábio",
//     lastName:  "Moura",
//     email:  "fabiom@email.com",
//     location:  "Porto, Portugal",
//     },
//     {
//     username:  "joanai",
//     password: "rocketjobs",
//     firstName:  "Joana",
//     lastName:  "Inácio",
//     email:  "joanai@email.com",
//     location:  "Porto, Portugal",
//     },
//     {
//     username:  "joelc",
//     password: "rocketjobs",
//     firstName:  "Joel",
//     lastName:  "Carvalho",
//     email:  "joelc@email.com",
//     location:  "Évora, Portugal",
//     }
// ];


function seedDatabase() {
    //Job handling
    Job.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("All jobs have been removed from the database.");
        };
    });
    jobData.forEach(function(event) {
        Job.create(event, function(err, createdJob) {
            if(err) {
                 console.log(err);
            } else {
                console.log("A job has been added");
            }
        });
    });
    // //User handling
    // User.remove({}, function(err) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log("All users have been removed from the database.");
    //     };
    // });
    // userData.forEach(function(event) {
    //     User.create(event, function(err, createdUser) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log("An user has been added");
    //         };
    //     });
    // });
    // //Company handling
    // Company.remove({}, function(err) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log("All companies have been removed from the database");
    //     };
    // });
    // companyData.forEach(function(event) {
    //     Company.create(event, function(err, createdCompany) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log("A company has been added");
    //         };
    //     });
    // });
};

module.exports = seedDatabase;