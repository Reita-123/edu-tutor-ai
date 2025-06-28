const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  googleId: String,
  name: String,
  accessToken: String,
  refreshToken: String,
  // Add any other fields as needed
});

// This line checks if the model already exists before creating it
module.exports = mongoose.models.User || mongoose.model('User', userSchema);