const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String},
  quantity: { type: Number, required: true  },
  expectedPrice: { type: Number },
  actualPrice: { type: Number },
});

module.exports = mongoose.model('Product', productSchema);
