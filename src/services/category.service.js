const {CategoryModel, ServiceModel} = require('../models');
const ApiError = require('../utils/ApiError');
const {  getPathFromPath } = require('../utils/getPath');
const { objectId } = require('../utils/queryPHandler');

//category service functions
const createCategory = async (data) => {
  try {
    const check = await CategoryModel.findOne({
      categoryName: new RegExp(`^${data.categoryName}$`, 'i')
    });
    if(check){
      throw new ApiError(400, "Category already exists with same name")
    }
    const newCategory = new CategoryModel(data);
    return await newCategory.save();
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getCategories = async (search, status) => {
  try {
    const query = {isDeleted:false};
    if (search) {
      query.categoryName = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (status) {
      query.status = status; // Case-insensitive search
    }
    const options = {
      sort: { createdAt: -1 } // Sort by createdAt in descending order
    };
    return await CategoryModel.find(query, null, options);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateCategory = async (id, data) => {
  try {
    const { categoryName,status,displayOrder,showInHeader,trendingCategory,categoryIconCode, categoryImage, categoryIcon} = data;
    const updatedCategory = await CategoryModel.findById(id);
    if (!updatedCategory) {
      throw new ApiError(404, 'Category not found');
    }
    const updateCat = await CategoryModel.findByIdAndUpdate(id, {
        categoryName:categoryName ? categoryName : updatedCategory.categoryName,
        status:status ? status : updatedCategory.status,
        displayOrder: displayOrder ? displayOrder : updatedCategory.displayOrder,
        showInHeader: showInHeader !== undefined ? showInHeader : updatedCategory.showInHeader,
        trendingCategory:trendingCategory !== undefined ? trendingCategory : updatedCategory.trendingCategory,
        categoryImage:categoryImage ? getPathFromPath(categoryImage) : updatedCategory.categoryImage,
        categoryIcon:categoryIcon ?  getPathFromPath(categoryIcon) : updatedCategory.categoryIcon,
        categoryIconCode : categoryIconCode ? categoryIconCode : updatedCategory.categoryIconCode,
    }, {new:true})
    return updateCat;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndUpdate(id, {isDeleted:true}, {new:true});
    if (!deletedCategory) {
      throw new ApiError(404, 'Category not found');
    }
    return deletedCategory;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// services/ sub category fucntions
const createService = async (data) => {
    try {

      const newService = new ServiceModel(data);
      return await newService.save();
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  };
  
  const getServices = async (search, status, parent) => {
    try {
      const query = { isDeleted: false };
      if (search) {
        query.serviceName = { $regex: search, $options: 'i' }; // Case-insensitive search
      }
      if (status) {
        query.status = status; // Case-insensitive search
      }
      if (parent) {
        query.category = objectId(parent); 
      }
      const options = {
        sort: { createdAt: -1 } // Sort by createdAt in descending order
      };
      return await ServiceModel.find(query, null, options).populate('category');
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  };
  
  const getServiceById = async (id) => {
    try {
      const service = await ServiceModel.findById(id);
      if (!service) {
        throw new ApiError(404, 'Service not found');
      }
      return service;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  };
  
  const updateService = async (id, data) => {
    try {
      const { category, serviceName, status, displayOrder, showInSidebar, serviceImage } = data;
      const updatedService = await ServiceModel.findById(id);

      if (!updatedService) {
        throw new ApiError(404, 'Service not found');
      }
      console.log(serviceImage, "service Image")
      const updateSvc = await ServiceModel.findByIdAndUpdate(id, {
          category: category ? category : updatedService.category,
          serviceName: serviceName ? serviceName : updatedService.serviceName,
          status: status ? status : updatedService.status,
          displayOrder: displayOrder ? displayOrder : updatedService.displayOrder,
          showInSidebar: showInSidebar !== undefined ? showInSidebar : updatedService.showInSidebar,
          serviceImage: serviceImage ? getPathFromPath(serviceImage) : updatedService.serviceImage
      }, { new: true });
      return updateSvc;
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  };
  
  const deleteService = async (id) => {
    try {
      const deletedService = await ServiceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (!deletedService) {
        throw new ApiError(404, 'Service not found');
      }
      return deletedService;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  };
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
// service exports
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
};
