const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addCategory,
  updateCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/productControllers/categoryController");

router.post("/add-category", protect, addCategory);
router.get("/get-category", getCategories);
router.put("/update-category/:id", protect, updateCategory);
router.delete("/delete-category/:id", protect, deleteCategory);

module.exports = router;
