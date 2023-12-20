const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel/products");

const getProducts = asyncHandler(async (req, res) => {
  
});

const addProducts = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  
});

module.exports = {
  getProducts,
}