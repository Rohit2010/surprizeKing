const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Service Schema
const serviceSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Example values, adjust as needed
    default: 'active'
  },
  displayOrder: {
    type: Number,
    required: true
  },
  showInSidebar: {
    type: Boolean,
    default: false
  },
  serviceImage: {
    type: String, // You can store the path or URL of the image
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Service Model
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
