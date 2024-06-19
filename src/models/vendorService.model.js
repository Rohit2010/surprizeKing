const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorServicesSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  services: {
    type:[{category:{type:Schema.Types.ObjectId, ref:"Category"}, services:[{type:Schema.Types.ObjectId, ref:"Service"}]}],
    required:true
  },
  
}, { timestamps: true });

const vendorServiceModel = mongoose.model('VendorServices', VendorServicesSchema);

module.exports = vendorServiceModel
