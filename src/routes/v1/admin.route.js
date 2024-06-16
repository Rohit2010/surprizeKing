const express = require('express');
const router = express.Router();

const {authController} = require("../../controllers/index")


router.post("/login", authController.loginAdmin);
router.post("/signup", authController.createAdmin);

module.exports = router;