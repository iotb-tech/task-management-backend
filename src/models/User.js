const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  refresh_token: {
    type: String,
    required: false,
  },
});

const user = mongoose.model('User', userSchema);

module.exports = user;
