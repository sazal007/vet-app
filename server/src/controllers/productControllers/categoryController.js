const asyncHandler = require("express-async-handler");
const Category = require("../../models/productModel/category");

const getCategories = asyncHandler(async (req, res) => {
  let category = await Category.find();
  if (!category) {
    res.status(400);
    throw new Error("Something went wrong")
  }
  return res.status(200).send(category);
});

const addCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    res.status(400);
    throw new Error("Please add a category name");
  }

  const categoryExists = await Category.findOne({ category_name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    category_name
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  let updateCategory = await Category.findByIdAndUpdate(req.params.id, {
    category_name
  });

  if (!updateCategory) {
    res.status(400);
    throw new Error("Category not found");
  }

  res.status(200).json(updateCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  let deletecategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletecategory) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ success: "Deleted successfully" });
});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
}