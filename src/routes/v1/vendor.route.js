const express = require('express');
const router = express.Router();

const {vendorController} = require("../../controllers/index")


router.post("/create", vendorController.createVendor);
router.get("/get/all", vendorController.getAllVendors);
router.get("/get/:vendorId", vendorController.getVendorById);

module.exports = router;