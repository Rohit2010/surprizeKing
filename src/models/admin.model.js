const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the category Schema
const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
