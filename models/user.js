const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:  String,
    password: String,
    email:  String,
    isCompany: Boolean
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);