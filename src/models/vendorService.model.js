const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorServicesSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: String, required: true }],
  services: [{ type: String, required: true }],
}, { timestamps: true });

const vendorServiceModel = mongoose.model('VendorServices', VendorServicesSchema);

module.exports = vendorServiceModel
