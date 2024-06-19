const catchAsync = require("../utils/catchAsync");
const { getPathFromPath } = require("../utils/getPath");
const {categoryService} = require("../services/index");
const { objectId } = require("../utils/queryPHandler");


// create new category
const createCategory = catchAsync(async (req, res) => {
    // const { categoryName,status,displayOrder,showInHeader,trendingCategory,categoryIconCode} = req.body;

    const categoryIcon =  getPathFromPath(req.files?.categoryIcon[0].path)
    const categoryImage=  getPathFromPath(req.files?.categoryImage[0].path)

    const newCategory = await categoryService.createCategory({...req.body, categoryIcon, categoryImage})

    res.json({data:newCategory})
})

const updateCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    // const { categoryName,status,displayOrder,showInHeader,trendingCategory,categoryIconCode} = req.body;
    const categoryIcon =  req?.files?.categoryIcon?.length > 0 ? req.files?.categoryIcon[0].path : null
    const categoryImage =  req?.files?.categoryImage?.length > 0 ? req.files?.categoryImage[0].path : null

    const updatedCategory = await categoryService.updateCategory(objectId(categoryId),{...req.body, categoryIcon, categoryImage})

    res.json({data:updatedCategory})

})

//get all categories 
const getAllCategories = catchAsync(async (req, res) => {
    const { search, status } = req.query;
    const categories = await categoryService.getCategories(search, status)

    res.json({data:categories})
})

// delete category
const deleteCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const categories = await categoryService.deleteCategory(categoryId)

    res.json({data:categories})
})

// get category by Id
const getCategoryById = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const categories = await categoryService.getCategoryById(categoryId)

    res.json({data:categories})
})


// service controller functions
// Create a new service
const createServiceFun = catchAsync(async (req, res) => {
// const { category,serviceName,status,displayOrder,showInSidebar} = req.body;
    console.log(req.files, "file")
    const serviceImage = req.files?.serviceImage ? getPathFromPath(req.files.serviceImage[0].path) : null;

    const newService = await categoryService.createService({ ...req.body, serviceImage });

    res.json({ data: newService });
});

// Update a service
const updateServiceFun = catchAsync(async (req, res) => {
    const { serviceId } = req.params;
    console.log(req.files)
    const serviceImage =  req.files?.serviceImage?.length > 0 ? req.files.serviceImage[0].path : null;

    const updatedService = await categoryService.updateService(objectId(serviceId), { ...req.body, serviceImage });

    res.json({ data: updatedService });
});

// Get all services
const getAllServices = catchAsync(async (req, res) => {
    const { search, status, parent } = req.query;
    const services = await categoryService.getServices(search, status, parent);

    res.json({ data: services });
});

// Delete a service
const deleteService = catchAsync(async (req, res) => {
    const { serviceId } = req.params;
    const service = await categoryService.deleteService(serviceId);

    res.json({ data: service });
});

// Get service by ID
const getServiceById = catchAsync(async (req, res) => {
    const { serviceId } = req.params;
    const service = await categoryService.getServiceById(serviceId);

    res.json({ data: service });
});

module.exports = {
    createCategory,
    updateCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    createServiceFun,
    updateServiceFun,
    getServiceById,
    getAllServices,
    deleteService,
}