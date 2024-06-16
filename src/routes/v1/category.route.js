const express = require('express');
const {categoryController} = require("../../controllers/index");
const upload = require('../../microservices/fileUpload.service');
const router = express.Router();


// category routes
router.post("/create",upload.fields([{name:"categoryIcon", maxCount:1}, {name:"categoryImage", maxCount:1}]), categoryController.createCategory)
router.get("/get/all", categoryController.getAllCategories)
router.get("/get/:categoryId", categoryController.getCategoryById)
router.patch("/delete/:categoryId", categoryController.deleteCategory)
router.put("/update/:categoryId",upload.fields([{name:"categoryIcon", maxCount:1},{name:"categoryImage", maxCount:1}]), categoryController.updateCategory)


// services routes
router.post("/service/create",upload.fields([{name:"serviceImage", maxCount:1}]), categoryController.createServiceFun)
router.get("/service/get/all", categoryController.getAllServices)
router.get("/service/get/:serviceId", categoryController.getServiceById)
router.patch("/service/delete/:serviceId", categoryController.deleteService)
router.put("/service/update/:serviceId",upload.fields([{name:"serviceImage", maxCount:1},{name:"categoryImage", maxCount:1}]), categoryController.updateServiceFun)

module.exports = router;