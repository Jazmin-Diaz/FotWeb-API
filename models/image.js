const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", imageSchema);
