const express           = require("express"),
      app               = express(),
      multer            = require("multer"),
      cloudinary        = require("cloudinary"),
      cloudinaryStorage = require("multer-storage-cloudinary");


//---- setup image handler - cloudinary & multer
cloudinary.config({
      cloud_name: "dlrvsfoyt",
      api_key: "542834996388756",
      api_secret: "MApwWjnXcCzLZDpQb9fsu0Zkc_I"
});
var storage = cloudinaryStorage({
      cloudinary: cloudinary,
      folder: "imgs",
      allowedFormats: ["jpg", "png"],
      transformation: [{
            width: 100,
            height: 100,
            crop: "fit",
            quality: 100
      }]
});
var parser = multer({storage: storage});


//---- controller
var controller = require("../controllers/user.js");


//---- routes
app.get("/login", controller.login);

app.post("/login", controller.doLogin);

app.get("/register", controller.register);

app.post("/register", controller.doRegister);

app.post("/logout", controller.doLogout);

app.put("/upload/images", parser.single("image"), controller.changeImage);
  
app.delete("/user/:id", controller.delete);


//---- export
module.exports = app;