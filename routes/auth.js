const express   = require("express"),
      app       = express(),
      passport  = require("passport");

var User = require("../models/user.js");


app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res, next) {
    passport.authenticate("local", { 
        successRedirect: "/", 
        failureRedirect: "/login",
        failureFlash: "Email ou password inválidos"
    })(req, res, next);
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username, email: req.body.email, isCompany: req.body.isCompany }), req.body.password, function(err, createdUser) {
        if(err) {
            console.log(err);
            if(err.name === "UserExistsError") {
                req.flash("error", "Esse email já está inscrito no Rocket Jobs.");
            }
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/jobs");
            });
        };
    });
});

app.post("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = app;