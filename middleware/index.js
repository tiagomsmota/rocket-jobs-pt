var Job = require("../models/job.js");
var User = require("../models/user.js");

middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "Tens uma conta? Entra para conseguires executar essa ação.");
        res.redirect("/login");
    }
}

middleware.isCompany = function(req, res, next) {
    if(req.isAuthenticated()) {
        if(req.user.isCompany === true) {
            next();
        } else {
            req.flash("error", "Entra como empresa para publicares uma nova vaga");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Tens uma conta? Entra para conseguires executar essa ação.");
        res.redirect("/login");
    }
}

middleware.isCreator = function(req, res, next) {
    if(req.isAuthenticated()) {
        Job.findById(req.params.id, function(err, foundJob) {
            if(err) {
                console.log(err);
                req.flash("error", "Algo de errado aconteceu, tenta novamente mais tarde.");
            } else {
                console.log(foundJob);
                if(foundJob.company.name === req.user.username) {
                    return next();
                } else {
                    res.redirect("back")
                    req.flash("error", "Não tens permissão para executar essa ação.");
                };
            };
        });
    } else {
        req.flash("error", "Tens uma conta? Entra para conseguires executar essa ação.")
        res.redirect("back");
    };
};

module.exports = middleware;