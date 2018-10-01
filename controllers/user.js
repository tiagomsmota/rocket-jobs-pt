const passport  = require("passport");

var User = require("../models/user.js"),
    Job  = require("../models/job.js");

var userController = {};


userController.login = function(req, res) {
    res.render("login");
};

userController.doLogin = function(req, res, next) {
    passport.authenticate("local", { 
        successRedirect: "/", 
        failureRedirect: "/login",
        failureFlash: "Email ou password inválidos"
    })(req, res, next);
};

userController.register = function(req, res) {
    res.render("register");
};

userController.doRegister = function(req, res) {
    User.register(new User({ username: req.body.username, email: req.body.email, isCompany: req.body.isCompany, image: {}}), req.body.password, function(err, createdUser) {
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

userController.doLogout = function(req, res) {
    req.logout();
    res.redirect("/");
};

userController.changeImage = function(req, res) {
    var image = {
        id: "",
        url: ""
    };
    image.url = req.file.url;
    image.id = req.file.public_id;
    User.findByIdAndUpdate(req.user._id, {image : image}, function(err, foundUser) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
        } else {
            req.flash("success", "Alteraste a tua fotografia de perfil");
            res.redirect("back");
        };
    });
};

userController.delete = function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err, deletedUser) {
        if(err) {
            console.log(err);
            req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
            res.redirect("back");
        } else {
            req.flash("success", "Eliminaste a tua conta com sucesso");
            res.redirect("/");
        };
    });
};


module.exports = userController;