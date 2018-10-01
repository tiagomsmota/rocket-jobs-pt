const mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
    title: String,
    company: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String,
        image: String
    },
    location: String,
    regimen: String,
    description: String,
    benefits: [String],
    skills: [String],
    dateAdded: Number
});

module.exports =  mongoose.model("Job", jobSchema);
