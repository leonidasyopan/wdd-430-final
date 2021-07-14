const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String},
  quantity: { type: String, required: true  },
  expectedPrice: { type: String },
  actualPrice: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
