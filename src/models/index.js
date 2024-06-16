const {User} = require('./user.model');
const AdminModel = require("./admin.model");
const CategoryModel = require("../models/category.model")
const ServiceModel = require("../models/services.model")

module.exports = {
  User,
  AdminModel,
  ServiceModel,
  CategoryModel
};
