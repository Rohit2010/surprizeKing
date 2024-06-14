const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the category Schema
const categorySchema = new Schema({
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
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
