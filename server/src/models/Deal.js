const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
