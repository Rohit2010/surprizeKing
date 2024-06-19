const express = require('express');
const router = express.Router();

const {vendorController} = require("../../controllers/index")


router.post("/create", vendorController.createVendor);
router.get("/get/all", vendorController.getAllVendors);
router.put("/update/:vendorId", vendorController.updateVendor)
router.get("/get/:vendorId", vendorController.getVendorById);

/// add vendor services route

router.post("/add/services", vendorController.addVendorServices)
router.get("/get/services/:vendorId", vendorController.getvendorServices)


module.exports = router;