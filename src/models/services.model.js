const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the services Schema
const categoryServicesSchema = new Schema({
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false, 
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User Model
const Service = mongoose.model('Service', categoryServicesSchema);

module.exports = Service;
