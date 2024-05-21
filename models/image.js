// models/image.js
const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);
