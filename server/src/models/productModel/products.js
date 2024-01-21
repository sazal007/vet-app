const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;