const passport  = require("passport");

var User = require("../models/user.js");

var authController = {};

authController.login = function(req, res) {
    res.render("login");
};

authController.doLogin = function(req, res, next) {
    passport.authenticate("local", { 
        successRedirect: "/", 
        failureRedirect: "/login",
        failureFlash: "Email ou password inválidos"
    })(req, res, next);
};

authController.register = function(req, res) {
    res.render("register");
};

authController.doRegister = function(req, res) {
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
};

authController.doLogout = function(req, res) {
    req.logout();
    res.redirect("/");
};

module.exports = authController;