const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Category Schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
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
  showInHeader: {
    type: Boolean,
    default: false
  },
  trendingCategory: {
    type: Boolean,
    default: false
  },
  categoryImage: {
    type: String, // You can store the path or URL of the image
    required: false
  },
  categoryIcon: {
    type: String, // You can store the path or URL of the icon
    required: false
  },
  categoryIconCode: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Category Model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
