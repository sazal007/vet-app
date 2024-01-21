const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel/products");

const getProducts = asyncHandler(async (req, res) => {
  let product = await Product.find();
  if (!product) {
    res.status(400);
    throw new Error("Something went wrong")
  }
  return res.status(200).send(product);
});

const addProducts = asyncHandler(async (req, res) => {
  const { product_name, description, price, image, category } = req.body;

  if (!product_name || !description || !price) {
    res.status(400);
    throw new Error("Please add a name, description and price");
  };

  const productExists = await Product.findOne({ product_name });

  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    product_name,
    description,
    price,
    image,
    category
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
  
});

const updateProduct = asyncHandler(async (req, res) => {
  const { product_name, description, price, image, category } = req.body;

  let updateProduct = await Product.findByIdAndUpdate(req.params.id, {
    product_name,
    description,
    price,
    image,
    category
  });

  if (!updateProduct) {
    res.status(400);
    throw new Error("Product not found");
  }

  res.status(200).json(updateProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  let deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ success: "Deleted successfully" });
});

module.exports = {
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct
}