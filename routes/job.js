const express = require("express"),
      app     = express();

var controller = require("../controllers/job.js");


//index
app.get("/jobs", controller.index);

//new
app.get("/jobs/new", middleware.isCompany, controller.new);

//create
app.post("/jobs", middleware.isCompany, controller.create);

//show
app.get("/jobs/:id", controller.show);

//edit
app.get("/jobs/:id/edit", middleware.isCreator, controller.edit);

//update
app.put("/jobs/:id", middleware.isCreator, controller.update);

//destroy
app.delete("/jobs/:id", middleware.isCreator, controller.destroy);


module.exports = app;