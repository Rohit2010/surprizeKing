const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensuring the phone number is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring the email is unique
  },
  dob: {
    type: Date,
    required: true,
  },
  otp: {
    type: String,
    required: false, // OTP is optional, used for phone verification
  },
  isPhoneVerified: {
    type: Boolean,
    default: false, // Default value for phone verification status
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
