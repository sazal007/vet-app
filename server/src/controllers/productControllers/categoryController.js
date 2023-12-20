const asyncHandler = require("express-async-handler");
const Category = require("../../models/productModels/category");

const getCategories = asyncHandler(async (req, res) => {

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

});

const deleteCategory = asyncHandler(async (req, res) => {

});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
}