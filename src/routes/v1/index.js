const express = require('express');
const router = express.Router();

// imports routes
const adminRoute = require("./admin.route")
const categoryRoute = require("./category.route");
const vendorRoute = require("./vendor.route");


router.use("/admin",adminRoute )
router.use("/category",categoryRoute )
router.use("/vendor", vendorRoute)




module.exports = router;
