const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Product', productSchema);
