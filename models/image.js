const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  url: String,
});

module.exports = mongoose.model('Image', imageSchema);
