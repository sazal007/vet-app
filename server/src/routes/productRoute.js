const express = require("express");
const router = express.Router();
const upload = require("../config/fileUpload");
const { protect } = require("../middleware/authMiddleware");
const {
  addProducts,
  updateProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  searchProducts,
} = require("../controllers/productControllers/productController");

router.post("/add-product", upload.single("image"), protect, addProducts);
router.get("/get-products", getProducts);
router.get("/get-product/:id", getSingleProduct);
router.get("/search-product", searchProducts);
router.put(
  "/update-product/:id",
  upload.single("image"),
  protect,
  updateProduct
);
router.delete("/delete-product/:id", protect, deleteProduct);

module.exports = router;
