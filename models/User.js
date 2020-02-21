const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Male'
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserModel);