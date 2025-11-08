const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  productImage: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  categoryId: {
    type: Number,
    required: true,
    ref: 'Category'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
