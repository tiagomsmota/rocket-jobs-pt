const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:  String,
    firstName:  String,
    lastName:  String,
    email:  String,
    location:  String,
    photo: String
});

module.exports = mongoose.model("User", userSchema);