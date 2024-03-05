const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel/products");

const getProducts = asyncHandler(async (req, res) => {
  let product = await Product.find().populate("category");
  if (product.length === 0) {
    res.status(404).json({ message: "No products found" });
    return;
  }
  return res.status(200).send(product);
});

const searchProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        product_name: { $regex: req.query.search, $options: "i" },
      }
    : {};
  const productId = req.params.id;
  const products = await Product.find({ ...keyword, _id: { $ne: productId } });
  res.send(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({ err: "Something went wrong" });
  }
  res.send(product);
});

const addProducts = asyncHandler(async (req, res) => {
  const { product_name, description, price, category } = req.body;
  const image = req.file.path;

  if (!product_name || !description || !price) {
    res.status(400);
    throw new Error("Please add a name, description and price");
  }

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
    category,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { product_name, description, price, category } = req.body;
  const image = req.file.path;

  let updateProduct = await Product.findByIdAndUpdate(req.params.id, {
    product_name,
    description,
    price,
    image,
    category,
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
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ success: "Deleted successfully" });
});

module.exports = {
  getProducts,
  searchProducts,
  getSingleProduct,
  addProducts,
  updateProduct,
  deleteProduct,
};
