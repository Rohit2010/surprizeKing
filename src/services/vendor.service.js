const { userService } = require('.');
const {  VendorModel } = require('../models');
const ApiError = require('../utils/ApiError');
const { objectId } = require('../utils/queryPHandler');

const createVendor = async (data) => {
  const {contactNumber, email} = data.information;
  try {
    const user = await userService.createUser({phone:contactNumber, email:email,role:"VENDOR"})
    const newVendor = new VendorModel({...data, userId:user._id, isVerified:true});
    return await newVendor.save();
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getVendors = async ({vendorName,email, businessName, contactNumber }) => {
  try {
    const query = {};
    if (vendorName) {
      query['information.vendorName'] = { $regex: vendorName, $options: 'i' }; // Case-insensitive search
    }
    if (email) {
      query['information.email'] = { $regex: email, $options: 'i' }; // Case-insensitive search
    }
    if (businessName) {
      query['information.businessName'] = { $regex: businessName, $options: 'i' }; // Case-insensitive search
    }
    if (contactNumber) {
      query['information.contactNumber'] = { $regex: contactNumber, $options: 'i' }; // Case-insensitive search
    }
    return await VendorModel.find(query).populate("userId");
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const getVendorById = async (id) => {
  try {
    const vendor = await VendorModel.findById(id).populate("userId");
    if (!vendor) {
      throw new ApiError(404, 'Vendor not found');
    }
    return vendor;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateVendor = async (id, data) => {
  try {
    const updatedVendor = await VendorModel.findById(objectId(id));
    if (!updatedVendor) {
      throw new ApiError(404, 'Vendor not found');
    }

    const updateVdr = await VendorModel.findByIdAndUpdate(objectId(id), {
      'information.vendorName': data.information.vendorName ? data.information.vendorName : updatedVendor.information.vendorName,
      'information.email': data.information.email ? data.information.email : updatedVendor.information.email,
      'information.website': data.information.website ? data.information.website : updatedVendor.information.website,
      'information.businessName': data.information.businessName ? data.information.businessName : updatedVendor.information.businessName,
      'information.contactNumber': data.information.contactNumber ? data.information.contactNumber : updatedVendor.information.contactNumber,
      'information.whatsappNumber': data.information.whatsappNumber ? data.information.whatsappNumber : updatedVendor.information.whatsappNumber,
      'information.sameAsContact': data.information.sameAsContact !== undefined ? data.information.sameAsContact : updatedVendor.information.sameAsContact,
      'businessDetails.GSTIN': data.businessDetails.GSTIN ? data.businessDetails.GSTIN : updatedVendor.businessDetails.GSTIN,
      'businessDetails.rating': data.businessDetails.rating ? data.businessDetails.rating : updatedVendor.businessDetails.rating,
      'businessDetails.yearOfEstablishment': data.businessDetails.yearOfEstablishment ? data.businessDetails.yearOfEstablishment : updatedVendor.businessDetails.yearOfEstablishment,
      'businessDetails.verified': data.businessDetails.verified !== undefined ? data.businessDetails.verified : updatedVendor.businessDetails.verified,
      'businessDetails.workingHours': data.businessDetails.workingHours ? data.businessDetails.workingHours : updatedVendor.businessDetails.workingHours,
      'address.addressLine1': data.address.addressLine1 ? data.address.addressLine1 : updatedVendor.address.addressLine1,
      'address.addressLine2': data.address.addressLine2 ? data.address.addressLine2 : updatedVendor.address.addressLine2,
      'address.city': data.address.city ? data.address.city : updatedVendor.address.city,
      'address.state': data.address.state ? data.address.state : updatedVendor.address.state,
      'address.pincode': data.address.pincode ? data.address.pincode : updatedVendor.address.pincode,
      'address.googleLocation': data.address.googleLocation ? data.address.googleLocation : updatedVendor.address.googleLocation,
      'address.latitude': data.address.latitude ? data.address.latitude : updatedVendor.address.latitude,
      'address.longitude': data.address.longitude ? data.address.longitude : updatedVendor.address.longitude,
      'seoWork.metaTitle': data.seoWork.metaTitle ? data.seoWork.metaTitle : updatedVendor.seoWork.metaTitle,
      'seoWork.metaKeyword': data.seoWork.metaKeyword ? data.seoWork.metaKeyword : updatedVendor.seoWork.metaKeyword,
      'seoWork.metaDescription': data.seoWork.metaDescription ? data.seoWork.metaDescription : updatedVendor.seoWork.metaDescription,
      'seoWork.metaTags': data.seoWork.metaTags ? data.seoWork.metaTags : updatedVendor.seoWork.metaTags
    }, { new: true });

    return updateVdr;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

// const deleteVendor = async (id) => {
//   try {
//     const deletedVendor = await Vendor.findByIdAndDelete(id);
//     if (!deletedVendor) {
//       throw new ApiError(404, 'Vendor not found');
//     }
//     return deletedVendor;
//   } catch (error) {
//     throw new ApiError(500, error.message);
//   }
// };

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
//   deleteVendor
};
