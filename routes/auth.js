const express   = require("express"),
      app       = express();

var controller = require("../controllers/auth.js");

app.get("/login", controller.login);

app.post("/login", controller.doLogin);

app.get("/register", controller.register);

app.post("/register", controller.doRegister);

app.post("/logout", controller.doLogout);

module.exports = app;