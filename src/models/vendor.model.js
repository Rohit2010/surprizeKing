const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  information: {
    vendorName: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    businessName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    whatsappNumber: { type: String },
    sameAsContact: { type: Boolean, default: false },
  },
  businessDetails: {
    GSTIN: { type: String },
    rating: { type: Number, default: 0 },
    yearOfEstablishment: { type: Number },
    verified: { type: Boolean, default: false },
    workingHours: [
      {
        day: { type: String },
        from: { type: String },
        to: { type: String },
      }
    ],
  },
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    googleLocation: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  seoWork: {
    metaTitle: { type: String },
    metaKeyword: { type: String },
    metaDescription: { type: String },
    metaTags: { type: String },
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
