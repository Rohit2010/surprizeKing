const express = require('express');
const router = express.Router();

// imports routes
const adminRoute = require("./admin.route")
const categoryRoute = require("./category.route");
const upload = require('../../microservices/fileUpload.service');


router.use("/admin",adminRoute )
router.use("/category",categoryRoute )




module.exports = router;
